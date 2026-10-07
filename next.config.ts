import type { NextConfig } from "next";

// STATIC_EXPORT=1 собирает сайт в статичные файлы (папка out) для выкладки в бакет Яндекса.
// Обычная сборка для Vercel остаётся прежней.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
    }
  : {
      headers() {
        return [
          {
            // PDF-выжимки дублируют /works — не даём им конкурировать с портфолио в поиске.
            source: "/:file(cases|creative).pdf",
            headers: [{ key: "X-Robots-Tag", value: "noindex" }],
          },
        ];
      },
    };

export default nextConfig;
