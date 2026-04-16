// server.js — AmalGus Backend
// Vector search: TF-IDF cosine similarity (runs 100% locally, no model download)
// AI explanations: Anthropic Claude API

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import Anthropic from '@anthropic-ai/sdk';
import { PRODUCTS } from './products.js';

dotenv.config();

const require = createRequire(import.meta.url);
const natural = require('natural');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ─── TF-IDF INDEX ─────────────────────────────────────────
const TfIdf    = natural.TfIdf;
const tfidf    = new TfIdf();
const tokenizer = new natural.WordTokenizer();
const stemmer  = natural.PorterStemmer;

// Domain synonyms — expands buyer language to product terms
const SYNONYMS = {
  'partition'  : ['partition','divider','cabin','interior'],
  'balcony'    : ['balcony','railing','balustrade','VSG','safety'],
  'shower'     : ['shower','bathroom','nano','easy clean','hydrophobic'],
  'window'     : ['window','float','residential','glazing'],
  'facade'     : ['facade','curtain wall','exterior','architectural','storefront'],
  'budget'     : ['cheap','economical','affordable','float','standard'],
  'energy'     : ['energy','insulated','IGU','Low-E','thermal','double glazed'],
  'privacy'    : ['privacy','frosted','etched','reflective','tinted'],
  'safety'     : ['safety','laminated','tempered','toughened','IS 2553'],
  'noise'      : ['acoustic','soundproof','STC','quiet'],
  'skylight'   : ['skylight','rooflight','overhead','SGP'],
  'solar'      : ['solar','photovoltaic','PV','renewable'],
  'luxury'     : ['luxury','premium','smart','switchable'],
  'mirror'     : ['mirror','reflective','silver','bronze','antique'],
  'staircase'  : ['staircase','stair','handrail','balustrade'],
  'curtain wall': ['spider','point fixed','structural','facade'],
};

function buildDocText(p) {
  return [p.name, p.category, p.color, p.coating, p.edge,
          p.certification, p.description, p.tags.join(' '),
          p.thickness ? p.thickness + 'mm' : '', p.supplier]
    .filter(Boolean).join(' ').toLowerCase();
}

function expandQuery(q) {
  const lower = q.toLowerCase();
  let out = lower;
  for (const [key, syns] of Object.entries(SYNONYMS)) {
    if (lower.includes(key)) out += ' ' + syns.join(' ');
  }
  return out;
}

function extractSignals(q) {
  const lower = q.toLowerCase();
  const sig = { thickness: null, priceSignal: null, colors: [], certs: [] };
  const m = lower.match(/(\d+(?:\.\d+)?)\s*mm/);
  if (m) sig.thickness = parseFloat(m[1]);
  if (/budget|cheap|economical|affordable/.test(lower)) sig.priceSignal = 'low';
  if (/premium|luxury|best quality/.test(lower))        sig.priceSignal = 'high';
  if (/clear|transparent/.test(lower)) sig.colors.push('clear');
  if (/bronze/.test(lower))            sig.colors.push('bronze');
  if (/grey|gray/.test(lower))         sig.colors.push('grey');
  if (/frosted|satin/.test(lower))     sig.colors.push('frosted');
  if (/blue/.test(lower))              sig.colors.push('blue');
  if (/IS\s*2553/i.test(q)) sig.certs.push('IS 2553');
  if (/IS\s*2835/i.test(q)) sig.certs.push('IS 2835');
  if (/IS\s*13830/i.test(q)) sig.certs.push('IS 13830');
  return sig;
}

function tfidfCosine(queryTerms, docIdx) {
  const termSet = [...new Set(queryTerms)];
  let dot = 0, qNorm = 0, dNorm = 0;
  termSet.forEach(t => {
    const qv = queryTerms.filter(x => x === t).length;
    const dv = tfidf.tfidf(t, docIdx);
    dot  += qv * dv;
    qNorm += qv * qv;
    dNorm += dv * dv;
  });
  if (!qNorm || !dNorm) return 0;
  return dot / (Math.sqrt(qNorm) * Math.sqrt(dNorm));
}

function signalBonus(p, sig) {
  let b = 0;
  if (sig.thickness) {
    if (p.thickness === sig.thickness)                          b += 0.30;
    else if (p.thickness && Math.abs(p.thickness - sig.thickness) <= 2) b += 0.10;
  }
  if (sig.priceSignal === 'low'  && p.price < 500)  b += 0.15;
  if (sig.priceSignal === 'low'  && p.price < 300)  b += 0.10;
  if (sig.priceSignal === 'high' && p.price > 3000) b += 0.10;
  sig.colors.forEach(c => { if (p.color.toLowerCase().includes(c)) b += 0.08; });
  sig.certs.forEach(c => { if (p.certification.toLowerCase().includes(c.toLowerCase())) b += 0.10; });
  return Math.min(b, 0.50);
}

