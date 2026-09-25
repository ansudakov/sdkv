// Отправляет URL в IndexNow (Яндекс, Bing и др.).
// node scripts/indexnow.mjs --all         все страницы из живого sitemap.xml
// node scripts/indexnow.mjs --changed     статьи, изменённые в последних коммитах
import { execSync } from "node:child_process";
import fs from "node:fs";

const HOST = "ansudakov.ru";
const ORIGIN = `https://${HOST}`;
const KEY = "3caacfc7636a400aa5ced63bb79c7360";
const LOOKBACK_COMMITS = 3;

async function allUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function changedUrls() {
  const files = execSync(
    `git diff --name-only --diff-filter=AM HEAD~${LOOKBACK_COMMITS} HEAD -- src/content/posts`,
    { encoding: "utf8" },
  )
    .split("\n")
    .filter((f) => f.endsWith(".mdx") && fs.existsSync(f));
  if (files.length === 0) return [];
  const slugs = files.map((f) => f.split("/").pop().replace(/\.mdx$/, ""));
  return [ORIGIN, `${ORIGIN}/blog`, ...slugs.map((s) => `${ORIGIN}/blog/${s}`)];
}

const mode = process.argv[2];
if (mode !== "--all" && mode !== "--changed") {
  console.error("Usage: indexnow.mjs --all | --changed");
  process.exit(1);
}

const urlList = mode === "--all" ? await allUrls() : changedUrls();
if (urlList.length === 0) {
  console.log("IndexNow: нечего отправлять");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText}, отправлено URL: ${urlList.length}`);
urlList.forEach((u) => console.log(" ", u));
if (!res.ok && res.status !== 202) process.exit(1);
