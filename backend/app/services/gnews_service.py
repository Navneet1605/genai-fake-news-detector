from gnews import GNews
import re


google_news = GNews(
    language="en",
    country="US",
    period="7d",
    max_results=8
)


def clean_query(query):
    """
    Convert natural language claims into searchable news queries.
    """

    query = query.lower()

    stop_words = {
        "is",
        "are",
        "was",
        "were",
        "the",
        "a",
        "an",
        "that",
        "this",
        "of",
        "to",
        "for",
        "in",
        "on",
        "at",
        "claims",
        "claim",
        "says",
        "said",
        "breaking",
        "news",
    }

    query = re.sub(r"[^\w\s]", "", query)

    words = query.split()

    filtered = [
        word for word in words
        if word not in stop_words
    ]

    cleaned = " ".join(filtered[:6])

    return cleaned


def fetch_news_evidence(query):
    try:
        search_query = clean_query(query)

        print("GNEWS SEARCH QUERY:", search_query)

        results = google_news.get_news(search_query)

        print("RAW GNEWS RESULTS:", results)

        evidence = []

        for article in results:
            evidence.append({
                "title": article.get("title", ""),
                "source": article.get("publisher", {}).get("title", "Unknown"),
                "url": article.get("url", "")
            })

        print("PARSED EVIDENCE:", evidence)

        return evidence

    except Exception as e:
        print("GNEWS ERROR:", str(e))
        return []