import phishing from "../assets/modules/phishing.svg";
import passwords from "../assets/modules/passwords.svg";
import mfa from "../assets/modules/mfa.svg";
import social from "../assets/modules/social.svg";
import safeBrowsing from "../assets/modules/safe-browsing.svg";
import incident from "../assets/modules/incident.svg";

export const MODULE_COVER_IMAGES = {
  phishing,
  passwords,
  mfa,
  social,
  safeBrowsing,
  incident,
};

export function getModuleCoverSrc(key) {
  return MODULE_COVER_IMAGES[key] ?? null;
}
