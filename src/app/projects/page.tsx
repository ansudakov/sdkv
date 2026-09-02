import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { IconBadge } from "@/components/icon-badge";
import { TimelineConnector } from "@/components/timeline-connector";
import { education, experience, experienceStats, skills } from "@/lib/site";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Хронология опыта: компании, роли и даты — как в резюме, по порядку.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Проекты
          </p>
          <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            {experienceStats.years} в редактуре<span className="text-accent">,</span>
            <br />
            по порядку<span className="text-accent">.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="max-w-xl text-lg text-muted">
              Крупные проекты и штатные роли за последние {experienceStats.years}.
              Здесь я не беру небольшие заказы и разовые подработки. Полные
              кейсы —{" "}
              <Link href="/works" className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover">
                на странице «Работы»
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="border-b border-border py-14 sm:py-16">
        <Container>
          <TimelineConnector>
            <div className="space-y-10 sm:space-y-12">
              {experience.map((item) => (
                <div
                  key={item.company}
                  className="relative flex flex-col gap-4 sm:flex-row sm:gap-8 sm:pl-0"
                >
                  <div
                    data-timeline-icon
                    className="relative z-10 flex shrink-0 items-center gap-4 sm:w-56"
                  >
                    <div className="relative h-11 w-11 shrink-0">
                      <div
                        aria-hidden
                        className="absolute inset-0 hidden rounded-full bg-background sm:block"
                      />
                      <div className="relative">
                        <IconBadge icon={item.icon} />
                      </div>
                    </div>
                    <div className="sm:hidden">
                      <p className="font-display text-lg font-semibold tracking-tight">
                        {item.company}
                      </p>
                      <p className="text-sm text-muted">{item.role}</p>
                    </div>
                    <p className="hidden font-mono text-xs uppercase tracking-widest text-muted sm:block">
                      {item.period}
                      <br />
                      {item.duration}
                    </p>
                  </div>
                  <div className="flex-1 border-t border-border pt-4 sm:border-t-0 sm:pt-0">
                    <div className="hidden sm:block">
                      <p className="font-display text-xl font-semibold tracking-tight">
                        {item.company}
                      </p>
                      <p className="text-sm text-muted">{item.role}</p>
                    </div>
                    <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted sm:hidden">
                      {item.period}
                      <br />
                      {item.duration}
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed">
                      {item.summary}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </TimelineConnector>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <p className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Навыки и инструменты
          </p>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Education */}
      <section className="py-16 sm:py-20">
        <Container>
          <p className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Образование и курсы
          </p>
          <div className="divide-y divide-border border-y border-border">
            {education.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <p className="font-medium">{item.title}</p>
                <div className="flex shrink-0 items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                  <span>{item.org}</span>
                  <span className="text-accent">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
