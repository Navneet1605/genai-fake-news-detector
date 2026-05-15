from fastapi import APIRouter
from app.models.schemas import NewsRequest, NewsResponse
from app.services.gemini_service import analyze_fake_news

router = APIRouter()


def normalize_confidence(confidence):
    """
    Normalize confidence into integer 0–100
    """

    if confidence is None:
        return 50

    # if already integer
    if isinstance(confidence, int):
        return max(0, min(confidence, 100))

    # if float like 0.95 or 87.5
    if isinstance(confidence, float):
        if confidence <= 1:
            confidence = confidence * 100
        return max(0, min(int(confidence), 100))

    # if string like "0.82" or "85"
    if isinstance(confidence, str):
        try:
            value = float(confidence)
            if value <= 1:
                value = value * 100
            return max(0, min(int(value), 100))
        except:
            return 50

    return 50


@router.post("/analyze", response_model=NewsResponse)
def analyze_news(request: NewsRequest):
    result = analyze_fake_news(request.text)

    verdict = result.get("verdict", "Uncertain")
    explanation = result.get("explanation", "No explanation available.")
    confidence = normalize_confidence(result.get("confidence"))

    return NewsResponse(
        verdict=verdict,
        confidence=confidence,
        explanation=explanation
    )