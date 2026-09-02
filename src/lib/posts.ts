import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  imageDark?: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    image: data.image,
    imageDark: data.imageDark,
    readingTime: readingTime(content).text,
  };
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    image: data.image,
    imageDark: data.imageDark,
    readingTime: readingTime(content).text,
    content,
  };
}

export type Heading = { text: string; slug: string };

export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const matches = content.matchAll(/^##\s+(.+)$/gm);
  return Array.from(matches, (m) => {
    const text = m[1].trim();
    return { text, slug: slugger.slug(text) };
  });
}

export function splitIntro(content: string): { intro: string; body: string } {
  const match = content.match(/^##\s+/m);
  if (!match || match.index === undefined) {
    return { intro: content.trim(), body: "" };
  }
  return {
    intro: content.slice(0, match.index).trim(),
    body: content.slice(match.index),
  };
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }));
  scored.sort((a, b) => {
    if (b.shared !== a.shared) return b.shared - a.shared;
    return a.post.date < b.post.date ? 1 : -1;
  });
  return scored.slice(0, limit).map((s) => s.post);
}

export function getAdjacentPosts(slug: string): {
  newer: PostMeta | null;
  older: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
