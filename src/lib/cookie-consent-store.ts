export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "cookie-consent";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function getServerSnapshot(): ConsentValue | null {
  return null;
}

function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore — storage unavailable, choice just won't be remembered
  }
  listeners.forEach((notify) => notify());
}

export const cookieConsentStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  setConsent,
};
