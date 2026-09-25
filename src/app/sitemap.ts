import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts
    .map((p) => p.updated ?? p.date)
    .filter(Boolean)
    .sort()
    .at(-1);

  const staticRoutes = [
    { route: "", lastModified: latest },
    { route: "/blog", lastModified: latest },
    { route: "/projects" },
    { route: "/works" },
    { route: "/photos" },
  ].map(({ route, lastModified }) => ({
    url: `${site.url}${route}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  }));

  const postRoutes = posts.map((post) => {
    const modified = post.updated ?? post.date;
    return {
      url: `${site.url}/blog/${post.slug}`,
      ...(modified ? { lastModified: new Date(modified) } : {}),
    };
  });

  return [...staticRoutes, ...postRoutes];
}
