GenAI Fake News Detector
An AI-powered fake news detection platform that combines NLP classification, LLM reasoning, and retrieval-based fact verification.

Tech Stack
Frontend: Next.js

Backend: FastAPI

Database: Supabase/PostgreSQL

AI: HuggingFace Transformers + Gemini/OpenAI

Retrieval: NewsAPI + FAISS/Chroma

Features
Fake news classification

Claim extraction

Fact verification

Explainable verdict

URL/article analysis

History tracking

🚀 How to Run the Project
1. Backend (FastAPI)
Location: /backend

Navigate to directory:
cd backend

Activate Virtual Environment:
.\venv\Scripts\Activate.ps1 (Windows) or source venv/bin/activate (Mac/Linux)

Install Dependencies:
pip install -r requirements.txt

Start Server:
uvicorn app.main:app --reload

Local Link: http://127.0.0.1:8000

API Documentation (Swagger): http://127.0.0.1:8000/docs

2. Frontend (Next.js)
Location: /frontend

Navigate to directory:
cd frontend

Install Packages:
npm install

Start Development Server:
npm run dev

Local Link: http://localhost:3000

🔑 Environment Variables
Ensure you have a .env file in the /backend folder with the following:

GEMINI_API_KEY=your_api_key_here