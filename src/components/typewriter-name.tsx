"use client";

import { useEffect, useRef, useState } from "react";

const FULL_TEXT = "Александр\nСудаков";
const TYPE_SPEED = 85;
// ~30% faster on phones (not tablets) — matches Tailwind's `sm` breakpoint.
const MOBILE_TYPE_SPEED = Math.round(TYPE_SPEED * 0.7);

export function TypewriterName({ className }: { className?: string }) {
  const [count, setCount] = useState(0);
  const done = count >= FULL_TEXT.length;
  const speedRef = useRef(TYPE_SPEED);

  useEffect(() => {
    speedRef.current = window.matchMedia("(max-width: 639px)").matches
      ? MOBILE_TYPE_SPEED
      : TYPE_SPEED;
  }, []);

  useEffect(() => {
    if (done) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timer = setTimeout(
      () => setCount(reduceMotion ? FULL_TEXT.length : (c) => c + 1),
      reduceMotion ? 0 : speedRef.current,
    );
    return () => clearTimeout(timer);
  }, [count, done]);

  const newlineIndex = FULL_TEXT.indexOf("\n");
  const typingFirstLine = count <= newlineIndex;
  const line1 = typingFirstLine ? FULL_TEXT.slice(0, count) : FULL_TEXT.slice(0, newlineIndex);
  const line2 = typingFirstLine ? "" : FULL_TEXT.slice(newlineIndex + 1, count);

  const cursor = (
    <span className="animate-blink text-accent" aria-hidden="true">
      {done ? "." : "|"}
    </span>
  );

  return (
    <h1 aria-label="Александр Судаков." className={className}>
      <span aria-hidden="true">
        {line1}
        {typingFirstLine && cursor}
        <br />
        {line2}
        {!typingFirstLine && cursor}
      </span>
    </h1>
  );
}
