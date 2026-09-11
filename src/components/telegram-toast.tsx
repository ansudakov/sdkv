"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cookieConsentStore } from "@/lib/cookie-consent-store";
import { site } from "@/lib/site";

const STORAGE_KEY = "tg-toast-dismissed";
const SCROLL_THRESHOLD = 0.5;

export function TelegramToast() {
  const consent = useSyncExternalStore(
    cookieConsentStore.subscribe,
    cookieConsentStore.getSnapshot,
    cookieConsentStore.getServerSnapshot,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent === null) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore — storage unavailable, toast just won't remember dismissal
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0 || window.scrollY / max < SCROLL_THRESHOLD) return;
      setVisible(true);
      window.removeEventListener("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [consent]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-4 sm:w-80">
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-lg">
        <div className="flex-1">
          <p className="font-display text-sm font-semibold tracking-tight">
            Пишу не только о работе
          </p>
          <p className="mt-1 text-sm text-muted">
            Личный телеграм-канал: заметки, мысли и всё подряд.
          </p>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
          >
            Заглянуть в канал →
          </a>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Закрыть"
          className="shrink-0 text-muted transition-colors hover:text-accent"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
