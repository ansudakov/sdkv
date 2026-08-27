import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { TrackedLink } from "@/components/tracked-link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-accent">
            <Image
              src="/photos/alexander-main.jpg"
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex items-baseline">
            SDK
            <svg
              viewBox="-2 -20 115 135"
              fill="currentColor"
              className="ml-[0.02em] h-[1.05em] w-[0.9em] text-accent"
            >
              <path d="M44 110 L2 14 L24 14 L44 84 L57 40 L108 -15 L98 48 L75 40 Z" />
            </svg>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex sm:gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent sm:px-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <TrackedLink
            gaEvent="contact_email_click"
            href={`mailto:${site.email}`}
            className="ml-1 hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85 sm:inline-block"
          >
            Написать
          </TrackedLink>
          <TrackedLink
            gaEvent="contact_telegram_click"
            href={site.telegramContact}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в ТГ"
            className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
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
              <path d="M21 4 3 11.2l6 2.3M21 4 14.8 20l-5.8-6.5M21 4 9 13.5" />
            </svg>
          </TrackedLink>
          <div className="ml-1 sm:ml-2">
            <ThemeToggle />
          </div>
          <div className="ml-1">
            <MobileNav />
          </div>
        </nav>
      </Container>
    </header>
  );
}
