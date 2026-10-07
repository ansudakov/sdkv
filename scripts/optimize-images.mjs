// Готовит уменьшенные webp-версии фото для статичной сборки (STATIC_EXPORT=1).
// Без этой переменной ничего не делает, поэтому обычная сборка (Vercel) не затронута.
// Результат: public/_img/<имя>-<ширина>.webp (папка в .gitignore, создаётся при каждой сборке).
// Набор ширин должен совпадать с src/lib/image-loader.ts.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

if (process.env.STATIC_EXPORT !== "1") process.exit(0);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public", "photos");
const outDir = path.join(root, "public", "_img");
const WIDTHS = [64, 96, 128, 256, 384, 640, 828, 1080, 1200];
const QUALITY = 80;

await mkdir(outDir, { recursive: true });

let count = 0;
for (const file of await readdir(srcDir)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const input = path.join(srcDir, file);
  const sourceTime = (await stat(input)).mtimeMs;
  const { width: originalWidth } = await sharp(input).metadata();

  for (const width of WIDTHS) {
    const output = path.join(outDir, `${name}-${width}.webp`);
    const fresh = await stat(output).then((s) => s.mtimeMs > sourceTime, () => false);
    if (fresh) continue;
    // Не увеличиваем: если оригинал уже уже нужной ширины, кладём его размер под этим именем.
    await sharp(input)
      .rotate()
      .resize({ width: Math.min(width, originalWidth), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(output);
    count++;
  }
}
console.log(`optimize-images: создано файлов ${count}, папка ${path.relative(root, outDir)}`);
