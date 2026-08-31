"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function TimelineConnector({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ top: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const icons = container!.querySelectorAll<HTMLElement>("[data-timeline-icon]");
      if (icons.length < 2) {
        setLine(null);
        return;
      }
      const first = icons[0];
      const last = icons[icons.length - 1];
      const containerTop = container!.getBoundingClientRect().top;
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const top = firstRect.top + firstRect.height / 2 - containerTop;
      const bottom = lastRect.top + lastRect.height / 2 - containerTop;
      setLine({ top, height: bottom - top });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {line && (
        <div
          aria-hidden
          className="absolute left-[21px] hidden w-px bg-border sm:block"
          style={{ top: line.top, height: line.height }}
        />
      )}
      {children}
    </div>
  );
}
