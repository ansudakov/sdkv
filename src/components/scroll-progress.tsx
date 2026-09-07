"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scroller = document.scrollingElement ?? document.documentElement;
      const scrollTop = scroller.scrollTop;
      const docHeight = scroller.scrollHeight - scroller.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
