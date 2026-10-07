"use client";

// Загрузчик картинок для статичной сборки (STATIC_EXPORT=1, выкладка на Selectel).
// Серверного сжатия «на лету» там нет, поэтому scripts/optimize-images.mjs заранее
// готовит webp нужных размеров в public/_img/<имя>-<ширина>.webp.
// Набор ширин должен совпадать со скриптом.
const WIDTHS = [64, 96, 128, 256, 384, 640, 828, 1080, 1200];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/photos/")) return src;
  const name = src.slice("/photos/".length).replace(/\.[^.]+$/, "");
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/_img/${name}-${target}.webp`;
}
