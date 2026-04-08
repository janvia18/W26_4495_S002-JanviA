# How to create `JanviA_FinalReport.pdf` (and Word / PowerPoint)

## Already generated in this repo

- **`JanviA_FinalReport_SUBMISSION.docx`** — **Latest full submission build** from `JanviA_FinalReport.md` (includes page-1 checklist, Features 1–4 labels, **full Appendix B** user guide with image paths, grading table). Use this for **Blackboard** after review.  
- **`JanviA_FinalReport.docx`** — Older export if present; prefer **`JanviA_FinalReport_SUBMISSION.docx`**.  
- **`JanviA_FinalReport_UPDATED.docx`** — Backup if a `.docx` file was locked during export.

Open in Microsoft Word to edit formatting, then **Save As → PDF** if you still need `JanviA_FinalReport.pdf`.
- **`Presentation_CyberAware.pptx`** — PowerPoint deck from `Presentation_CyberAware_pandoc.md` (Pandoc). The original **`Presentation_CyberAware.md`** is still the Marp source if you use the Marp VS Code extension for fancier themes.

To **regenerate** the Word file after editing the Markdown report:

```powershell
cd ReportsAndDocuments
& "$env:LOCALAPPDATA\Pandoc\pandoc.exe" JanviA_FinalReport.md -o JanviA_FinalReport.docx --from=markdown+raw_html
```

To **regenerate** the PowerPoint file after editing `Presentation_CyberAware_pandoc.md`:

```powershell
& "$env:LOCALAPPDATA\Pandoc\pandoc.exe" Presentation_CyberAware_pandoc.md -o Presentation_CyberAware.pptx -t pptx --slide-level=1
```

---

# How to create `JanviA_FinalReport.pdf`

The full final report is maintained as **`JanviA_FinalReport.md`** in this folder so it versions cleanly in Git. Convert it to PDF using **one** of the methods below (required file name: **`JanviA_FinalReport.pdf`**).

## Option A — Microsoft Word (common on Windows)

1. Open **Word** → **File** → **Open** → select `JanviA_FinalReport.md` (you may need to choose “All files” in the file type dropdown).
2. Review formatting (headings, tables, page breaks). Add the **title page** as its own section if Word merges it with the next page.
3. **File** → **Save As** → choose **PDF** → name the file **`JanviA_FinalReport.pdf`**.

## Option B — Pandoc (if you install it)

```text
pandoc JanviA_FinalReport.md -o JanviA_FinalReport.pdf --pdf-engine=pdflatex
```

(Install [Pandoc](https://pandoc.org/) and a LaTeX distribution if required.)

## Option C — VS Code / Cursor

Install an extension such as **Markdown PDF**, open `JanviA_FinalReport.md`, run **Markdown PDF: Export (pdf)** , then rename the output to **`JanviA_FinalReport.pdf`**.

## Option D — Print to PDF from browser

1. Paste the Markdown into a GitHub preview or use a Markdown preview tool that exports HTML.
2. Open in Chrome/Edge → **Print** → **Save as PDF**.

---

After export, place **`JanviA_FinalReport.pdf`** in this folder (`ReportsAndDocuments/`), commit to **`main`**, and upload the same PDF to Blackboard as required.
