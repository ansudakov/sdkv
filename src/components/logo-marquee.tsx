import { svgLogos } from "@/lib/logo-marquee-data";

type LogoEntry =
  | { kind: "svg"; alt: string; viewBox: string; markup: string; tall?: boolean }
  | { kind: "img"; alt: string; src: string }
  | { kind: "text"; alt: string; text: string };

const svgLogo = (alt: string): LogoEntry => {
  const logo = svgLogos.find((l) => l.alt === alt);
  if (!logo) throw new Error(`Missing logo data for ${alt}`);
  return { kind: "svg", ...logo, tall: alt === "VK" };
};

const logos: LogoEntry[] = [
  svgLogo("Альфа-Банк"),
  svgLogo("Т-Банк"),
  svgLogo("VK"),
  svgLogo("Skillbox"),
  svgLogo("Газпромбанк"),
  svgLogo("Яндекс"),
  { kind: "img", alt: "Альпина Паблишер", src: "/logos/alpina.png" },
  svgLogo("Студия Артемия Лебедева"),
  svgLogo("Ambassadori Island Batumi"),
  svgLogo("Timeweb Cloud"),
  { kind: "text", alt: "Hostman", text: "Hostman" },
];

function LogoMark({ logo }: { logo: LogoEntry }) {
  if (logo.kind === "text") {
    return (
      <span
        role="img"
        aria-label={logo.alt}
        className="shrink-0 whitespace-nowrap text-xl font-semibold text-muted sm:text-2xl"
        style={{ fontFamily: "var(--font-golos)" }}
      >
        {logo.text}
      </span>
    );
  }

  if (logo.kind === "img") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- intrinsic aspect-ratio sizing needed
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-6 w-auto shrink-0 opacity-70 grayscale sm:h-7"
      />
    );
  }

  return (
    <svg
      role="img"
      aria-label={logo.alt}
      viewBox={logo.viewBox}
      fill="currentColor"
      className={
        logo.tall
          ? "h-8 w-auto shrink-0 text-muted sm:h-9"
          : "h-6 w-auto shrink-0 text-muted sm:h-7"
      }
      dangerouslySetInnerHTML={{ __html: logo.markup }}
    />
  );
}

export function LogoMarquee() {
  return (
    <div className="marquee-fade overflow-hidden" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-14">
        {[...logos, ...logos].map((logo, i) => (
          <LogoMark key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}
