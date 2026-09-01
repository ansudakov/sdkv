"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PostKeyboardNav({
  olderHref,
  newerHref,
}: {
  olderHref?: string;
  newerHref?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (e.key === "ArrowLeft" && olderHref) {
        router.push(olderHref);
      } else if (e.key === "ArrowRight" && newerHref) {
        router.push(newerHref);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, olderHref, newerHref]);

  return null;
}
