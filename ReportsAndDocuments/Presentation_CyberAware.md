---
marp: true
theme: default
paginate: true
header: 'CyberAware — COMP 4495 S002'
footer: 'Janvi Arora · 300383801 · W26'
size: 16:9
style: |
  section {
    background: linear-gradient(165deg, #070b14 0%, #0f172a 25%, #132447 50%, #0c4a6e 78%, #082f49 100%);
    color: #e2e8f0;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    background-attachment: fixed;
  }
  section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 120% 80% at 20% 20%, rgba(56,189,248,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 100% 60% at 80% 90%, rgba(14,165,233,0.08) 0%, transparent 45%);
    pointer-events: none;
  }
  h1 { color: #7dd3fc; font-weight: 800; letter-spacing: -0.02em; text-shadow: 0 1px 2px rgba(0,0,0,0.35); }
  h2 { color: #bae6fd; font-weight: 600; }
  a { color: #93c5fd; }
  strong { color: #fef08a; }
  table { font-size: 0.82em; background: rgba(15,23,42,0.65); border-radius: 10px; }
  th { background: rgba(56,189,248,0.28); color: #e0f2fe; }
  td { border-color: rgba(148,163,184,0.35); }
  code { background: rgba(15,23,42,0.85); color: #a5f3fc; padding: 0.12em 0.35em; border-radius: 4px; }
  footer { color: #94a3b8; opacity: 0.95; }
  header { color: #cbd5e1; opacity: 0.95; }
---

<!-- 
  EXPORT: Install "Marp for VS Code" → open this file → Export Slide Deck → PowerPoint (.pptx) or PDF.
  SCREENSHOTS: PNGs live in DocumentsAndReports/screenshots/ — placeholders are generated; overwrite files
  with real captures (same names) before your defense. Re-export the deck.
-->

![bg opacity:0.35 blur:2px](../DocumentsAndReports/screenshots/00-title-visual.png)

# **CyberAware**
## Web-Based Cybersecurity Awareness & Training Platform

**Team lead:** Janvi Arora · **ID:** 300383801  
**Course:** COMP 4495 — Section S002 · **Term:** W26

---

# Course submission checklist

**GitHub `main` · Slides in `ReportsAndDocuments/` · README install · `DocumentsAndReports` user guide · Blackboard (team lead) · In-class check-ins**

☐ Code demo-ready ☐ Slides checked in ☐ Install + user docs ☐ Final report PDF/DOCX ☐ Defense ready (12–20 min; **≤5 min** slides)

---

# Agenda

1. Problem & why it matters  
2. What we built (demo overview)  
3. Tech stack & architecture  
4. Features with **screenshots**  
5. Challenges, evaluation & demo plan  
6. Q&A  

---

# Problem & context

- People are the **#1 target**: phishing, weak passwords, social engineering, unsafe browsing.  
- Long policy PDFs → **low engagement**; users need **practice + feedback**.  
- **Goal:** One **account-based** path: **learn → scenario → quiz → real threat story**, with **XP** and **saved progress**.

**Screenshot — landing (optional)**

![w:780](../DocumentsAndReports/screenshots/03-dashboard.png)

---

# Solution snapshot

| Pillar | What CyberAware does |
|--------|----------------------|
| **Learn** | Comics + key points for **6 modules** |
| **Apply** | **Interactive scenarios** (e.g. phishing email) |
| **Assess** | Quizzes with **explanations**; pass to earn **XP** |
| **Relate** | **Part 4** real-world **threat example** each module |
| **Persist** | **Supabase** — auth + Postgres + **RLS** |

---

# What we built (product)

- **React + Vite** SPA · **React Router** · **Supabase** (Auth, Postgres, **RLS**)  
- **Modules:** Phishing · Passwords · MFA · Social engineering · Safe browsing · Incident reporting  
- **UX:** Dashboard, **mission board** with **flippable cards**, **locked blur**, achievement toasts  
- **Data:** `profiles`, **`user_progress`** (JSON + points), **`user_badges`**

---

# Screenshot — Sign up

**Replace placeholder** with your real signup screen (same filename).

![w:900](../DocumentsAndReports/screenshots/01-signup.png)

---

# Screenshot — Sign in

![w:900](../DocumentsAndReports/screenshots/02-login.png)

---

# Screenshot — Dashboard

XP, level, quick links to missions and achievements.

![w:920](../DocumentsAndReports/screenshots/03-dashboard.png)

---

# Screenshot — Mission board

Flippable cards · sequential unlock · blurred backs when locked.

![w:920](../DocumentsAndReports/screenshots/04-modules.png)

---

# Screenshot — Module (Learn)

Key points + **comic strip** per module.

![w:920](../DocumentsAndReports/screenshots/05-module-learn.png)

---

# Screenshot — Module (Scenario)

Email / message style prompt + **choices** + feedback.

![w:920](../DocumentsAndReports/screenshots/06-module-scenario.png)

---

# Screenshot — Module (Quiz)

Submit → score → **correct/incorrect explanations**; pass unlocks XP.

![w:920](../DocumentsAndReports/screenshots/07-module-quiz.png)

---

# Screenshot — Threat example (Part 4)

Ties lesson to **real-world** risk (e.g. calendar / look-alike links).

![w:920](../DocumentsAndReports/screenshots/08-module-threat.png)

---

# Screenshot — Achievements

Badges for milestones (first module, halfway, champion, expert XP).

![w:920](../DocumentsAndReports/screenshots/09-achievements.png)

---

# Screenshot — Profile

Display name, org/role, **avatar** emoji.

![w:900](../DocumentsAndReports/screenshots/10-profile.png)

---

# Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 18, React Router 6 |
| Build | Vite 5, npm |
| Backend | Supabase Auth + Postgres |
| Security | **RLS**, anon key only in browser |
| State | `ProgressContext`, `BadgeContext` |

---

# Architecture (conceptual)

```text
Browser (React SPA)
    → Supabase Auth (email/password, PKCE, localStorage)
    → Postgres
        • profiles
        • user_progress  (1 row/user: progress JSON + points)
        • user_badges    (string badge ids)
    → RLS: auth.uid() = row owner
```

---

# Novelty (course scope)

- Not “slides only” — **structured path**, **persistence**, **secure data model**  
- **UX + security together:** mission metaphor, celebrations, **config guards** (no blank screen if `.env` missing)  
- **Phishing depth:** look-alike domains + **calendar / cancel-subscription** scam narrative  

---

# Challenges & fixes

| Challenge | Response |
|-----------|----------|
| Schema vs UI (aggregated JSON vs sample per-module services) | **Canonical `schema.sql`**; unused services **documented** |
| Supabase **406** / empty rows | **`limit(1)`**, **`maybeSingle`**, **`onConflict`** upserts |
| Env vars / blank app | **`isSupabaseConfigured()`** + clear **login/signup** errors |
| Marp PPTX timeout (Puppeteer) | Use **Marp VS Code export** or Pandoc companion `.md` |

---

# Evaluation

- **`npm run build`** — clean production build  
- **Manual matrix** — signup, login, pass/fail quiz, refresh, badges, missing `.env` message  
- **Heuristics** — visibility of status, error recovery, consistent layout  

---

# Live demo script (~10–12 min)

1. **Landing** → sign up / log in  
2. **Dashboard** → open **Missions**  
3. **Phishing** (or any unlocked) → scenario → **pass quiz** → XP / toast  
4. **Achievements** + **Profile**  
5. **Optional:** Supabase dashboard — tables + RLS (**no keys on screen**)  

---

# Repository & documents

- **Code:** `Implementation/frontend_app/` on **`main`**  
- **DB:** `supabase/schema.sql`, `SUPABASE_SETUP.md`  
- **User guide:** `DocumentsAndReports/USER_GUIDE.md`  
- **Final report:** `ReportsAndDocuments/JanviA_FinalReport.md` (+ `.docx`)  

---

# Thank you

### Questions?

**CyberAware** — leveling up security awareness through practice.
