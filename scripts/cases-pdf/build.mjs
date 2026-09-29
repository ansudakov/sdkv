// node scripts/cases-pdf/build.mjs
// Собирает public/cases.pdf из scripts/cases-pdf/cases.html через headless Chrome.
// Шрифты тянутся с Google Fonts, поэтому нужен интернет. HTML отдаём по http,
// а не file://, иначе Chrome не всегда успевает подгрузить шрифты.
import { execFile } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(dir, "../../public/cases.pdf");
const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(chrome)) {
  console.error(`Не найден Chrome: ${chrome}. Укажите путь в CHROME_PATH.`);
  process.exit(1);
}

const html = fs.readFileSync(path.join(dir, "cases.html"));
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
if (pages !== 2) console.warn("Внимание: ожидалось 2 страницы — что-то переполнилось, проверьте вёрстку.");
