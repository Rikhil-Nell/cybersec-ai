# Policing, Real-World AI Wins & Positive AI Uses

> Constructive deck section: not just reassurance, but documented cases where AI helped in cybersecurity. India-first.

---

## Design intent

After the threat slides, the deck shifts to a **reassure** region (sky-blue tag) built around **evidence**, not platitudes:

- Practical "what to do" (1930, cybercrime.gov.in)
- Real cases where AI defended people and code
- What that means for a government desk

Tone: colleague, evidence-led. *Awareness ≠ anxiety.*

---

## Real-world AI defence cases (verified)

### 1. NPCI / RBI — AI scoring UPI fraud (India)

- UPI fraud rose **85% in FY 2023–24** → **Rs 1,087 crore** lost (NPCI CRO Viswanath Krishnamurthy, Apr 2025).
- NPCI runs **AI/ML risk scoring** on accounts by money-flow history; flags mule accounts collecting from many users.
- Banks are alerted (or authorised to decline) → they **call the customer** before the transfer clears. NPCI says it has **already declined** fraudulent transactions this way. Federated model (banks ↔ NPCI share scores).
- RBI Innovation Hub building **DPIP** (Digital Payments Intelligence Platform) — real-time risk scoring using telecom + cybercrime data to catch mule/synthetic accounts.
- Sources: The Hindu BusinessLine; Medianama; ET BFSI; RBIH/Moneycontrol (2025).

### 2. Google Big Sleep — first AI-found zero-day

- **Oct/Nov 2024:** AI agent (Project Zero + DeepMind) found an exploitable stack-buffer-underflow in **SQLite** — first public case of an AI agent finding an unknown exploitable memory-safety bug in real software. Fixed same day, before release.
- **July 2025:** found **CVE-2025-6965**, a critical SQLite flaw "known only to threat actors," and cut it off — Google calls it the first time an AI agent directly foiled an in-the-wild exploit.
- Why it matters to govt: SQLite sits under countless apps, including government/banking back-ends.
- Sources: Google Project Zero "From Naptime to Big Sleep" (Oct 2024); Google Cloud blog + blog.google (Jul 2025); SC Media; Dark Reading.

### 3. DARPA AI Cyber Challenge (AIxCC) — DEF CON 33, Aug 2025

- Autonomous **Cyber Reasoning Systems** scanned **54M lines of code**.
- Found **54 synthetic** vulns (patched 43) **and 18 real, non-synthetic zero-days**; auto-patched 11 real ones; ~**45 min** average patch time.
- Winners: **Team Atlanta ($4M)**, **Trail of Bits ($3M)**, **Theori ($1.5M)**; **all 7 finalists open-sourced** their systems. DARPA/ARPA-H to apply them to critical infrastructure incl. health care.
- Govt parallel: the kind of pre-launch audit India's exam/citizen portals lacked (CBSE master password, S3 buckets).
- Sources: darpa.mil/news/2025/aixcc-results; CyberScoop; ARPA-H; aicyberchallenge.com.

### 4. Anthropic — disrupting an AI-orchestrated espionage campaign

- **Sep–Nov 2025:** a state-linked group (GTG-1002) manipulated **Claude Code** into running **80–90%** of an espionage campaign vs ~**30** orgs, at thousands of requests/sec.
- Anthropic's **threat-intelligence team detected and disrupted** it in ~**10 days**: banned accounts, **notified ~30 targets**, upgraded defences. AI hallucinated fake credentials, slowing attackers.
- Double-edged but key point: **AI-speed attacks can be caught by AI-aware defenders + monitoring.**
- Sources: Anthropic "Disrupting the first reported AI-orchestrated cyber espionage campaign" (Nov 2025); MITRE ATT&CK Campaign C0062; SecurityWeek; Paul Weiss.

---

## Policing & cybercrime (context)

- **cybercrime.gov.in** — MHA / I4C National Cyber Crime Reporting Portal.
- **1930** — cyber fraud helpline; fast reporting can freeze mule accounts.
- Maharashtra Apr 2025: police/MPSC/pension creds on darknet — even police IT needs hygiene (`02`).
- Deepfake impersonation of officials; UGC-NET hoax vs real leak — verify before forwarding (`02`).

## Positive AI at a government desk (with guardrails)

| Use | Guardrail |
|-----|-----------|
| Plain-language circular summaries | Redact secrets first |
| Draft citizen replies / translations | Officer approves before send |
| Guarded staff chatbot (`/demo`) | Approved deployment |
| Defensive exposure audit (`/demo?tab=audit`) | Own accounts only |
| Vendor pre-launch code review | CBSE counter-example (`01`) |

**Governance one-liner:** machine proposes, human disposes. Same accountability as NPCI's "bank still calls you."

---

## Slide mapping (current deck)

| Slide ID | Title (short) | Sources |
|----------|---------------|---------|
| `help-exists` | Real help exists (1930) | `04` I4C/1930 |
| `spot-fake-police` | Fake vs real cyber police | `04`, `02` deepfakes |
| `npci-ai-fraud` | AI guards your UPI | NPCI/RBI 2025 (above) |
| `ai-finds-bugs` | Big Sleep finds zero-day | Google PZ/DeepMind 2024–25 |
| `ai-cyber-challenge` | DARPA AIxCC | darpa.mil 2025, CyberScoop |
| `ai-vs-ai` | Anthropic disrupts AI attack | Anthropic Nov 2025, MITRE C0062 |
| `ai-for-good` | Safe uses at your desk | `04` |
| `ai-you-in-charge` | Machine proposes, you dispose | `04`, NPCI model |
