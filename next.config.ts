import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    return [
      {
        // Выжимка дублирует /works — не даём ей конкурировать с портфолио в поиске.
        source: "/cases.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
