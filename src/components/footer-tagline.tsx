"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "ёмкое",
  "сильное",
  "честное",
  "дерзкое",
  "точное",
  "живое",
  "креативное",
  "смелое",
  "лаконичное",
  "мощное",
];
const TYPE_DELAY = 70;
const ERASE_DELAY = 40;
const HOLD_DELAY = 2600;

function pickNext(prev: string) {
  const options = WORDS.filter((word) => word !== prev);
  return options[Math.floor(Math.random() * options.length)];
}

function renderWord(word: string) {
  return word.split("").map((char, i) =>
    char === "ё" ? (
      <span key={i} className="relative inline-block leading-none">
        е
        <span className="absolute top-[0.02em] left-[14%] h-[0.22em] w-[0.22em] rounded-full bg-accent" />
        <span className="absolute top-[0.02em] left-[54%] h-[0.22em] w-[0.22em] rounded-full bg-accent" />
      </span>
    ) : (
      char
    ),
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function FooterTagline() {
  const ref = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("ёмкое.");
  const [started, setStarted] = useState(false);
  const [maxWidth, setMaxWidth] = useState<number | null>(null);

  useEffect(() => {
    function measure() {
      const el = measureRef.current;
      if (!el) return;
      let widest = 0;
      for (const w of WORDS) {
        el.textContent = `${w}.`;
        widest = Math.max(widest, el.offsetWidth);
      }
      setMaxWidth(widest);
    }
    measure();
    const mql = window.matchMedia("(min-width: 640px)");
    mql.addEventListener("change", measure);
    return () => mql.removeEventListener("change", measure);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    async function run() {
      let word = "ёмкое";
      await sleep(HOLD_DELAY);
      while (!cancelled) {
        const full = `${word}.`;
        for (let i = full.length; i >= 0; i--) {
          if (cancelled) return;
          setDisplay(full.slice(0, i));
          await sleep(ERASE_DELAY);
        }
        word = pickNext(word);
        for (let i = 1; i <= word.length; i++) {
          if (cancelled) return;
          setDisplay(word.slice(0, i));
          await sleep(TYPE_DELAY);
        }
        setDisplay(`${word}.`);
        await sleep(HOLD_DELAY);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [started]);

  const hasPeriod = display.endsWith(".");
  const word = hasPeriod ? display.slice(0, -1) : display;

  return (
    <span ref={ref} className="relative inline-flex items-center gap-x-0.5 align-middle leading-none">
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute whitespace-nowrap"
      />
      <span
        style={maxWidth ? { width: maxWidth } : undefined}
        className="inline-block whitespace-nowrap"
      >
        {word.length === 0 && !hasPeriod ? " " : renderWord(word)}
        {hasPeriod && <span className="animate-blink text-accent">.</span>}
      </span>
    </span>
  );
}
