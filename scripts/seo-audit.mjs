// SEO-аудит живого сайта: node scripts/seo-audit.mjs [origin]
// Ошибки (exit 1): страница или внутренняя ссылка не отдаёт 200, нет title/description/h1/canonical.
// Предупреждения: длина title/description, дубли, тяжёлые картинки, внешние ссылки с ошибкой.
import fs from "node:fs";

const ORIGIN = (process.argv[2] ?? "https://ansudakov.ru").replace(/\/$/, "");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
const TITLE_MAX = 70;
const DESC_MIN = 50;
const DESC_MAX = 160;
const IMG_MAX_KB = 300;
const IMG_CHECK_WIDTH = 1080;
// Внешнюю ссылку считаем битой, только если страницы или домена точно нет. Остальное (403/451 для ботов,
// российские сертификаты Минцифры, антибот-редиректы, таймауты) у живых посетителей обычно открывается.
const EXT_BROKEN_STATUS = [404, 410];
const EXT_BROKEN_CODES = ["ENOTFOUND", "EAI_AGAIN"];

const errors = [];
const unverifiable = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

async function request(url, { method = "GET", accept } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": UA, ...(accept ? { Accept: accept } : {}) },
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function pool(items, limit, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    }),
  );
  return out;
}

const pathOf = (url) => url.replace(ORIGIN, "") || "/";

const sitemap = await (await request(`${ORIGIN}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (pages.length === 0) {
  console.error("sitemap.xml пустой или недоступен");
  process.exit(1);
}

const titles = new Map();
const descs = new Map();
const internalLinks = new Map();
const externalLinks = new Map();
const images = new Map();

await pool(pages, 4, async (url) => {
  const page = pathOf(url);
  const res = await request(url);
  if (res.status !== 200) return err(page, `страница отдаёт ${res.status}`);
  const html = await res.text();

  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim() ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) err(page, "нет title");
  else if (title.length > TITLE_MAX) warn(page, `title ${title.length} симв. (> ${TITLE_MAX}, обрежется в выдаче): «${title}»`);
  if (!desc) err(page, "нет meta description");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    warn(page, `description ${desc.length} симв. (норма ${DESC_MIN}–${DESC_MAX})`);
  if (!canonical) err(page, "нет canonical");
  if (h1 === 0) err(page, "нет h1");
  if (h1 > 1) warn(page, `h1 на странице: ${h1}`);

  if (title) titles.set(title, [...(titles.get(title) ?? []), page]);
  if (desc) descs.set(desc, [...(descs.get(desc) ?? []), page]);

  for (const [, rawHref] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = decode(rawHref).split("#")[0];
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    const abs = new URL(href, url).href.replace(/\/$/, "");
    const bucket = abs.startsWith(ORIGIN) ? internalLinks : externalLinks;
    bucket.set(abs, [...new Set([...(bucket.get(abs) ?? []), page])]);
  }

  for (const [, rawSrc] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    let src = new URL(decode(rawSrc), url);
    if (src.pathname === "/_next/image") src.searchParams.set("w", String(IMG_CHECK_WIDTH));
    images.set(src.href, [...new Set([...(images.get(src.href) ?? []), page])]);
  }
});

for (const [title, where] of titles) if (where.length > 1) warn(where.join(", "), `одинаковый title «${title}»`);
for (const [, where] of descs) if (where.length > 1) warn(where.join(", "), "одинаковый description");

await pool([...internalLinks], 6, async ([link, from]) => {
  const res = await request(link).catch((e) => ({ status: e.name === "AbortError" ? "таймаут" : e.message }));
  if (res.status !== 200) err(from.join(", "), `битая внутренняя ссылка ${pathOf(link)} → ${res.status}`);
});

await pool([...externalLinks], 6, async ([link, from]) => {
  const res = await request(link).catch((e) => ({ status: e.cause?.code ?? e.name ?? e.message }));
  if (res.status === 200) return;
  if (EXT_BROKEN_STATUS.includes(res.status) || EXT_BROKEN_CODES.includes(res.status))
    return warn(from.join(", "), `битая внешняя ссылка ${link} → ${res.status}`);
  unverifiable.push(`${new URL(link).hostname} (${res.status})`);
});

await pool([...images], 6, async ([src, from]) => {
  const res = await request(src, { accept: "image/avif,image/webp,image/*" }).catch(() => null);
  if (!res || res.status !== 200) return err(from.join(", "), `картинка не грузится: ${src}`);
  const kb = Math.round((await res.arrayBuffer()).byteLength / 1024);
  if (kb > IMG_MAX_KB) {
    const name = new URL(src).searchParams.get("url") ?? new URL(src).pathname;
    warn(from.join(", "), `тяжёлая картинка ${name}: ${kb} КБ при ширине ${IMG_CHECK_WIDTH}px (> ${IMG_MAX_KB} КБ)`);
  }
});

const report = [
  `# SEO-аудит ${ORIGIN}`,
  "",
  `Страниц: ${pages.length} · внутренних ссылок: ${internalLinks.size} · внешних: ${externalLinks.size} · картинок: ${images.size}`,
  "",
  `## Ошибки: ${errors.length}`,
  ...(errors.length ? errors.sort().map((e) => `- ${e}`) : ["Нет."]),
  "",
  `## Предупреждения: ${warnings.length}`,
  ...(warnings.length ? warnings.sort().map((w) => `- ${w}`) : ["Нет."]),
  "",
  `Не удалось проверить автоматически (сайт не пускает ботов или использует сертификат Минцифры), внешних ссылок: ${unverifiable.length}` +
    (unverifiable.length ? ` — ${[...new Set(unverifiable)].sort().join(", ")}` : ""),
].join("\n");

console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
process.exit(errors.length ? 1 : 0);
