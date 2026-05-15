🛡️ GenAI Fake News DetectorAI-powered fact-checking combining NLP classification, LLM reasoning, and retrieval-based verification.📖 OverviewThis platform is designed to combat misinformation by utilizing a multi-layered verification approach. It doesn't just guess if news is fake; it provides an explainable verdict by analyzing context and cross-referencing data.✨ Key Features🔍 Classification: High-speed NLP analysis of news headers.🤖 LLM Reasoning: Deep semantic analysis via Google Gemini.✅ Fact Verification: Real-time cross-referencing with trusted news sources.📝 Explainable AI: Detailed reasoning for every "Fake" or "Real" verdict.📜 History Tracking: Save and manage previous analysis reports.🛠️ Tech StackLayerTechnologyFrontendNext.js (React), Tailwind CSSBackendFastAPI (Python 3.11+)DatabaseSupabase (PostgreSQL)AI ModelsHuggingFace Transformers + Gemini APIRetrievalNewsAPI + FAISS / ChromaDB🚀 Getting Started1️⃣ Backend Setup (FastAPI)Bash# Navigate to backend
cd backend

# Activate Virtual Environment
.\venv\Scripts\Activate.ps1

# Install Dependencies
pip install -r requirements.txt

# Start the Server
uvicorn app.main:app --reload
🔗 Local API: http://127.0.0.1:8000📑 Interactive Docs: http://127.0.0.1:8000/docs2️⃣ Frontend Setup (Next.js)Bash# Navigate to frontend
cd frontend

# Install Packages
npm install

# Run Development Server
npm run dev
🔗 Web Interface: http://localhost:3000🔐 Environment ConfigurationCreate a .env file in the backend/ directory:Code snippetGEMINI_API_KEY=your_google_ai_studio_key
DATABASE_URL=your_supabase_connection_string
📂 Project StructurePlaintextgenai-fake-news-detector/
├── backend/            # FastAPI source code & logic
│   ├── app/            # Main application package
│   │   ├── models/     # Pydantic schemas
│   │   ├── routes/     # API endpoints (analyze, history)
│   │   └── services/   # AI & Gemini logic
│   └── venv/           # Python environment
└── frontend/           # Next.js UI & components