import { WorkIcon } from "@/components/icons";
import type { IconKey } from "@/lib/site";

export function IconBadge({
  icon,
  size = "md",
}: {
  icon: IconKey;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent ${sizes[size]}`}
    >
      <WorkIcon icon={icon} className={iconSizes[size]} />
    </div>
  );
}
