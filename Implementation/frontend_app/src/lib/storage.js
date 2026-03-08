export const LS_PROFILE = "profile";
export const LS_POINTS = "points";
export const LS_PROGRESS = "progress";

export function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function readProfile() {
  return safeJson(localStorage.getItem(LS_PROFILE), { name: "Learner", avatar: "horse" });
}

export function readPoints() {
  const raw = localStorage.getItem(LS_POINTS);
  const n = parseInt(raw || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

export function writePoints(n) {
  localStorage.setItem(LS_POINTS, String(n));
}

export function defaultProgress() {
  return {
    completed: {
      phishing: false,
      password: false,
      social: false,
      mfa: false,
      browsing: false,
      incident_response: false,
    },
  };
}

export function readProgress() {
  const existing = safeJson(localStorage.getItem(LS_PROGRESS), null);
  if (existing) return existing;

  const fresh = defaultProgress();
  localStorage.setItem(LS_PROGRESS, JSON.stringify(fresh));
  return fresh;
}

export function writeProgress(next) {
  localStorage.setItem(LS_PROGRESS, JSON.stringify(next));
}
