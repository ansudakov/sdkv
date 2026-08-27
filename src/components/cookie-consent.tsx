"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent-ack";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === null;
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

function acknowledge() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore — storage unavailable, banner just won't be remembered
  }
  listeners.forEach((notify) => notify());
}

export function CookieConsent() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-4 text-sm sm:flex-row sm:justify-between sm:px-8">
        <p className="text-muted">
          Сайт использует cookie для анализа посещаемости.{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-4">
            Политика конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85"
        >
          Окей
        </button>
      </div>
    </div>
  );
}
