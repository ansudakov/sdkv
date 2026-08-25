import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site, workCases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Работы",
  description:
    "Кейсы редактуры и контент-лидерства: Альфа-Банк, Т-Банк, Timeweb Cloud, Hostman, Яндекс Доставка и другие.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Работы
          </p>
          <h1 className="balance font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Тексты, редакции
            <br />и результаты.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Полное портфолио со ссылками на конкретные работы —{" "}
            <a
              href={site.portfolioExternal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              ansudakov.craft.me/works ↗
            </a>
          </p>
        </Container>
      </section>

      <Container className="divide-y divide-border">
        {workCases.map((item) => (
          <article
            key={item.slug}
            id={item.slug}
            className="scroll-mt-24 grid grid-cols-1 gap-6 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_2fr]"
          >
            <div>
              <span className="text-3xl">{item.emoji}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {item.company}
              </h2>
              <p className="mt-2 text-muted">{item.tagline}</p>
              {item.audience && (
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                  {item.audience}
                </p>
              )}
            </div>
            <div className="max-w-2xl">
              <div className="space-y-4 text-base leading-relaxed text-foreground">
                {item.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-muted"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Container>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Это не всё. Полное портфолио — по ссылке.
          </p>
          <a
            href={site.portfolioExternal}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Смотреть портфолио ↗
          </a>
        </Container>
      </section>
    </>
  );
}
