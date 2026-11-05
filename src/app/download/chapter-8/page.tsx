import type { Metadata } from "next";
import { DownloadRedirect } from "@/components/download-redirect";

export const metadata: Metadata = {
  title: "Chapter 8",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Chapter8DownloadPage() {
  return <DownloadRedirect />;
}
