/**
 * Comic panel artwork (JPG) under src/assets/module-comics/
 * Swap files in place to update art. Optional: add comic-*.svg sources and rebuild JPGs via the comic generation script in package.json.
 */
import comicPhishing1 from '../assets/module-comics/comic-phishing-1.jpg';
import comicPhishing2 from '../assets/module-comics/comic-phishing-2.jpg';
import comicPhishing3 from '../assets/module-comics/comic-phishing-3.jpg';

import comicPasswords1 from '../assets/module-comics/comic-passwords-1.jpg';
import comicPasswords2 from '../assets/module-comics/comic-passwords-2.jpg';
import comicPasswords3 from '../assets/module-comics/comic-passwords-3.jpg';

import comicMfa1 from '../assets/module-comics/comic-mfa-1.jpg';
import comicMfa2 from '../assets/module-comics/comic-mfa-2.jpg';
import comicMfa3 from '../assets/module-comics/comic-mfa-3.jpg';

import comicSocial1 from '../assets/module-comics/comic-social-1.jpg';
import comicSocial2 from '../assets/module-comics/comic-social-2.jpg';
import comicSocial3 from '../assets/module-comics/comic-social-3.jpg';

import comicSafeBrowsing1 from '../assets/module-comics/comic-safe-browsing-1.jpg';
import comicSafeBrowsing2 from '../assets/module-comics/comic-safe-browsing-2.jpg';
import comicSafeBrowsing3 from '../assets/module-comics/comic-safe-browsing-3.jpg';

import comicIncident1 from '../assets/module-comics/comic-incident-1.jpg';
import comicIncident2 from '../assets/module-comics/comic-incident-2.jpg';
import comicIncident3 from '../assets/module-comics/comic-incident-3.jpg';

export const COMIC_PANEL_IMAGES = {
  phishing: [comicPhishing1, comicPhishing2, comicPhishing3],
  passwords: [comicPasswords1, comicPasswords2, comicPasswords3],
  mfa: [comicMfa1, comicMfa2, comicMfa3],
  social: [comicSocial1, comicSocial2, comicSocial3],
  safeBrowsing: [comicSafeBrowsing1, comicSafeBrowsing2, comicSafeBrowsing3],
  incident: [comicIncident1, comicIncident2, comicIncident3],
};
