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
  const line1Full = FULL_TEXT.slice(0, newlineIndex);
  const line2Full = FULL_TEXT.slice(newlineIndex + 1);
  const typingFirstLine = count <= newlineIndex;
  const typed1 = Math.min(count, newlineIndex);
  const typed2 = Math.max(0, count - newlineIndex - 1);

  // Весь текст резервирует место сразу (ненабранное невидимо), а курсор имеет
  // нулевую ширину и пересоздаётся на каждом шаге (key) — иначе он "ездит" по
  // строке и браузер считает это сдвигом макета (CLS).
  const cursor = (
    <span key={count} className="relative inline-block h-0 w-0 align-baseline">
      <span className="animate-blink absolute bottom-0 left-0 h-[1em] leading-none text-accent">|</span>
    </span>
  );

  return (
    <h1 aria-label="Александр Судаков." className={className}>
      <span aria-hidden="true" className="whitespace-nowrap">
        {line1Full.slice(0, typed1)}
        {typingFirstLine && cursor}
        <span className="invisible">{line1Full.slice(typed1)}</span>
        <br />
        {line2Full.slice(0, typed2)}
        {!typingFirstLine && !done && cursor}
        <span className="invisible">{line2Full.slice(typed2)}</span>
        <span className={done ? "animate-blink text-accent" : "invisible"}>.</span>
      </span>
    </h1>
  );
}
