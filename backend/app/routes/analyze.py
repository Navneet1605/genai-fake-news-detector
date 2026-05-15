from fastapi import APIRouter
from app.models.schemas import NewsRequest, NewsResponse

router = APIRouter()

@router.post("/analyze", response_model=NewsResponse)
def analyze_news(request: NewsRequest):
    return NewsResponse(
        verdict="Potentially Fake",
        confidence=78,
        explanation="This is a placeholder analysis."
    )