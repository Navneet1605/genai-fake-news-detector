from pydantic import BaseModel


class NewsRequest(BaseModel):
    text: str


class Source(BaseModel):
    source: str
    title: str
    url: str


class NewsResponse(BaseModel):
    verdict: str
    confidence: int
    explanation: str
    sources: list[Source] = []