import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#faf9f6",
          padding: "90px",
        }}
      >
        <img
          src={avatarSrc}
          alt=""
          width={240}
          height={240}
          style={{
            borderRadius: "50%",
            border: "6px solid #f5a300",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 64,
            maxWidth: 700,
          }}
        >
          <div
            style={{
              fontFamily: "Unbounded",
              fontWeight: 500,
              fontSize: 22,
              lineHeight: 1.5,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#f5a300",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Unbounded",
              fontWeight: 700,
              fontSize: 80,
              lineHeight: 1.1,
              color: "#0d0d0c",
              marginTop: 22,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontFamily: "Unbounded",
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: 3,
              color: "#68675f",
              marginTop: 28,
            }}
          >
            {site.domain}
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
