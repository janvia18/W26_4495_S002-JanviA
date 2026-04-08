# Screenshots for CyberAware (presentation + final report)

## Quick steps

1. Run the app (`Implementation/frontend_app` → `npm run dev`).
2. Use **1280×720** browser window (or zoom) for consistent framing.
3. Capture each screen and **save here**, **replacing** the existing PNG (same filename).
4. **Re-export** your deck: open `ReportsAndDocuments/Presentation_CyberAware.md` in VS Code with **Marp for VS Code** → **Export Slide Deck** → PPTX/PDF.
5. In **Word**, for `JanviA_FinalReport.docx`, use **Insert → Pictures** if images did not flow from Markdown, or re-run Pandoc after replacing PNGs.

## Filenames

| File | Content |
|------|---------|
| `00-title-visual.png` | Optional hero / product collage for title slide |
| `01-signup.png` | Signup |
| `02-login.png` | Login |
| `03-dashboard.png` | Dashboard |
| `04-modules.png` | Mission board |
| `05-module-learn.png` | Module learn + comic |
| `06-module-scenario.png` | Scenario |
| `07-module-quiz.png` | Quiz or results |
| `08-module-threat.png` | Threat example |
| `09-achievements.png` | Achievements |
| `10-profile.png` | Profile |

## Regenerate labeled placeholders

From `Implementation/frontend_app`:

```bash
npm run generate:placeholders
```
