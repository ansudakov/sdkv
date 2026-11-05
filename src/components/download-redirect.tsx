"use client";

import { useEffect } from "react";

const COUNTER_ID = 111970451;
const GOAL_ID = "chapter_8_pdf_open";
const PDF_URL = "/chapter_8.pdf";

type YandexMetrika = (
  counterId: number,
  method: "reachGoal",
  goalId: string,
  params: Record<string, string>,
  callback: () => void,
) => void;

export function DownloadRedirect() {
  useEffect(() => {
    let finished = false;

    const openPdf = () => {
      if (finished) return;
      finished = true;
      window.location.replace(PDF_URL);
    };

    const sendGoal = () => {
      const ym = (window as typeof window & { ym?: YandexMetrika }).ym;
      if (!ym) return false;

      ym(
        COUNTER_ID,
        "reachGoal",
        GOAL_ID,
        { document: "chapter_8.pdf", source: "download_redirect" },
        openPdf,
      );
      return true;
    };

    const fallback = window.setTimeout(openPdf, 3000);
    let poll: number | undefined;

    if (!sendGoal()) {
      poll = window.setInterval(() => {
        if (sendGoal() && poll !== undefined) window.clearInterval(poll);
      }, 100);
    }

    return () => {
      if (poll !== undefined) window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Chapter 8
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Открываю PDF…
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Если файл не открылся автоматически, {" "}
        <a className="text-accent underline" href={PDF_URL}>
          нажмите сюда
        </a>
        .
      </p>
    </div>
  );
}
