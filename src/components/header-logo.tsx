"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export function HeaderLogo() {
  const pathname = usePathname();

  function handleClick(e: MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight sm:text-xl"
    >
      <span className="logo-shake-avatar inline-block h-7 w-7 shrink-0 overflow-hidden rounded-full border border-accent">
        <Image
          src="/photos/alexander-main.jpg"
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex items-baseline">
        <span className="logo-shake-1 inline-block">S</span>
        <span className="logo-shake-2 inline-block">D</span>
        <span className="logo-shake-3 inline-block">K</span>
        <span className="logo-shake-2 relative inline-block text-accent">
          V
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-shake-arrow absolute -top-[0.28em] -right-[0.02em] h-[0.4em] w-[0.4em]"
          >
            <path d="M5 19 19 5M9 5h10v10" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
