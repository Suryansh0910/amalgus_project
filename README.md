# AmalGus — Smart Glass Product Discovery

AI-powered glass marketplace with TF-IDF vector search + Claude explanations.

---

## Project Structure

```
amalgus-glass/
├── server.js       ← Node.js + Express backend (API + serves frontend)
├── products.js     ← 40 glass & allied product mock data
├── index.html      ← Complete frontend (Fraunces + Geist fonts, Lucide icons)
├── package.json    ← Dependencies
├── .env            ← Your API key (fill this in)
└── README.md
```

---

## How to Run

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Add your Anthropic API key
Open `.env` and replace the placeholder:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3001
```
Get a free key at https://console.anthropic.com

### Step 3 — Start the server
```bash
node server.js
```

You will see:
```
🚀  AmalGus → http://localhost:3001
📦 Indexing 40 products with TF-IDF...
✅ Vector index ready.
```

### Step 4 — Open in browser
Go to: http://localhost:3001

The server automatically serves `index.html` — no separate frontend step needed.

---

## How Matching Works

1. **TF-IDF vector index** built from all 40 products on startup (instant)
2. **Query expansion** — buyer words like "balcony" expand to: railing, balustrade, VSG, safety glass
3. **Cosine similarity** — scores every product against your query mathematically
4. **Signal bonus** — thickness match (+0.30), budget signal, color, certifications add extra weight
5. **Claude API** — top 3 results sent to Claude which writes plain-language explanations

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/status | Server ready status |
| GET | /api/products | All 40 products |
| GET | /api/categories | Distinct categories |
| POST | /api/search | `{ query, topK, filters }` → matched products + AI explanations |

---

## Tech Stack

- **Backend** — Node.js + Express (ESM)
- **Vector Search** — TF-IDF cosine similarity (`natural` npm package)
- **AI Explanations** — Anthropic Claude API
- **Frontend** — Vanilla HTML/CSS/JS, Fraunces + Geist fonts, Lucide icons

---

## Deploy to Render / Railway

1. Push this folder to a GitHub repo
2. Create a new Web Service, point to the repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env variable: `ANTHROPIC_API_KEY=sk-ant-...`
# amalgus_project
