"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { AnchorHTMLAttributes } from "react";

export function TrackedLink({
  gaEvent,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { gaEvent: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        sendGAEvent("event", gaEvent, {});
        onClick?.(e);
      }}
    />
  );
}