// ─── INIT ─────────────────────────────────────────────────
let isReady = false;
function initIndex() {
  console.log(`[INDEX] Indexing ${PRODUCTS.length} products with TF-IDF...`);
  PRODUCTS.forEach(p => tfidf.addDocument(buildDocText(p)));
  isReady = true;
  console.log('[READY] Vector index ready.\n');
}

// ─── ROUTES ───────────────────────────────────────────────
app.get('/api/status', (_req, res) =>
  res.json({ ready: isReady, productCount: PRODUCTS.length }));

app.get('/api/products', (_req, res) => res.json(PRODUCTS));

app.get('/api/categories', (_req, res) =>
  res.json([...new Set(PRODUCTS.map(p => p.category))].sort()));

app.post('/api/search', async (req, res) => {
  if (!isReady) return res.status(503).json({ error: 'Initializing…' });
  const { query, topK = 3, filters = {} } = req.body;
  if (!query || query.trim().length < 3)
    return res.status(400).json({ error: 'Query too short.' });

  try {
    // 1. Tokenise + stem expanded query
    const expanded    = expandQuery(query.trim());
    const queryTokens = tokenizer.tokenize(expanded).map(t => stemmer.stem(t));
    const signals     = extractSignals(query);

    // 2. Hard filters
    let candidates = PRODUCTS.map((p, i) => ({ p, i }));
    if (filters.category)  candidates = candidates.filter(c => c.p.category === filters.category);
    if (filters.maxPrice)  candidates = candidates.filter(c => c.p.price <= +filters.maxPrice);
    if (filters.thickness) candidates = candidates.filter(c => c.p.thickness === +filters.thickness);
    if (!candidates.length) return res.json({ results: [], query, message: 'No products match filters.' });

    // 3. Score: TF-IDF cosine + structured signal bonus
    const scored = candidates
      .map(({ p, i }) => ({ p, score: tfidfCosine(queryTokens, i) + signalBonus(p, signals) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    // 4. Normalise to 60–98 %
    const hi = scored[0].score, lo = scored[scored.length - 1].score;
    const rng = hi - lo || 0.001;
    const results = scored.map(({ p, score }, i) => {
      let pct = Math.round(62 + ((score - lo) / rng) * 28);
      if (i === 0) pct = Math.min(98, pct + 6);
      return { ...p, matchScore: pct };
    });

    // 5. Claude explanations
    let explanations = [];
    const key = process.env.ANTHROPIC_API_KEY;
    if (key && key !== 'your_anthropic_api_key_here') {
      const client = new Anthropic({ apiKey: key });
      const summaries = results.map((p, i) =>
        `Product ${i+1}: "${p.name}" (${p.category}${p.thickness?', '+p.thickness+'mm':''}, ₹${p.price} ${p.priceUnit}). ${p.description}`
      ).join('\n\n');

      const msg = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are a glass expert at AmalGus marketplace. Give clear, simple explanations to buyers. Respond with valid JSON only.',
        messages: [{ role: 'user', content:
          `Buyer requirement: "${query}"\n\nMatched products:\n${summaries}\n\n` +
          `Return a JSON array of ${results.length} objects each with:\n` +
          `- id (1/2/3)\n- whyThisGlass (2-3 simple sentences why it fits)\n` +
          `- keyBenefits (array of 3 strings, max 6 words each)\n` +
          `- considerations (1 sentence trade-off)\nNo markdown, only JSON.`
        }]
      });
      try {
        explanations = JSON.parse(msg.content[0].text.replace(/```json|```/g,'').trim());
      } catch { /* use fallback */ }
    }

    // 6. Merge & respond
    const final = results.map((p, i) => ({
      ...p,
      explanation: explanations.find(e => e.id === i+1) || explanations[i] || {
        whyThisGlass: `This ${p.category} is a strong match for your stated requirements based on specifications and use-case alignment.`,
        keyBenefits: ['IS certified quality', 'Verified supplier', 'Matched specifications'],
        considerations: 'Confirm dimensions and delivery timeline with the supplier.'
      }
    }));

    res.json({ results: final, query });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n[SERVER] AmalGus running at http://localhost:${PORT}`);
  initIndex();
});
