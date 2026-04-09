/**
 * Builds labeled PNG placeholders under DocumentsAndReports/screenshots for docs/presentations.
 * Replace files with real screenshots; filenames are referenced by reporting assets.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../../../DocumentsAndReports/screenshots");
fs.mkdirSync(dir, { recursive: true });

function svg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
  <rect fill="#0f172a" width="1280" height="720"/>
  <rect x="40" y="40" width="1200" height="640" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="12 8" rx="12"/>
  <text x="640" y="330" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI,Arial,sans-serif" font-size="36" font-weight="700">${label}</text>
  <text x="640" y="395" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI,Arial,sans-serif" font-size="22">Replace with your real screenshot (same filename)</text>
</svg>`;
}

const files = [
  ["00-title-visual.png", "CyberAware — product shot"],
  ["01-signup.png", "Signup page"],
  ["02-login.png", "Login page"],
  ["03-dashboard.png", "Dashboard"],
  ["04-modules.png", "Mission board / modules"],
  ["05-module-learn.png", "Module: Learn + comic"],
  ["06-module-scenario.png", "Module: Scenario"],
  ["07-module-quiz.png", "Module: Quiz + results"],
  ["08-module-threat.png", "Module: Threat example"],
  ["09-achievements.png", "Achievements"],
  ["10-profile.png", "Profile setup"],
];

for (const [name, label] of files) {
  await sharp(Buffer.from(svg(label))).png().toFile(path.join(dir, name));
}
console.log("Wrote", files.length, "placeholders to", dir);
