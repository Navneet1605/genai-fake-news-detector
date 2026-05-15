from pydantic import BaseModel

class NewsRequest(BaseModel):
    text: str

class NewsResponse(BaseModel):
    verdict: str
    confidence: int
    explanation: str