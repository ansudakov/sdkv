"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { AnchorHTMLAttributes } from "react";

export function TrackedLink({
  gaEvent,
  gaParams,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  gaEvent: string;
  gaParams?: Record<string, string>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        sendGAEvent("event", gaEvent, gaParams ?? {});
        onClick?.(e);
      }}
    />
  );
}
