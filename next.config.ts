import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
