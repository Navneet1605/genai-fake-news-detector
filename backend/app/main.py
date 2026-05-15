from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Fake News Detector API Running"}