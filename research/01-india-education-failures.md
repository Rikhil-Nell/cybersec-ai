# Failures in the Indian Education System: Recent High-Profile Incidents (2024–2026)

> Synthesis from public news sources as of mid-2026. Verify with official CBI/NTA/CBSE statements or court records before citing in formal government training.

India's examination system — managed largely by the National Testing Agency (NTA) for national-level exams and boards like CBSE — has faced repeated controversies involving paper leaks, technical glitches, security breaches, and mismanagement. These issues have eroded public trust, affected millions of students, led to protests, court interventions, and cancellations.

---

## 1. NEET-UG Paper Leak Scandals

### 2024 NEET-UG Controversy

- Allegations of question paper leaks surfaced on exam day (May 5, 2024).
- CBI investigated; leak traced to Oasis School in Hazaribagh (principal and centre superintendent involved).
- ~155 students (estimates: 144–155) directly benefited; networks in Patna and Hazaribagh.
- Issues: suspicious high scores (unusual number of 720/720 toppers), grace marks controversies, proxy cheating.
- **Supreme Court** acknowledged leak as an "undisputed fact" but ruled it was not widespread/systemic enough for full re-test. Results stood with adjustments (e.g., Physics question correction).
- Arrests included teachers and middlemen; some MBBS students faced action (suspensions in 2025).

### 2026 NEET-UG

- **First full cancellation in history** following fresh paper leak allegations and ongoing investigations.
- Repeated the 2024 pattern; nationwide outrage.
- Highlights persistent vulnerabilities: logistics, strongroom security, insider collusion.

### Broader Issues

- Coaching nexus, Telegram sales of papers, weak enforcement of Public Examinations (Prevention of Unfair Means) Act 2024.
- Radhakrishnan Committee recommendations (digital transmission, AI monitoring) only partially implemented.

**Why this matters for govt workers:** Exam infrastructure is national critical infrastructure — insider access is as dangerous as external hacking.

**How AI could automate this:** OCR + auto-distribution via Telegram bots within minutes of a phone-camera snap; LLM-generated fake "leaked paper" screenshots to trigger panic cancellations.

---

## 2. CUET (Common University Entrance Test)

### 2024–2025

- Technical failures, wrong question papers (e.g., Kanpur centre), registration portal crashes.
- Out-of-syllabus questions, connectivity issues at dozens of centres.
- Re-tests for hundreds to thousands of affected candidates.

### 2026

- Further disruptions, delays, leak rumours amid lingering NEET fallout.
- NTA criticised for poor planning.

**Pattern:** Repeated glitches, poor centre management, delayed responses — students question the shift to centralised testing.

**How AI could automate this:** Mass-generated plausible fake MCQ papers matched to syllabus; automated panic campaigns on exam eve.

---

## 3. CBSE Website/Portal Hacks and Public Buckets (2026)

### On-Screen Marking (OSM/OnMark) Portal

Ethical hackers (Nisarga Adhikary/Nisarg Adhikari, Tirth Parmar) exposed:

- **Hard-coded master passwords in frontend JavaScript**
- SQL injection risks
- Lack of IP gating
- Unsecured access to evaluator accounts

### Public AWS S3 Buckets

- Sensitive data exposed without authentication: 2026 answer sheets, question papers, scanned booklets.
- Multiple institutions reportedly shared the same insecure bucket.
- CBSE initially denied live system compromise (claiming test portals); later admitted gaps.
- Cybersecurity teams from government agencies and IITs deployed.

### Other Incidents

- Re-evaluation portal issues, DDoS-like attempts.
- Concerns over external AI (Google Gemini) use by vendors.

**Why this matters:** "Vibecoded" government tech — rushed digital transitions without security audits. Master passwords in frontend code is a basic failure any developer should catch.

**How AI could automate this:** AI-assisted vulnerability scanning maps admin panels faster than manual pentesting; crawlers continuously scan for open S3 buckets and classify leaked documents at scale.

---

## 4. Other Systemic Failures

- Dozens of leaks across SSC, UGC-NET, state exams in recent years — crores of students affected.
- NTA track record: JEE-Mains manipulations, cancellations.
- Mismanagement: grace marks anomalies, wrong papers, OMR errors, blurry scans, lakhs of re-evaluation applications.
- Underlying problems: weak cyber/physical security, insider collusion, over-reliance on high-stakes exams, delayed investigations, limited accountability.

---

## Narrative Bridge

```
TODAY (India):  Humans + insiders + Telegram + rushed portals
TOMORROW:       AI lowers the cost of each step
```
