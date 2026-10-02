// node scripts/cases-pdf/build.mjs [cases|creative]
// Собирает public/<имя>.pdf из scripts/cases-pdf/<имя>.html через headless Chrome.
// Шрифты тянутся с Google Fonts, поэтому нужен интернет. HTML отдаём по http,
// а не file://, иначе Chrome не всегда успевает подгрузить шрифты.
import { execFile } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const dir = path.dirname(fileURLToPath(import.meta.url));
const EXPECTED_PAGES = { cases: 2, creative: 3 };
const name = process.argv[2] ?? "cases";
if (!(name in EXPECTED_PAGES)) {
  console.error(`Неизвестный документ: ${name}. Есть: ${Object.keys(EXPECTED_PAGES).join(", ")}.`);
  process.exit(1);
}
const out = path.resolve(dir, `../../public/${name}.pdf`);
const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(chrome)) {
  console.error(`Не найден Chrome: ${chrome}. Укажите путь в CHROME_PATH.`);
  process.exit(1);
}

const html = fs.readFileSync(path.join(dir, `${name}.html`));
const server = http
  .createServer((_, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  })
  .listen(0);
const { port } = server.address();

// Сервер живёт в этом же процессе, поэтому Chrome запускаем асинхронно,
// иначе синхронный вызов блокирует event loop и страница не отдаётся.
try {
  await promisify(execFile)(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=8000",
      `--print-to-pdf=${out}`,
      `http://localhost:${port}/`,
    ],
    { timeout: 60_000 },
  );
} finally {
  server.close();
}

const pages = (fs.readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`Готово: ${path.relative(process.cwd(), out)}, страниц: ${pages}`);
if (pages !== EXPECTED_PAGES[name]) {
  console.warn(`Внимание: ожидалось страниц: ${EXPECTED_PAGES[name]}. Что-то переполнилось, проверьте вёрстку.`);
}
