/**
 * One-time / maintenance: rasterize comic SVGs to JPG for production assets.
 * Run: node scripts/generate-comic-jpgs.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../src/assets/module-comics');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));

if (!files.length) {
  console.log('No comic-*.svg sources in src/assets/module-comics — nothing to do. Edit JPGs directly, or add SVGs to regenerate.');
  process.exit(0);
}

for (const f of files) {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace(/\.svg$/i, '.jpg'));
  await sharp(input)
    .resize(800, 480, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(output);
  console.log('Wrote', path.relative(process.cwd(), output));
}
