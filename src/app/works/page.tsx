import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Expandable } from "@/components/expandable";
import { IconBadge } from "@/components/icon-badge";
import { WorkLinks } from "@/components/work-links";
import { workCases } from "@/lib/site";

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
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Работы
          </p>
          <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Тексты<span className="text-accent">,</span> редакции
            <br />и результаты<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Кейсы целиком, с примерами конкретных работ по ссылкам: где-то
            это Гугл-документ, где-то сам сайт, а где-то Фигма. Хронология по
            датам —{" "}
            <a href="/projects" className="text-accent underline underline-offset-4">
              на странице «Проекты»
            </a>
            .
          </p>
        </Container>
      </section>

      <Container className="divide-y divide-border">
        {workCases.map((item) => {
          if (item.callout) {
            const link = item.links[0];
            return (
              <div key={item.slug} id={item.slug} className="scroll-mt-24 py-10 sm:py-12">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-3xl border-2 border-accent/50 bg-card p-6 shadow-sm transition-colors hover:bg-background sm:p-10"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-6 top-6 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent sm:right-10 sm:top-10"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                  <div className="flex flex-wrap items-center gap-4 pr-8">
                    <IconBadge icon={item.icon} size="lg" />
                    <div>
                      <h2 className="break-words font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.company}
                      </h2>
                      <p className="mt-1 text-muted">{item.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed">
                    {item.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </a>
              </div>
            );
          }

          const [first, ...rest] = item.body;
          return (
            <article
              key={item.slug}
              id={item.slug}
              className="scroll-mt-24 grid grid-cols-1 gap-6 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_2fr]"
            >
              <div className="min-w-0">
                <IconBadge icon={item.icon} size="lg" />
                <h2 className="mt-4 break-words font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {item.company}
                </h2>
                <p className="mt-2 text-muted">{item.tagline}</p>
                {item.period && (
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
                    {item.period.split(" · ").map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                )}
                {item.audience && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                    {item.audience}
                  </p>
                )}
              </div>
              <div className="min-w-0 max-w-2xl">
                <Expandable
                  visible={<p>{first}</p>}
                  rest={rest.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                />
                <ul className="mt-8 flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 lg:col-span-2">
                <WorkLinks links={item.links} />
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
}
