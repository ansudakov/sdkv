"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { cookieConsentStore } from "@/lib/cookie-consent-store";
import { YandexMetrika } from "@/components/yandex-metrika";

const GA_ID = "G-NQR4XVNLJS";

export function AnalyticsScripts() {
  if (cookieConsentStore.getSnapshot() === "declined") return null;

  return (
    <>
      <GoogleAnalytics gaId={GA_ID} />
      <YandexMetrika />
    </>
  );
}
