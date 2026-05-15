import os
import json
import re
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

API_KEY = os.getenv("OPENROUTER_API_KEY")


def analyze_fake_news(text):
    prompt = f"""
    Analyze this news content for misinformation.

    Return ONLY JSON in this format:

    {{
      "verdict": "Fake or Real or Uncertain",
      "confidence": 0,
      "explanation": "short explanation"
    }}

    News:
    {text}
    """

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "Fake News Detector"
        },
        json={
        "model": "openai/gpt-oss-20b:free",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
            ]
            }
    )

    data = response.json()

    print("OPENROUTER RESPONSE:", data)

    if "choices" not in data:
        return {
            "verdict": "Uncertain",
            "confidence": 50,
            "explanation": str(data)
        }

    raw = data["choices"][0]["message"]["content"]

    match = re.search(r"\{.*\}", raw, re.DOTALL)

    if not match:
        return {
            "verdict": "Uncertain",
            "confidence": 50,
            "explanation": raw
        }

    try:
        return json.loads(match.group())
    except:
        return {
            "verdict": "Uncertain",
            "confidence": 50,
            "explanation": raw
        }