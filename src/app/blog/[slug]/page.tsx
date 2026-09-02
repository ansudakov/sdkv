import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { PostCoverImage } from "@/components/post-cover-image";
import { PostKeyboardNav } from "@/components/post-keyboard-nav";
import { PostReaction } from "@/components/post-reaction";
import {
  getAdjacentPosts,
  getAllPosts,
  getHeadings,
  getPost,
  getRelatedPosts,
  splitIntro,
} from "@/lib/posts";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);
  const headings = getHeadings(post.content);
  const { intro, body } = splitIntro(post.content);

  const postUrl = `${site.url}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${postUrl}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="pt-16 pb-24 sm:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PostKeyboardNav
        olderHref={older ? `/blog/${older.slug}` : undefined}
        newerHref={newer ? `/blog/${newer.slug}` : undefined}
      />
      <Container className="article-grid">
        <div className="article-header">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            ← Блог
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            {post.date} · {post.readingTime}
          </p>
          <h1 className="balance mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
            <span className="text-accent">.</span>
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
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
          {post.description && (
            <p className="mt-6 text-lg text-muted">{post.description}</p>
          )}
          {post.image && (
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
              <PostCoverImage
                src={post.image}
                srcDark={post.imageDark}
                alt={post.title}
                sizes="(min-width: 1024px) 960px, (min-width: 640px) 768px, 100vw"
              />
            </div>
          )}
        </div>
        {intro && (
          <div className="article-intro prose-article mt-10">
            <MDXRemote
              source={intro}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        )}
        {headings.length > 1 && (
          <div className="article-toc-wrap mt-10">
            <div className="article-toc rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                В этой статье
              </p>
              <ol className="mt-4 space-y-2.5">
                {headings.map((h) => (
                  <li key={h.slug}>
                    <a
                      href={`#${h.slug}`}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        <div className="article-body prose-article mt-12">
          <MDXRemote
            source={body}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
            }}
          />
        </div>

        <div className="article-footer mt-16 space-y-10">
          <PostReaction slug={slug} />

          {related.length > 0 && (
            <div className="border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Почитать ещё
              </p>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">
                      {p.date}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(newer || older) && (
            <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="group rounded-2xl border border-border p-5 transition-colors hover:border-accent"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    ← Более старая статья
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {older.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {newer && (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="group rounded-2xl border border-border p-5 text-right transition-colors hover:border-accent sm:col-start-2"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    Более новая статья →
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {newer.title}
                  </p>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
