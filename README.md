# GenAI Fake News Detector

AI-powered misinformation detection platform that verifies suspicious claims using live news evidence and LLM reasoning and RAG framework.

Built with FastAPI, Groq LLM, GNews API, Next.js, and Tailwind CSS.

---

## Live Demo

Deployed Application:  
https://genai-fake-news-frontend.onrender.com/

---

## Overview

Fake news spreads rapidly across social media, messaging apps, and online platforms, making misinformation increasingly difficult to identify.

This project helps users verify suspicious claims by:

- analyzing user-submitted claims
- retrieving relevant live news evidence
- reasoning over evidence using large language models
- generating transparent verdicts with confidence scoring

### Verdict Categories

- Real
- Fake
- Uncertain

---

## Features

### AI-Powered Fact Checking

- LLM-based misinformation detection
- Context-aware reasoning
- Natural language explanation generation
- Confidence scoring

### Live News Verification

- Real-time evidence retrieval using GNews API
- Trusted source-backed validation
- Transparent source attribution

### Verdict Analysis

Each analysis returns:

- verdict
- confidence score
- explanation
- supporting evidence sources

Example:

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

### Frontend Interface

- Responsive Next.js frontend
- Clean interactive design
- Smooth user experience
- Real-time feedback

---

## Tech Stack

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

## System Architecture

```text
User Claim
   ↓
Claim Preprocessing
   ↓
Search Query Optimization
   ↓
Live News Retrieval (GNews API)
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

## Project Structure

```bash
genAI-fake-news-detector/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── analyze.py
│   │   │
│   │   ├── services/
│   │   │   ├── groq_service.py
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

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/NavneetSingh/genAI-fake-news-detector.git
cd genAI-fake-news-detector
```

---

## Backend Setup

Move into backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

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

## Frontend Setup

Move into frontend:

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

## API Endpoint

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

## Demonstration

### UI Walkthrough

![Demo 1](./prjss1.gif)

### Fake Claim Detection

![Demo 2](./prjss2.gif)

### Live Verification Example

![Demo 3](./prjss3.gif)

---

## Future Improvements

Planned enhancements:

- URL article fact checking
- Screenshot/image fake news detection
- OCR integration
- WhatsApp forward verification
- Social media misinformation analysis
- Retrieval-Augmented Generation (RAG)
- Source credibility scoring
- Domain-specific fact verification
- Multilingual support

---

## Why This Project Matters

Misinformation can significantly influence:

- elections
- public safety
- healthcare decisions
- financial markets
- public trust

This project demonstrates how Generative AI can be responsibly used to combat misinformation using transparent, evidence-backed reasoning.

---

## Author

Navneet Singh

GitHub: https://github.com/Navneet1605

---

## License

MIT License
