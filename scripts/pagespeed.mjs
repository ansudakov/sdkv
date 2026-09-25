// node --env-file=.env.local scripts/pagespeed.mjs [url ...]   (по умолчанию: главная, блог, контакты)
const KEY = process.env.PAGESPEED_API_KEY;
if (!KEY) {
  console.error("Нужен PAGESPEED_API_KEY в .env.local. Запуск: node --env-file=.env.local scripts/pagespeed.mjs");
  process.exit(1);
}

const ORIGIN = "https://ansudakov.ru";
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [ORIGIN, `${ORIGIN}/blog`, `${ORIGIN}/contacts`];

const fmt = (a) => a?.displayValue ?? "-";

for (const url of urls) {
  for (const strategy of ["mobile", "desktop"]) {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", strategy);
    for (const c of ["performance", "seo", "accessibility", "best-practices"]) {
      api.searchParams.append("category", c);
    }
    api.searchParams.set("key", KEY);
    const res = await fetch(api);
    const j = await res.json();
    if (!res.ok) {
      console.log(`${strategy} ${url}: ${res.status} ${j.error?.message ?? ""}`);
      continue;
    }
    const lh = j.lighthouseResult;
    const score = (k) => Math.round((lh.categories[k]?.score ?? 0) * 100);
    const a = lh.audits;
    console.log(
      `${strategy.padEnd(7)} ${url}\n  perf ${score("performance")} | seo ${score("seo")} | a11y ${score("accessibility")} | best ${score("best-practices")}` +
        `\n  LCP ${fmt(a["largest-contentful-paint"])} | CLS ${fmt(a["cumulative-layout-shift"])} | TBT ${fmt(a["total-blocking-time"])} | FCP ${fmt(a["first-contentful-paint"])}`,
    );
  }
}
