import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          SDK<span className="text-accent">V</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent sm:px-4"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="ml-1 hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85 sm:inline-block"
          >
            Написать
          </a>
          <a
            href={site.telegramContact}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
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
          </a>
          <div className="ml-1 sm:ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
