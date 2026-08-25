import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { getAllPosts, getPost } from "@/lib/posts";

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
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

  return (
    <article className="pt-16 pb-24 sm:pt-20">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {post.date} · {post.readingTime}
        </p>
        <h1 className="balance mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.title}
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
        <div className="prose-article mt-12">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </Container>
    </article>
  );
}
