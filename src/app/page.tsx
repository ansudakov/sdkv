import Link from "next/link";
import { Container } from "@/components/container";
import { PhotoSlot } from "@/components/photo-slot";
import { getAllPosts } from "@/lib/posts";
import { site, workCases } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const selectedWork = workCases.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {site.role}
          </p>
          <h1 className="balance font-display text-[13vw] font-semibold leading-[0.92] tracking-tight sm:text-[8.5vw] lg:text-[7rem]">
            Александр
            <br />
            Судаков
          </h1>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Редачил для Альфа-Банка, Т-Банка, VK, Skillbox, Газпромбанк
              Инвестиций, Яндекс Доставки, Альпины и Студии Лебедева.
              Последние четыре года — главред в Timeweb Cloud и Hostman.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Написать
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Резюме ↗
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            О себе
          </p>
          <div className="max-w-3xl space-y-6 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            <p>
              Берусь за любые задачи без брезгливости — от ёмких смс и
              баннеров до сложных лонгридов и лендингов.
            </p>
            <p className="text-muted">
              С кайфом возьмусь за курс, сайт, книгу, соцсети или
              вайт-пейпер. Умею в UX. Пишу на русском (C2) и английском
              (C1). Работаю по ТК или ИП — есть шаблон договора, КЭП и
              ЭДО, полный комплект.
            </p>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
              Избранные работы
            </p>
            <Link
              href="/work"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Все работы →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {selectedWork.map((item) => (
              <Link
                key={item.slug}
                href={`/work#${item.slug}`}
                className="group flex flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-sm text-muted opacity-0 transition-opacity group-hover:opacity-100">
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

      {/* Photos teaser */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
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
            <PhotoSlot index={1} label="Портрет" className="aspect-[3/4]" />
            <PhotoSlot
              index={2}
              label="Рилс, кадр"
              className="aspect-[3/4] sm:mt-8"
            />
            <PhotoSlot index={3} label="Бэкстейдж" className="aspect-[3/4]" />
            <PhotoSlot
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
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
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
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {post.date}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight group-hover:text-accent">
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
