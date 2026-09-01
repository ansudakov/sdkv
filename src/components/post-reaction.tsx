"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";

function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${down ? "-scale-y-100" : ""}`}
    >
      <path d="M7 11v9H4v-9h3Zm0 0 4.5-8a2 2 0 0 1 3.7 1.3L14.2 9H18a2 2 0 0 1 1.9 2.7l-2.3 6.5A2 2 0 0 1 15.7 20H10a3 3 0 0 1-3-3v-6Z" />
    </svg>
  );
}

export function PostReaction({ slug }: { slug: string }) {
  const [choice, setChoice] = useState<"like" | "dislike" | null>(null);

  function react(value: "like" | "dislike") {
    if (choice) return;
    setChoice(value);
    sendGAEvent("event", "blog_reaction", { label: value, slug });
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-border pt-8">
      <p className="text-sm text-muted">Как вам статья?</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => react("like")}
          disabled={choice !== null}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
            choice === "like"
              ? "border-accent text-accent"
              : "border-border text-muted hover:border-accent hover:text-accent"
          }`}
        >
          <ThumbIcon />
          Кайф
        </button>
        <button
          type="button"
          onClick={() => react("dislike")}
          disabled={choice !== null}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
            choice === "dislike"
              ? "border-accent text-accent"
              : "border-border text-muted hover:border-accent hover:text-accent"
          }`}
        >
          <ThumbIcon down />
          Не очень
        </button>
      </div>
      {choice && (
        <p className="text-sm text-muted">
          {choice === "like" ? "Спасибо!" : "Спасибо, учту."}
        </p>
      )}
    </div>
  );
}
