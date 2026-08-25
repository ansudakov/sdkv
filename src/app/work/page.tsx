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
          <h1 className="balance font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Тексты, редакции
            <br />и результаты<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Кейсы целиком, с примерами конкретных работ по ссылкам — без
            переходов на другие странички. Хронологию по датам смотри в{" "}
            <a href="/projects" className="text-accent underline underline-offset-4">
              разделе «Проекты»
            </a>
            .
          </p>
        </Container>
      </section>

      <Container className="divide-y divide-border">
        {workCases.map((item) => {
          if (item.callout) {
            return (
              <div key={item.slug} id={item.slug} className="scroll-mt-24 py-10 sm:py-12">
                <div className="rounded-3xl border-2 border-accent/50 bg-surface p-6 sm:p-10">
                  <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
                    Отдельный проект
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <IconBadge icon={item.icon} size="lg" />
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
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
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <WorkLinks links={item.links} />
                </div>
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
              <div>
                <IconBadge icon={item.icon} size="lg" />
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {item.company}
                </h2>
                <p className="mt-2 text-muted">{item.tagline}</p>
                {item.period && (
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
                    {item.period}
                  </p>
                )}
                {item.audience && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                    {item.audience}
                  </p>
                )}
              </div>
              <div className="max-w-2xl">
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
                <WorkLinks links={item.links} />
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
}
