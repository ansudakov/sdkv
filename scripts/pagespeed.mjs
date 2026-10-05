// node --env-file=.env.local scripts/pagespeed.mjs [url ...]   (по умолчанию: главная, блог, контакты)
// PageSpeed гоняет тест на машинах Google разной мощности: на слабых та же страница даёт LCP 5+ с вместо 2.5.
// Поэтому RUNS прогонов параллельно и оцениваем лучший: реальная деградация замедлит все прогоны сразу.
// Пороги — «плохо» и «можно лучше» по шкале Google. Exit 1, если есть «плохо».
import fs from "node:fs";

const KEY = process.env.PAGESPEED_API_KEY;
if (!KEY) {
  console.error("Нужен PAGESPEED_API_KEY в .env.local. Запуск: node --env-file=.env.local scripts/pagespeed.mjs");
  process.exit(1);
}

const RUNS = 5;
const ORIGIN = "https://ansudakov.ru";
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [ORIGIN, `${ORIGIN}/blog`, `${ORIGIN}/contacts`];

const BAD = { perf: 50, lcp: 4, cls: 0.25, tbt: 600 };
const OK = { perf: 90, lcp: 2.5, cls: 0.1, tbt: 200 };

async function run(url, strategy) {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  // случайный параметр обходит кеш PageSpeed: иначе повторные прогоны вернут один и тот же результат
  api.searchParams.set("url", `${url}${url.includes("?") ? "&" : "?"}psi=${Math.random().toString(36).slice(2)}`);
  api.searchParams.set("strategy", strategy);
  api.searchParams.set("key", KEY);
  api.searchParams.append("category", "performance");
  const res = await fetch(api);
  const j = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${j.error?.message ?? ""}`);
  const lh = j.lighthouseResult;
  const a = lh.audits;
  return {
    perf: Math.round((lh.categories.performance?.score ?? 0) * 100),
    lcp: a["largest-contentful-paint"].numericValue / 1000,
    cls: a["cumulative-layout-shift"].numericValue,
    tbt: a["total-blocking-time"].numericValue,
  };
}

const problems = [];
const notes = [];
const rows = [];

for (const url of urls) {
  const page = url.replace(ORIGIN, "") || "/";
  for (const strategy of ["mobile", "desktop"]) {
    const label = `${page} (${strategy === "mobile" ? "телефон" : "десктоп"})`;
    const settled = await Promise.allSettled(Array.from({ length: RUNS }, () => run(url, strategy)));
    const rs = settled.filter((r) => r.status === "fulfilled").map((r) => r.value);
    if (rs.length === 0) {
      problems.push(`${label}: PageSpeed не смог проверить (${String(settled[0].reason?.message).slice(0, 80)})`);
      continue;
    }
    const m = rs.reduce((best, r) => (r.perf > best.perf ? r : best));
    const range = rs.map((r) => r.perf).sort((a, b) => a - b);
    rows.push(
      `| ${label} | ${m.perf} (${range[0]}–${range.at(-1)}) | ${m.lcp.toFixed(1)} с | ${m.cls.toFixed(3)} | ${Math.round(m.tbt)} мс |`,
    );

    const bad = [];
    const meh = [];
    if (m.perf < BAD.perf) bad.push(`балл ${m.perf}`);
    else if (m.perf < OK.perf) meh.push(`балл ${m.perf}`);
    if (m.lcp > BAD.lcp) bad.push(`главный блок грузится ${m.lcp.toFixed(1)} с`);
    else if (m.lcp > OK.lcp) meh.push(`главный блок грузится ${m.lcp.toFixed(1)} с`);
    if (m.cls > BAD.cls) bad.push(`сдвиги макета ${m.cls.toFixed(2)}`);
    else if (m.cls > OK.cls) meh.push(`сдвиги макета ${m.cls.toFixed(2)}`);
    if (m.tbt > BAD.tbt) bad.push(`страница подвисает ${Math.round(m.tbt)} мс`);
    else if (m.tbt > OK.tbt) meh.push(`страница подвисает ${Math.round(m.tbt)} мс`);
    if (bad.length) problems.push(`${label}: ${bad.join(", ")}`);
    if (meh.length) notes.push(`${label}: ${meh.join(", ")}`);
  }
}

const report = [
  `# Скорость ${ORIGIN}`,
  "",
  `Лучший из ${RUNS} прогонов PageSpeed (в скобках разброс баллов: машины Google разной мощности). Норма: балл от ${OK.perf}, главный блок до ${OK.lcp} с, сдвиги до ${OK.cls}, подвисание до ${OK.tbt} мс.`,
  "",
  "| Страница | Балл (разброс) | Главный блок (LCP) | Сдвиги (CLS) | Подвисание (TBT) |",
  "|---|---|---|---|---|",
  ...rows,
  "",
  `## Плохо: ${problems.length}`,
  ...(problems.length ? problems.map((p) => `- ${p}`) : ["Нет."]),
  "",
  `## Можно лучше: ${notes.length}`,
  ...(notes.length ? notes.map((n) => `- ${n}`) : ["Нет."]),
].join("\n");

console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
process.exit(problems.length ? 1 : 0);
