import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const avatarData = await readFile(
  join(process.cwd(), "public/photos/alexander-main.jpg"),
  "base64",
);
const avatarSrc = `data:image/jpeg;base64,${avatarData}`;

const unboundedBold = await readFile(
  join(process.cwd(), "assets/fonts/Unbounded-Bold.ttf"),
);
const unboundedMedium = await readFile(
  join(process.cwd(), "assets/fonts/Unbounded-Medium.ttf"),
);

function titleFontSize(title: string) {
  if (title.length > 60) return 48;
  if (title.length > 40) return 56;
  return 68;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Unbounded",
            fontWeight: 500,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#ff781f",
          }}
        >
          Блог
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Unbounded",
            fontWeight: 700,
            fontSize: titleFontSize(title),
            lineHeight: 1.2,
            color: "#0d0d0c",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <img
            src={avatarSrc}
            alt=""
            width={64}
            height={64}
            style={{
              borderRadius: "50%",
              border: "3px solid #ff781f",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Unbounded",
            }}
          >
            <div style={{ display: "flex", fontWeight: 700, fontSize: 22, color: "#0d0d0c" }}>
              {site.name}
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: 500,
                fontSize: 18,
                letterSpacing: 1,
                color: "#68675f",
                marginTop: 4,
              }}
            >
              {site.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unboundedBold, weight: 700, style: "normal" },
        { name: "Unbounded", data: unboundedMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
