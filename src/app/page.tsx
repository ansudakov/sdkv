import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { IconBadge } from "@/components/icon-badge";
import { LogoMarquee } from "@/components/logo-marquee";
import { PhotoCard } from "@/components/photo-card";
import { PostCoverImage } from "@/components/post-cover-image";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { TypewriterName } from "@/components/typewriter-name";
import { getAllPosts } from "@/lib/posts";
import { experience, experienceStats, site, workCases } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const selectedWork = workCases.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Container className="relative">
          <div className="absolute right-6 top-0 hidden sm:right-8 sm:block">
            <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-accent md:h-44 md:w-44 lg:h-52 lg:w-52">
              <Image
                src="/photos/alexander-main.jpg"
                alt="Александр Судаков"
                width={320}
                height={320}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {site.role}
          </p>
          <TypewriterName className="balance min-h-[1.85em] font-display text-[13vw] font-semibold leading-[0.92] tracking-tight sm:text-[8.5vw] lg:text-[7rem]" />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Редачил для Альфа-Банка, Т-Банка, VK, Skillbox, Газпромбанк
              Инвестиций, Yota, Райффайзен Банка, Яндекс Доставки, Альпины,
              Студии Лебедева и Ambassadori Island Batumi. Последние четыре
              года главредил в облаках Timeweb Cloud и Hostman.
            </p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                gaEvent="contact_email_click"
                href={`mailto:${site.email}`}
                className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Написать
              </TrackedLink>
              <TrackedLink
                gaEvent="contact_telegram_click"
                href={site.telegramContact}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Написать в ТГ
              </TrackedLink>
            </div>
          </div>
          <div className="mt-14">
            <LogoMarquee />
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            О себе
          </p>
          <div className="max-w-3xl">
            <div className="space-y-6 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              <Reveal>
                <p>
                  Пишу смело, редачу деликатно. Строю контент-стратегии и
                  настраиваю конвейеры с аутсорс-авторами и нейросетями.
                  Умею включать тумблер{" "}
                  <span className="text-accent">UX thinking</span>.
                </p>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="text-muted">
                  Мультиформатный, омниканальный редактор. Без брезгливости
                  берусь за любой формат: от лаконичных смс и баннеров до
                  сложных лонгридов, лендингов и книг.
                </p>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="text-muted">
                  Пишу на{" "}
                  <span className="text-foreground">русском (C2)</span> и{" "}
                  <span className="text-accent">английском (C1)</span>.
                  Работаю по ТК или ИП: есть шаблон договора, КЭП и ЭДО,
                  полный комплект.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8">
              <div>
                <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
                  {experienceStats.years}
                </p>
                <p className="text-sm text-muted">в редактуре</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
                  {experienceStats.companies}
                </p>
                <p className="text-sm text-muted">компаний и проектов</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
                  {experienceStats.skills}
                </p>
                <p className="text-sm text-muted">навыков и инструментов</p>
              </div>
              <Link
                href="/projects"
                className="ml-auto text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                Вся хронология →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              Избранные работы
            </p>
            <Link
              href="/works"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Все работы →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {selectedWork.map((item) => (
              <Link
                key={item.slug}
                href={`/works#${item.slug}`}
                className="group flex flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <IconBadge icon={item.icon} />
                  <span className="text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects teaser */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              Хронология
            </p>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Все проекты →
            </Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {experience.slice(0, 4).map((item) => (
              <div
                key={item.company}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <IconBadge icon={item.icon} size="sm" />
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {item.company}
                    </p>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted sm:text-right">
                  {item.period}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Photos teaser */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              В кадре
            </p>
            <Link
              href="/photos"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Вся галерея →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <PhotoCard
              src="/photos/portrait-main.jpg"
              index={1}
              label="Портрет"
              className="aspect-[3/4]"
            />
            <PhotoCard
              src="/photos/reel-city.jpg"
              index={2}
              label="Рилс, кадр"
              className="aspect-[3/4] sm:mt-8"
            />
            <PhotoCard
              src="/photos/backstage-park.jpg"
              index={3}
              label="Бэкстейдж"
              className="aspect-[3/4]"
            />
            <PhotoCard
              src="/photos/writing-indoor.jpg"
              index={4}
              label="За текстом"
              className="aspect-[3/4] sm:mt-8"
            />
          </div>
        </Container>
      </section>

      {/* Blog teaser */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
              Из блога
            </p>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Все статьи →
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-muted">Первые статьи скоро появятся здесь.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  {post.image && (
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface">
                      <PostCoverImage
                        src={post.image}
                        srcDark={post.imageDark}
                        alt={post.title}
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                    {post.date}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{post.description}</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
