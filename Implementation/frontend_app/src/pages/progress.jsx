const KEY = "cyberaware_progress_v1";

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function getModuleProgress(moduleId) {
  const all = getProgress();
  return all[moduleId] || { status: "not_started", score: null };
}

export function setModuleProgress(moduleId, patch) {
  const all = getProgress();
  const current = all[moduleId] || { status: "not_started", score: null };
  const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
  const updated = { ...all, [moduleId]: next };
  localStorage.setItem(KEY, JSON.stringify(updated));
  return next;
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}