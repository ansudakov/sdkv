"use client";

import { useState } from "react";

export function Expandable({
  visible,
  rest,
}: {
  visible: React.ReactNode;
  rest: React.ReactNode[];
}) {
  const [open, setOpen] = useState(false);

  if (rest.length === 0) {
    return <div className="space-y-4 text-base leading-relaxed">{visible}</div>;
  }

  return (
    <div className="space-y-4 text-base leading-relaxed">
      {visible}
      {open && rest}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm font-medium text-accent"
      >
        {open ? "Свернуть" : "Показать полностью"}
        <span className={open ? "rotate-180 transition-transform" : "transition-transform"}>
          ↓
        </span>
      </button>
    </div>
  );
}
