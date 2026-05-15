from fastapi import FastAPI
from app.routes.analyze import router as analyze_router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Fake News Detector API Running"}

app.include_router(analyze_router)