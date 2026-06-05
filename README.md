# Cybersec AI

India-centric AI & cybersecurity awareness presentation and live chatbot demo for government workers.

## What's included

- **`/deck`** — 20 scrollable slides (NEET, CUET, CBSE OSM, deepfakes, Claude Mythos, action checklists)
- **`/demo`** — Two tabs: guarded security chatbot + **live deanonymizer** Reddit OSINT exposure audit
- **`/api/chat`** — OpenAI **Responses API** (not Chat Completions) with built-in `web_search`, SSE streaming
- **`/api/audit`** — SSE-streamed exposure audit (deanonymizer pipeline)
- **Export** — Hand-crafted PDF + PPTX served from `public/downloads/`
- **`research/`** — Source documentation for slide content

## Setup

```bash
npm install
cp .env.example .env.local
# Add OPENAI_API_KEY to .env.local
npm run generate:downloads   # writes PDF/PPTX to public/downloads/
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deanonymizer integration

The `deanonymizer/` package is the real CLI tool — not a mock. The web demo:

1. Fetches public Reddit history (Arctic Shift API)
2. Chunks and analyzes with OpenAI or Anthropic
3. Returns findings with evidence quotes and remediation

**Workshop rules:** consent checkbox required, max 80 items per audit. Run only on accounts you own.

LLM priority: `OPENAI_API_KEY` (shared with chatbot) → `ANTHROPIC_API_KEY` fallback.

## Chatbot (`/api/chat`)

Uses the OpenAI **Responses API** via the official `openai` SDK:

- **Model:** `OPENAI_CHAT_MODEL` (default `gpt-4o-mini`)
- **Tools:** built-in `web_search_preview` (toggle with `OPENAI_CHAT_ENABLE_WEB_SEARCH`, default `true`)
- **Streaming:** SSE events — `delta` (`{ text }`), `status` (`{ phase: "searching" }`), `done` (`{}`), `error` (`{ message }`)
- **Multi-turn:** client sends full `messages` array on each request
- **Prompt:** [`src/lib/chat-system-prompt.ts`](src/lib/chat-system-prompt.ts) — India govt workers, NEET/CBSE/deepfakes/deanonymizer, refusals, workshop-only, cybercrime.gov.in

The frontend ([`ChatDemo.tsx`](src/components/demo/ChatDemo.tsx)) uses custom fetch/SSE instead of Vercel AI SDK `useChat`.

## Workshop materials (PDF / PPTX)

Static files in [`public/downloads/`](public/downloads/):

| File | Endpoint |
|------|----------|
| `ai-cybersecurity-awareness.pdf` | `GET /api/export/pdf` |
| `ai-cybersecurity-awareness.pptx` | `GET /api/export/pptx` |

Generate from slide content:

```bash
npm run generate:downloads
```

Swap files manually and redeploy — no code changes.

## Rate limits

Configured via env vars (set in Vercel → Settings → Environment Variables):

| Variable | Default | Applies to |
|----------|---------|------------|
| `OPENAI_CHAT_MODEL` | `gpt-4o-mini` | `POST /api/chat` (Responses API) |
| `OPENAI_CHAT_ENABLE_WEB_SEARCH` | `true` | `POST /api/chat` — built-in web search tool |
| `RATE_LIMIT_CHAT_MAX` | `30` | `POST /api/chat` |
| `RATE_LIMIT_CHAT_WINDOW_MS` | `3600000` (1 hr) | per client IP |
| `RATE_LIMIT_AUDIT_MAX` | `3` | `POST /api/audit` |
| `RATE_LIMIT_AUDIT_WINDOW_MS` | `3600000` (1 hr) | per client IP |

Implementation: [`src/lib/rate-limit.ts`](src/lib/rate-limit.ts) — in-process sliding window per IP.

**Vercel platform options (optional, stricter):**

- **Vercel Firewall** (Pro+): rate-limit `/api/chat` and `/api/audit` by IP in the dashboard — works globally across all function instances.
- **Upstash Redis / Vercel KV**: replace in-memory store if you need shared limits across serverless instances (in-memory resets per cold start / region).

In-memory limits are fine for a workshop demo; tighten `RATE_LIMIT_AUDIT_MAX=1` for public deploys.

## Deploy to Vercel

```bash
npx vercel
npx vercel env add OPENAI_API_KEY
# optional: npx vercel env add ANTHROPIC_API_KEY
npx vercel env add RATE_LIMIT_CHAT_MAX
npx vercel env add RATE_LIMIT_AUDIT_MAX
npx vercel --prod
```

Note: `/api/audit` needs `maxDuration` up to 300s (Vercel Pro for long analyses).

## Workflow (replaces Gamma + screenshots)

1. Present live at `/deck` or share the Vercel URL
2. When attendees ask for materials → **Download PDF / PPTX** from the deck toolbar, or share the deck URL
3. Update slide content in `src/content/slides.ts`; research notes in `research/`

## Research docs

| File | Contents |
|------|----------|
| `research/01-india-education-failures.md` | NEET, CUET, CBSE |
| `research/02-india-additional-incidents.md` | SSC, portals, deepfakes |
| `research/03-global-ai-threats.md` | Claude Mythos, phishing, exfiltration |
