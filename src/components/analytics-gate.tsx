"use client";

import dynamic from "next/dynamic";

const AnalyticsScripts = dynamic(
  () => import("@/components/analytics-scripts").then((m) => m.AnalyticsScripts),
  { ssr: false },
);

export function AnalyticsGate() {
  return <AnalyticsScripts />;
}
