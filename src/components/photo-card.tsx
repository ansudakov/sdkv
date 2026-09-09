import Image from "next/image";

export function PhotoCard({
  src,
  label,
  index,
  className = "",
}: {
  src: string;
  label: string;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${className}`}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-xs">{String(index).padStart(2, "0")}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
