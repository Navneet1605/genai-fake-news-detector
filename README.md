#  GenAI Fake News Detector

An AI-powered misinformation detection platform that verifies suspicious claims using **live news evidence + LLM reasoning**.

Built with **FastAPI, Groq LLM, GNews API, Next.js, and Tailwind CSS**.

---

##  Overview

Fake news spreads rapidly across social media, messaging apps, and online platforms, making misinformation harder to detect.

This project helps users verify suspicious claims by:

- analyzing the claim
- searching live news sources for evidence
- using an LLM to reason over the evidence
- generating a verdict with confidence and explanation

### Verdict Types
-  **Real**
-  **Fake**
-  **Uncertain**

---

##  Features

###  AI-Powered Fact Checking
- LLM-based misinformation detection
- Context-aware reasoning
- Natural language explanation generation

###  Live News Verification
- Real-time news retrieval using GNews API
- Evidence-backed validation
- Source attribution for transparency

###  Smart Verdict System
Each analysis returns:

- Verdict
- Confidence score
- Explanation
- Supporting evidence sources

Example response:

```json
{
  "verdict": "Uncertain",
  "confidence": 72,
  "explanation": "Available evidence does not conclusively confirm the claim.",
  "sources": [
    {
      "title": "Example article",
      "source": "Reuters",
      "url": "https://example.com"
    }
  ]
}
```

### 🎨 Modern Interactive UI
- Responsive frontend
- Smooth animations
- Cyber/AI-inspired interface
- Clean user experience

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- FastAPI
- Python
- Groq API
- GNews API

### AI Model
- Llama 3.3 70B (via Groq)

---

##  System Architecture

```text
User Claim
   ↓
Claim Preprocessing
   ↓
Search Query Optimization
   ↓
Live News Retrieval (GNews)
   ↓
Evidence Parsing
   ↓
LLM Analysis (Groq)
   ↓
Verdict Generation
   ↓
Frontend Response
```

---

##  Project Structure

```bash
genAI-fake-news-detector/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── analyze.py
│   │   │
│   │   ├── services/
│   │   │   ├── gemini_service.py
│   │   │   └── gnews_service.py
│   │   │
│   │   ├── models/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

##  Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/genAI-fake-news-detector.git
cd genAI-fake-news-detector
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## ⚙️ Backend Setup

Move to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate it:

### Windows
```bash
venv\Scripts\activate
```

### Mac/Linux
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
GNEWS_API_KEY=your_gnews_api_key
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```bash
http://localhost:8000
```

---

##  Frontend Setup

Move to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:3000
```

---

## 🔌 API Endpoint

### Analyze Claim

**POST** `/analyze`

Request:

```json
{
  "text": "India won the 2026 ICC T20 World Cup"
}
```

Response:

```json
{
  "verdict": "Uncertain",
  "confidence": 65,
  "explanation": "Available evidence does not confirm the claim.",
  "sources": [
    {
      "title": "News article title",
      "source": "BBC",
      "url": "https://..."
    }
  ]
}
```

---

## 🎥 Demo

### Sample Project Runs

#### UI Walkthrough
![Project Demo 1](./prjss1.gif)

#### Fake Claim Analysis
![Project Demo 2](./prjss2.gif)

#### Live News Verification
![Project Demo 3](./prjss3.gif)

---

##  Future Improvements

Planned upgrades:

- URL article fact checking
- Image / screenshot fake news detection
- OCR integration
- WhatsApp forward verification
- Social media misinformation analysis
- RAG-based evidence retrieval
- Source credibility scoring
- Domain-specific fact checking
- Multilingual misinformation detection

---

##  Why This Project Matters

Misinformation can influence:

- Elections
- Public safety
- Healthcare decisions
- Financial markets
- Social trust

This project demonstrates how Generative AI can be used responsibly to combat misinformation using transparent, evidence-backed reasoning.

---

##  Author

**Navneet Singh**

GitHub: https://github.com/YOUR_USERNAME

---

## 📄 License

MIT License
