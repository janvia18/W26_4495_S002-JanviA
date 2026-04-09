/**
 * Pre-dev hook: if node_modules/vite is missing, run `npm install` in frontend_app.
 * Keeps first-time clones from failing before the user runs install manually.
 */
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteMarker = path.join(root, 'node_modules', 'vite', 'package.json');

if (!existsSync(viteMarker)) {
  console.log('Dependencies missing — running npm install...');
  execSync('npm install', { cwd: root, stdio: 'inherit', shell: true });
}
