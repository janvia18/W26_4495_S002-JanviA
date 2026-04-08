# Final submission checklist — COMP 4495 (CyberAware)

**Team lead:** Janvi Arora (300383801)  
**Course / section:** 4495 — S002 · **Term:** W26  
**Required PDF filename:** `JanviA_FinalReport.pdf` *(FirstName + last initial of team lead.)*

---

## Academic integrity

Your project will be treated as **plagiarism** if it is substantially similar to work from other students (same or other terms/sections) or to uncredited internet or other sources. A plagiarism finding may result in a **zero** and referral to the **Dean’s office**.

---

## Checklist (mark each before submission)

| Done | Requirement |
|------|-------------|
| ☐ | **GitHub `main`:** Fully functional, demo-ready code checked in. |
| ☐ | **Presentation slides** in `ReportsAndDocuments/` on `main` — novelty, utility, framework, tech stack, challenges, lessons learned. |
| ☐ | **Defense & demo** prepared (≈12–20 min; **≤5 min** on slides; live demo; Q&A). |
| ☐ | **Installation instructions** in **README** (and Appendix A of final report). |
| ☐ | **User guide** in **`DocumentsAndReports/`** on `main` **and** Appendix B of the final report (with screenshots). |
| ☐ | **Blackboard:** Final report submitted by **team lead**. |
| ☐ | **GitHub:** Final report (`JanviA_FinalReport.pdf` / `.docx`) on `main`. |
| ☐ | **Mandatory in-class check-ins** (before/after submission) per instructor. |

---

## Files to use

| Artifact | Location |
|----------|----------|
| Final report (edit source) | `JanviA_FinalReport.md` |
| Word | `JanviA_FinalReport_SUBMISSION.docx` → Save As **`JanviA_FinalReport.pdf`** |
| Slides (PPTX) | `Presentation_CyberAware.pptx` *(re-export from `Presentation_CyberAware.md` using Marp if you change slides)* |
| Screenshots | `DocumentsAndReports/screenshots/*.png` — **overwrite** placeholders with real captures |

---

## Regenerate Office files (optional)

From `ReportsAndDocuments` (Pandoc must be installed):

```powershell
& "$env:LOCALAPPDATA\Pandoc\pandoc.exe" JanviA_FinalReport.md -o JanviA_FinalReport_SUBMISSION.docx --from=markdown+raw_html --resource-path=".;..;../DocumentsAndReports"
```

Marp → PPTX (if `npx` works on your machine):

```powershell
$env:PUPPETEER_TIMEOUT='180000'
npx @marp-team/marp-cli@4.1.2 --no-stdin --allow-local-files Presentation_CyberAware.md -o Presentation_CyberAware.pptx
```
