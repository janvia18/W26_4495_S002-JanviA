# CyberAware — COMP 4495 S002 (W26)

**Team / team lead:** Janvi Arora  
**Student ID:** 300383801  

Web-based **cybersecurity awareness** platform: structured modules (learn → scenario → quiz → real-world threat example), **XP**, **levels**, **achievements**, and **Supabase**-backed accounts with **Row-Level Security**.

---

## Repository layout

| Path | Purpose |
|------|---------|
| `Implementation/frontend_app/` | **Runnable app** (React + Vite + Supabase) |
| `Implementation/frontend_app/supabase/` | **`schema.sql`**, **`SUPABASE_SETUP.md`** |
| `ReportsAndDocuments/` | Final report (**`.md`**, **`JanviA_FinalReport.docx`**, PDF export), **checklist**, **`Presentation_CyberAware.pptx`**, Marp source `.md` |
| `DocumentsAndReports/` | **User guide** + `screenshots/` placeholders |

---

## Quick start — demo from this repository

### 1. Prerequisites

- **Node.js** LTS and **npm**
- A **Supabase** project (free tier is fine)

### 2. Install and configure

```bash
cd Implementation/frontend_app
npm install
```

Copy **`.env.example`** to **`.env`** and set:

- `VITE_SUPABASE_URL` — from Supabase **Project Settings → API**
- `VITE_SUPABASE_ANON_KEY` — anon JWT (`eyJ...`) or **publishable** key (`sb_publishable_...`)

**Never commit `.env`.**

### 3. Database setup

In Supabase → **SQL Editor**, run:

`Implementation/frontend_app/supabase/schema.sql`

Then add your local URL under **Authentication → URL configuration** (e.g. `http://localhost:5173/**`).

Details: `Implementation/frontend_app/supabase/SUPABASE_SETUP.md`.

### 4. Run

```bash
npm run dev
```

Open **http://localhost:5173** (default Vite port).

### 5. Production build (smoke test)

```bash
npm run build
npm run preview
```

---

## User guide

End-user instructions (add your screenshots before submission):

- **`DocumentsAndReports/USER_GUIDE.md`**

---

## Final submission artifacts

- **Checklist:** `ReportsAndDocuments/FINAL_SUBMISSION_CHECKLIST.md`  
- **Final report (source):** `ReportsAndDocuments/JanviA_FinalReport.md`  
- **Word (submission build):** `ReportsAndDocuments/JanviA_FinalReport_SUBMISSION.docx` — open in Word; **Save As → `JanviA_FinalReport.pdf`** for Blackboard if required  
- **Export to PDF:** follow `ReportsAndDocuments/HOW_TO_CREATE_JanviA_FinalReport_PDF.md` → save as **`JanviA_FinalReport.pdf`**  
- **Slides (PowerPoint):** Export from Marp: open `ReportsAndDocuments/Presentation_CyberAware.md` in VS Code → [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) → **Export Slide Deck → PPTX** (includes backgrounds + images). A simpler **Pandoc** version is also regenerated as `Presentation_CyberAware.pptx` from `Presentation_CyberAware_pandoc.md`.  
- **Screenshot placeholders:** `DocumentsAndReports/screenshots/*.png` — run `npm run generate:placeholders` in `Implementation/frontend_app` to reset; **overwrite with real screenshots** before defense.

---

## Implemented features (summary)

- Email/password auth (Supabase), protected routes, session handling  
- Six modules: Phishing, Passwords, MFA, Social Engineering, Safe Browsing, Incident Reporting  
- Comics, scenarios, quizzes with explanations, **Part 4 threat examples**  
- Mission board with **flippable cards**, sequential unlocks, locked-state blur  
- XP, levels, achievements persisted in Postgres (**`user_progress`**, **`user_badges`**)  
- Profile editing; configuration guards when Supabase env is missing  

---

## Tech stack

React 18 · React Router 6 · Vite 5 · Supabase (Auth + Postgres + RLS)

---

## Academic integrity

This repository is submitted for **COMP 4495**. It must not be copied as one’s own work by others. Course plagiarism rules apply.

---

## Future improvements

- Optional user study with surveys and longitudinal metrics  
- Admin analytics dashboard  
- Additional modules and localization  
- Automated tests (unit / e2e)
