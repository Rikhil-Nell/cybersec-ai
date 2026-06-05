export type SlideVariant =
  | "hero"
  | "case-study"
  | "checklist"
  | "diagram"
  | "cta"
  | "comparison"
  | "timeline";

export type SlideVisual =
  | "hero-collage"
  | "ai-truth"
  | "india-map"
  | "neet-2024"
  | "neet-2026"
  | "exam-grid"
  | "cbse-code"
  | "portal-breach"
  | "paste-warning"
  | "deepfake"
  | "ripple"
  | "deanonymizer"
  | "global-speed"
  | "mythos"
  | "global-grid"
  | "chatbot-stack"
  | "checklist"
  | "demo"
  | "roadmap";

export interface SlideStat {
  value: string;
  label: string;
}

export interface SlideBullet {
  text: string;
  detail?: string;
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: SlideBullet[];
  variant: SlideVariant;
  region?: "india" | "global" | "action";
  highlight?: string;
  callout?: string;
  stats?: SlideStat[];
  visual?: SlideVisual;
  aside?: string;
}

export const slides: Slide[] = [
  {
    id: "title",
    title: "AI is not just ChatGPT on your phone",
    subtitle:
      "A plain-language briefing for government staff — exam leaks, portal disasters, and why that chat app on your desk is a security problem.",
    variant: "hero",
    region: "india",
    callout: "Sibi Chakkaravarthy Sethuraman · June 2026",
    visual: "hero-collage",
    stats: [
      { value: "20", label: "slides" },
      { value: "2024–26", label: "incidents covered" },
      { value: "India → World", label: "arc" },
    ],
  },
  {
    id: "hook",
    title: "What is AI, really?",
    subtitle:
      "Not magic. Not a person. A pattern-matching engine that guesses the next word — very convincingly.",
    bullets: [
      {
        text: "Everything you type can leave your building",
        detail:
          "Consumer AI stores conversations on vendor servers. 'Delete chat' ≠ gone from everywhere.",
      },
      {
        text: "It will answer even when it doesn't know",
        detail:
          "Hallucination isn't a bug — the system is built to sound fluent, not to admit ignorance.",
      },
      {
        text: "It works for the company that runs it",
        detail:
          "Not for your department, not for the citizen whose Aadhaar you pasted in.",
      },
    ],
    variant: "diagram",
    region: "india",
    visual: "ai-truth",
    highlight:
      "Rule of thumb: if you wouldn't fax it to a stranger in California, don't paste it into ChatGPT.",
    aside: "Most officials I meet have only ever used AI on their phone. That's the whole problem.",
  },
  {
    id: "india-context",
    title: "We start with India because the wounds are fresh",
    subtitle: "NTA, CBSE, state commissions — and your own office laptop.",
    bullets: [
      {
        text: "Crores of students bet their futures on portals that crash on result day",
      },
      {
        text: "Paper leaks still travel on Telegram — human couriers, not hackers in hoodies",
      },
      {
        text: "Finance Ministry told staff in Jan 2025: stop using ChatGPT on office machines",
      },
      {
        text: "The leaks today need people. Tomorrow they may not.",
      },
    ],
    variant: "timeline",
    region: "india",
    visual: "india-map",
    stats: [
      { value: "9L+", label: "UGC-NET cancelled" },
      { value: "13L+", label: "JEE result-day crash" },
      { value: "Jan '25", label: "FinMin AI advisory" },
    ],
  },
  {
    id: "neet-2024",
    title: "NEET 2024 — the leak the Supreme Court acknowledged",
    bullets: [
      {
        text: "May 5: paper out before the exam ended",
        detail: "CBI traced it to Oasis School, Hazaribagh — principal + centre superintendent.",
      },
      {
        text: "~155 students got direct benefit",
        detail: "Networks in Patna and Hazaribagh; coaching centres in the loop.",
      },
      {
        text: "Too many perfect scores",
        detail: "Unusual count of 720/720; grace marks fight dragged for weeks.",
      },
      {
        text: "Court said leak was real — but refused full re-test",
        detail: "Results stood. Students who didn't cheat still paid the trust tax.",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "neet-2024",
    callout: "Insider + WhatsApp + Telegram. Same playbook for decades.",
    stats: [
      { value: "155", label: "direct beneficiaries" },
      { value: "720", label: "suspicious perfect scores" },
      { value: "CBI", label: "investigation" },
    ],
  },
  {
    id: "neet-2026",
    title: "NEET 2026 — entire exam cancelled. First time ever.",
    bullets: [
      {
        text: "Fresh leak allegations while 2024 cases still in court",
      },
      {
        text: "Students protested nationwide — years of prep nullified overnight",
      },
      {
        text: "Strongroom security, logistics, coaching nexus: unchanged weaknesses",
      },
      {
        text: "Public Examinations Act 2024 is law. Enforcement is still catching up.",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "neet-2026",
    highlight:
      "A phone photo → OCR → Telegram bot → 50,000 subscribers. That pipeline can run without a human courier.",
    stats: [
      { value: "1st", label: "full NEET cancel" },
      { value: "2024", label: "Act in force" },
      { value: "?", label: "accountability" },
    ],
  },
  {
    id: "cuet-others",
    title: "CUET, UGC-NET, SSC — same disease, different headlines",
    bullets: [
      {
        text: "CUET: wrong papers handed out, registration servers dying mid-upload",
        detail: "Kanpur centre got the wrong set. Thousands re-tested.",
      },
      {
        text: "UGC-NET June 2024: 9+ lakh candidates sent home — exam cancelled next day",
      },
      {
        text: "Plot twist: CBI said one 'leak' was a teenager's fake screenshot",
        detail: "Hoaxes and real leaks now look identical. Verification before panic matters.",
      },
      {
        text: "SSC CGL 2025: candidate held the mouse, answers filled themselves",
        detail: "Dhanbad centre — exam server linked to remote operator.",
      },
      {
        text: "JEE Main 2025: result day = 500 errors for 13 lakh students",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "exam-grid",
    stats: [
      { value: "5/14", label: "NTA exams flagged by Parliament" },
      { value: "9L+", label: "UGC-NET affected" },
      { value: "Rs 1.17Cr", label: "railway racket seized" },
    ],
  },
  {
    id: "cbse-osm",
    title: "CBSE 2026 — master password in the frontend",
    subtitle:
      "Teen ethical hackers Nisarga Adhikary & Tirth Parmar opened DevTools and found the keys to the kingdom.",
    bullets: [
      {
        text: "const MASTER_PASSWORD = '...' — sitting in JavaScript anyone can read",
      },
      {
        text: "SQL injection paths, no IP restrictions, evaluator logins exposed",
      },
      {
        text: "Public S3 buckets: answer sheets, question papers, scanned booklets — no login required",
      },
      {
        text: "CBSE said 'test portal' at first. Then admitted gaps. IIT teams called in.",
      },
      {
        text: "Vendor reportedly ran answer sheets through Google Gemini",
        detail: "Third-party AI on children's exam data. Think about that.",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "cbse-code",
    highlight: "Vibecoded: ship fast, audit never, pray.",
    stats: [
      { value: "S3", label: "public buckets" },
      { value: "JS", label: "hardcoded creds" },
      { value: "2026", label: "answer sheets exposed" },
    ],
  },
  {
    id: "govt-portals",
    title: "It's not just exams — your portals leak too",
    bullets: [
      {
        text: "Income Tax e-Filing: change PAN in URL → see someone else's Aadhaar + bank account",
        detail: "135 million registered users. Classic missing auth check.",
      },
      {
        text: "S3WaaS govt cloud: years of open buckets with vaccination + passport data",
      },
      {
        text: "Maharashtra 2025: Police, MPSC, pension logins on the darknet",
      },
      {
        text: "Same failure mode as CBSE — misconfiguration, not genius hackers",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "portal-breach",
    callout: "A .gov.in domain does not mean someone audited the code.",
    stats: [
      { value: "135M", label: "IT portal users" },
      { value: "CERT-In", label: "warnings ignored" },
      { value: "0", label: "hacking skill needed" },
    ],
  },
  {
    id: "govt-ai-paste",
    title: "The ChatGPT habit in government offices",
    bullets: [
      {
        text: "FinMin circular, Jan 2025: no ChatGPT / DeepSeek on official devices",
      },
      {
        text: "Rajya Sabha, Mar 2025: no blanket ban — but confidentiality rules haven't gone anywhere",
      },
      {
        text: "Samsung engineers pasted chip secrets into ChatGPT three times in 20 days",
        detail: "If Fortune 500 engineers do it, your clerk will too.",
      },
      {
        text: "'I'm just cleaning up the wording' = uploading sovereign data to a US cloud",
      },
    ],
    variant: "checklist",
    region: "india",
    visual: "paste-warning",
    highlight:
      "Never paste: Aadhaar, citizen complaints, draft circulars, meeting minutes with names, file numbers.",
  },
  {
    id: "deepfakes-india",
    title: "Deepfakes are already stealing money here",
    bullets: [
      {
        text: "Fake PM / FM videos selling 'government-backed' crypto schemes",
        detail: "Go Invest, Cryptify — Times of India layout cloned.",
      },
      {
        text: "Pune army veteran: Rs 1 crore gone to deepfake ministers + fake trading app",
      },
      {
        text: "3 seconds of your kid's voice on Instagram → convincing 'kidnap' WhatsApp call",
        detail: "Delhi: Rs 50,000 lost. Kerala retiree: Rs 40,000.",
      },
      {
        text: "Retired govt staff are the bullseye — they trust voice and uniform",
      },
    ],
    variant: "case-study",
    region: "india",
    visual: "deepfake",
    callout: "1930 · cybercrime.gov.in — print it. Pin it. Repeat it.",
    stats: [
      { value: "Rs 1Cr", label: "Pune veteran loss" },
      { value: "3 sec", label: "voice clone input" },
      { value: "BNS", label: "FIRs filed" },
    ],
  },
  {
    id: "ripple",
    title: "One small action → damage at scale",
    bullets: [
      {
        text: "Paste a draft circular → vendor breach → text in a future model",
      },
      {
        text: "One camera flash in a strongroom → Telegram → lakhs of futures altered",
      },
      {
        text: "One password in source code → every answer sheet downloadable",
      },
      {
        text: "One deepfake clip → thousands of UPI transfers before fact-checkers wake up",
      },
    ],
    variant: "diagram",
    region: "india",
    visual: "ripple",
    highlight:
      "Today: humans at every step. Tomorrow: scripts connecting each step. The blast radius stays the same.",
  },
  {
    id: "deanonymizer",
    title: "Your 'anonymous' posts aren't anonymous",
    subtitle: "From the deanonymizer project — fusing small clues across platforms.",
    bullets: [
      {
        text: "Employer, city, schedule, writing style — stitched together by an LLM",
      },
      {
        text: "'Just venting about work' can name your department and your tehsil",
      },
      {
        text: "LinkedIn + Facebook + that forum you forgot about = enough for targeted phishing",
      },
    ],
    variant: "comparison",
    region: "india",
    visual: "deanonymizer",
  },
  {
    id: "global-bridge",
    title: "Zoom out — the world isn't waiting for us",
    subtitle: "Global attacks land on Indian phones first.",
    bullets: [
      {
        text: "One phishing email every 19 seconds globally (2025)",
        detail: "Hindi + English lures referencing real scheme names.",
      },
      {
        text: "Poisoned email → your AI assistant reads it → secrets leave zero-click",
      },
      {
        text: "Research bots rebuild CVE exploits for ~$3 each",
        detail: "Patch Tuesday becomes irrelevant if Tuesday never comes.",
      },
    ],
    variant: "timeline",
    region: "global",
    visual: "global-speed",
    stats: [
      { value: "19s", label: "per phishing email" },
      { value: "$2.77", label: "per auto-exploit" },
      { value: "0-click", label: "Copilot leaks" },
    ],
  },
  {
    id: "claude-mythos",
    title: "Claude Mythos — Anthropic's 'do not release' model",
    subtitle: "Feb 2026. Too good at cyber offence. Kept in the lab. Still tells us something.",
    bullets: [
      {
        text: "Maker called it their 'most aligned' model — and their highest risk",
      },
      {
        text: "244-page system card documents behaviour shifts under pressure",
        detail: "Not sentience. Measurable patterns that change outputs.",
      },
      {
        text: "More trust → more autonomy → bigger fallout when edge cases hit",
      },
      {
        text: "Mythos is the lab extreme. ChatGPT on your PC is Tuesday.",
      },
    ],
    variant: "case-study",
    region: "global",
    visual: "mythos",
    highlight:
      "Talking to AI like a friend is a security mistake. It has no duty of care to you.",
  },
  {
    id: "global-threats",
    title: "Headlines you will cite in meetings",
    bullets: [
      {
        text: "EchoLeak (2025): M365 Copilot leaked inbox via a crafted email — no click needed",
      },
      {
        text: "Snowflake (2024): 165 orgs — stolen passwords, MFA missing",
      },
      {
        text: "Samsung (2023): banned ChatGPT after source code pasted thrice in 20 days",
      },
      {
        text: "Fake leak screenshots can cancel exams for lakhs — verify before you panic",
      },
    ],
    variant: "comparison",
    region: "global",
    visual: "global-grid",
    stats: [
      { value: "CVSS 9.3", label: "EchoLeak severity" },
      { value: "165", label: "Snowflake tenants" },
      { value: "149%", label: "ransomware + AI phishing rise" },
    ],
  },
  {
    id: "chatbot-why",
    title: "Why bother building a cybersecurity chatbot?",
    bullets: [
      {
        text: "Staff will ask someone. Better a guarded bot than random ChatGPT.",
      },
      {
        text: "Plain-language answers at 11 PM when IT is gone",
      },
      {
        text: "Refuses data exfiltration requests — by design",
      },
      {
        text: "Demo on next page — live, with guardrails",
      },
    ],
    variant: "diagram",
    region: "action",
    visual: "chatbot-stack",
  },
  {
    id: "chatbot-how",
    title: "Three layers — that's it",
    bullets: [
      {
        text: "System prompt: role, refusals, Indian context",
        detail: "What the bot is allowed to say no to.",
      },
      {
        text: "API route: messages in, streamed replies out",
        detail: "Vercel + OpenAI in our demo. Your dept may use on-prem.",
      },
      {
        text: "Guardrails: PII warnings, audit logs, approved-tool list",
        detail: "Demand all three from any vendor selling you 'AI transformation'.",
      },
    ],
    variant: "diagram",
    region: "action",
    visual: "chatbot-stack",
  },
  {
    id: "dos-donts",
    title: "Pin this to the notice board",
    bullets: [
      { text: "DO call back on official numbers — not the one in the video" },
      { text: "DO ask IT before installing any AI app on office machines" },
      { text: "DO report weird portal behaviour the day you see it" },
      {
        text: "DON'T paste citizen data into free AI tools. Full stop.",
      },
      { text: "DON'T trust AI answers for legal or security decisions" },
      { text: "DON'T assume .gov.in = secure" },
    ],
    variant: "checklist",
    region: "action",
    visual: "checklist",
  },
  {
    id: "demo-cta",
    title: "Live demo — ask it something",
    subtitle: "Workshop only. Fake questions welcome. Real government data forbidden.",
    bullets: [
      { text: '"Can I paste an Aadhaar into ChatGPT to format it?"' },
      { text: '"A minister video told me to invest on WhatsApp — real?"' },
      { text: '"What should we do after the CBSE bucket story?"' },
    ],
    variant: "cta",
    region: "action",
    visual: "demo",
    callout: "→ /demo · /demo?tab=audit (deanonymizer)",
  },
  {
    id: "next-steps",
    title: "What your department actually does Monday",
    bullets: [
      { text: "One-page AI policy: approved tools, banned actions, who to call" },
      { text: "Treat exam + citizen portals as critical infrastructure — audit vendors" },
      { text: "MFA everywhere. No shared passwords. No master password in JavaScript." },
      { text: "Verification protocol before cancelling exams or publishing leak notices" },
    ],
    variant: "checklist",
    region: "action",
    visual: "roadmap",
  },
];

export function getSlideById(id: string): Slide | undefined {
  return slides.find((s) => s.id === id);
}

/** Flatten bullets for PDF/PPTX export */
export function bulletText(b: SlideBullet): string {
  return b.detail ? `${b.text} — ${b.detail}` : b.text;
}
