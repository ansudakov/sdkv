"use client";

import { useRef, useState } from "react";
import type { WorkLink } from "@/lib/site";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function WorkLinks({ links }: { links: WorkLink[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (links.length === 0) return null;

  function handleScroll() {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    // У последней карточки scrollLeft не доходит до её шага — по краю считаем её активной.
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    const index = atEnd ? links.length - 1 : Math.round(track.scrollLeft / step);
    if (index !== active) setActive(index);
  }

  return (
    <div className="mt-8 min-w-0">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
        Примеры работ
      </p>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-6 flex min-w-0 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:snap-none sm:px-0 sm:[scrollbar-width:thin] sm:[&::-webkit-scrollbar]:block"
      >
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-56 w-[72vw] max-w-80 shrink-0 snap-start flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-accent hover:bg-background sm:min-h-0 sm:w-80 sm:p-6"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {hostnameOf(link.url)}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </div>
            <span className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
              {link.label}
            </span>
          </a>
        ))}
      </div>
      {links.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
          {links.map((link, i) => (
            <span
              key={link.url}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-4 bg-accent" : "w-1.5 bg-muted/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
