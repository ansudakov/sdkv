import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи про редактуру, тексты и контент.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Блог
          </p>
          <h1 className="balance font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Про редактуру
            <br />и тексты<span className="text-accent">.</span>
          </h1>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-muted">Статей пока нет — первая скоро выйдет.</p>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-semibold tracking-tight group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted sm:text-right">
                  <p>{post.date}</p>
                  <p className="mt-1">{post.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
