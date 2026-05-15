```markdown
# 🛡️ GenAI Fake News Detector
> **AI-powered fact-checking** combining NLP classification, LLM reasoning, and retrieval-based verification.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Gemini](https://img.shields.io/badge/AI-Gemini_1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📖 Overview
This platform combat misinformation using a multi-layered verification approach. It provides an **explainable verdict** by analyzing context and cross-referencing data using Google Gemini.

### ✨ Features
* 🔍 **Classification:** High-speed NLP analysis of news headers.
* 🤖 **LLM Reasoning:** Deep semantic analysis via Google Gemini.
* ✅ **Fact Verification:** Real-time cross-referencing with trusted news sources.
* 📝 **Explainable AI:** Detailed reasoning for every "Fake", "Real", or "Uncertain" verdict.
* 📜 **History Tracking:** Save and manage previous analysis reports.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (React), Tailwind CSS |
| **Backend** | FastAPI (Python 3.11+) |
| **Database** | Supabase (PostgreSQL) |
| **AI Models** | HuggingFace Transformers + Gemini API |
| **Retrieval** | NewsAPI + FAISS / ChromaDB |

---

## 🚀 Getting Started

### 1️⃣ Backend Setup (FastAPI)
Open your PowerShell terminal and execute these commands:

**Step 1: Navigate to backend**
```powershell
cd backend

```

**Step 2: Activate Virtual Environment**

```powershell
.\venv\Scripts\Activate.ps1

```

**Step 3: Install Dependencies**

```powershell
pip install -r requirements.txt

```

**Step 4: Start the Server**

```powershell
uvicorn app.main:app --reload

```

> 🔗 **Local API:** [http://127.0.0.1:8000](https://www.google.com/search?q=http://127.0.0.1:8000)
> 📑 **Interactive Docs:** [http://127.0.0.1:8000/docs](https://www.google.com/search?q=http://127.0.0.1:8000/docs)

---

### 2️⃣ Frontend Setup (Next.js)

Open a **new** terminal tab and execute:

**Step 1: Navigate to frontend**

```powershell
cd frontend

```

**Step 2: Install Packages**

```powershell
npm install

```

**Step 3: Run Development Server**

```powershell
npm run dev

```

> 🔗 **Web Interface:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

---

## 🔐 Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_google_ai_studio_key
DATABASE_URL=your_supabase_connection_string

```

---

## 📂 Project Structure

```text
genai-fake-news-detector/
├── backend/            # FastAPI source code & logic
│   ├── app/            # Main application package
│   │   ├── models/     # Pydantic schemas
│   │   ├── routes/     # API endpoints
│   │   └── services/   # AI & Gemini logic
│   └── venv/           # Python environment
└── frontend/           # Next.js UI & components

```

```

```
