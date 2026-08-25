export function PhotoSlot({
  label,
  index,
  className = "",
}: {
  label: string;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border bg-surface p-4 transition-colors hover:border-accent ${className}`}
    >
      <div className="flex items-start justify-between text-xs text-muted">
        <span>{String(index).padStart(2, "0")}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="opacity-40 transition-opacity group-hover:opacity-100 group-hover:text-accent"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.7" />
          <path d="m21 15-5-4-9 7" />
        </svg>
      </div>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
