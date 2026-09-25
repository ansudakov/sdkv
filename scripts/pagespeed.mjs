// node --env-file=.env.local scripts/pagespeed.mjs [url ...]   (по умолчанию: главная, блог, контакты)
// Одиночный прогон PageSpeed сильно шумит, поэтому берём медиану из RUNS запусков.
const KEY = process.env.PAGESPEED_API_KEY;
if (!KEY) {
  console.error("Нужен PAGESPEED_API_KEY в .env.local. Запуск: node --env-file=.env.local scripts/pagespeed.mjs");
  process.exit(1);
}

const RUNS = 3;
const ORIGIN = "https://ansudakov.ru";
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [ORIGIN, `${ORIGIN}/blog`, `${ORIGIN}/contacts`];

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

async function run(url, strategy) {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  // случайный параметр обходит кеш PageSpeed: иначе повторные прогоны вернут один и тот же результат
  api.searchParams.set("url", `${url}${url.includes("?") ? "&" : "?"}psi=${Math.random().toString(36).slice(2)}`);
  api.searchParams.set("strategy", strategy);
  api.searchParams.set("key", KEY);
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) {
    api.searchParams.append("category", c);
  }
  const res = await fetch(api);
  const j = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${j.error?.message ?? ""}`);
  const lh = j.lighthouseResult;
  const a = lh.audits;
  const score = (k) => Math.round((lh.categories[k]?.score ?? 0) * 100);
  return {
    perf: score("performance"),
    seo: score("seo"),
    a11y: score("accessibility"),
    best: score("best-practices"),
    lcp: a["largest-contentful-paint"].numericValue / 1000,
    cls: a["cumulative-layout-shift"].numericValue,
    tbt: a["total-blocking-time"].numericValue,
    fcp: a["first-contentful-paint"].numericValue / 1000,
  };
}

for (const url of urls) {
  for (const strategy of ["mobile", "desktop"]) {
    try {
      const rs = [];
      for (let i = 0; i < RUNS; i++) {
        try {
          rs.push(await run(url, strategy));
        } catch (e) {
          console.log(`  (прогон ${i + 1} пропущен: ${e.message.slice(0, 80)})`);
        }
      }
      if (rs.length === 0) throw new Error("все прогоны упали");
      const m = (k) => median(rs.map((r) => r[k]));
      console.log(
        `${strategy.padEnd(7)} ${url}  (медиана из ${rs.length})\n` +
          `  perf ${m("perf")} [${rs.map((r) => r.perf).join(", ")}] | seo ${m("seo")} | a11y ${m("a11y")} | best ${m("best")}\n` +
          `  LCP ${m("lcp").toFixed(1)} s | CLS ${m("cls").toFixed(3)} | TBT ${Math.round(m("tbt"))} ms | FCP ${m("fcp").toFixed(1)} s`,
      );
    } catch (e) {
      console.log(`${strategy} ${url}: ${e.message}`);
    }
  }
}
