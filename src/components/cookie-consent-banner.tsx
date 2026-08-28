"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cookieConsentStore } from "@/lib/cookie-consent-store";

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    cookieConsentStore.subscribe,
    cookieConsentStore.getSnapshot,
    cookieConsentStore.getServerSnapshot,
  );

  if (consent !== null) return null;

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
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => cookieConsentStore.setConsent("declined")}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={() => cookieConsentStore.setConsent("accepted")}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Окей
          </button>
        </div>
      </div>
    </div>
  );
}
