import os
import json
import re
from groq import Groq
from dotenv import load_dotenv
from app.services.gnews_service import fetch_news_evidence

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

TRUSTED_DOMAINS = [
    ".gov",
    "reuters",
    "apnews",
    "bbc",
    "cnn",
    "nytimes",
    "nasa",
    "who.int",
    "whitehouse",
    "espn",
    "icc-cricket",
]


def clean_json_response(raw):
    cleaned = raw.strip()

    if cleaned.startswith("```json"):
        cleaned = cleaned.replace("```json", "").replace("```", "").strip()

    elif cleaned.startswith("```"):
        cleaned = cleaned.replace("```", "").strip()

    return cleaned


def optimize_search_query(text):
    """
    Make user claims searchable for GNews.
    """

    query = text.lower()

    query = re.sub(r"\bis\b|\bare\b|\bwas\b|\bwere\b", "", query)
    query = re.sub(r"\bthe\b|\ba\b|\ban\b", "", query)
    query = re.sub(r"[^\w\s]", "", query)

    query = " ".join(query.split())

    return query


def filter_trusted_sources(evidence):
    """
    Remove junk search matches.
    """

    filtered = []

    for item in evidence:
        source = item["source"].lower()
        title = item["title"].lower()

        if any(domain in source for domain in TRUSTED_DOMAINS):
            filtered.append(item)
            continue

        if any(domain in title for domain in TRUSTED_DOMAINS):
            filtered.append(item)

    return filtered


def analyze_fake_news(text):
    evidence = fetch_news_evidence(text)

    claim = text.lower()

    if not evidence:
        if any(word in claim for word in ["tomorrow", "will", "breaking"]):
            return {
                "verdict": "Fake",
                "confidence": 95,
                "explanation": "Extraordinary claim with no trusted supporting evidence.",
                "sources": []
            }

        return {
            "verdict": "Uncertain",
            "confidence": 20,
            "explanation": "No trusted evidence found.",
            "sources": []
        }

    titles = " ".join([item["title"].lower() for item in evidence])

    # Trump logic
    if "trump" in claim and "president" in claim:
        if "president trump" in titles or "trump executive" in titles:
            return {
                "verdict": "Real",
                "confidence": 95,
                "explanation": "Trusted sources refer to Trump as acting president.",
                "sources": evidence
            }

    # ICC logic
    if "icc" in claim or "t20" in claim:
        if any(word in titles for word in [
            "player of the tournament",
            "most runs",
            "highest wicket"
        ]):
            if "india won" in claim:
                if "india" in titles:
                    return {
                        "verdict": "Real",
                        "confidence": 80,
                        "explanation": "Evidence suggests tournament completed and India is referenced.",
                        "sources": evidence
                    }

                return {
                    "verdict": "Uncertain",
                    "confidence": 50,
                    "explanation": "Tournament appears completed, but no proof India won.",
                    "sources": evidence
                }

    # fallback to LLM
    evidence_text = ""
    for item in evidence:
        evidence_text += f"""
Source: {item['source']}
Title: {item['title']}
"""

    prompt = f"""
Determine if claim is Real, Fake, or Uncertain.

Return JSON only.

CLAIM:
{text}

EVIDENCE:
{evidence_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            max_tokens=300
        )

        cleaned = clean_json_response(response.choices[0].message.content)
        parsed = json.loads(cleaned)
        parsed["sources"] = evidence
        return parsed

    except:
        return {
            "verdict": "Uncertain",
            "confidence": 50,
            "explanation": "Analysis failed.",
            "sources": evidence
        }