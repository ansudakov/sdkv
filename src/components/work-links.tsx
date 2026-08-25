import type { WorkLink } from "@/lib/site";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function WorkLinks({ links }: { links: WorkLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8 min-w-0">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
        Примеры работ
      </p>
      <div className="flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-56 shrink-0 flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {hostnameOf(link.url)}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted transition-colors group-hover:text-accent"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </div>
            <span className="text-sm font-medium leading-snug text-foreground">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
