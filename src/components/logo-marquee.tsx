type LogoEntry =
  | { src: string; alt: string; ratio: number; tall?: boolean; text?: undefined }
  | { text: string; alt: string; src?: undefined; ratio?: undefined; tall?: undefined };

const logos: LogoEntry[] = [
  { src: "/logos/alfa-bank.svg", alt: "Альфа-Банк", ratio: 726.6 / 127.34 },
  { src: "/logos/t-bank.svg", alt: "Т-Банк", ratio: 87 / 12.01 },
  { src: "/logos/vk.svg", alt: "VK", ratio: 32.02 / 19.98, tall: true },
  { src: "/logos/skillbox.svg", alt: "Skillbox", ratio: 98.81 / 22 },
  { src: "/logos/gazprombank.svg", alt: "Газпромбанк", ratio: 288.24 / 59.36 },
  { src: "/logos/yandex.svg", alt: "Яндекс", ratio: 350 / 135 },
  { src: "/logos/alpina.png", alt: "Альпина Паблишер", ratio: 1000 / 282 },
  { src: "/logos/lebedev.svg", alt: "Студия Артемия Лебедева", ratio: 701 / 89.83 },
  { src: "/logos/ambassadori.svg", alt: "Ambassadori Island Batumi", ratio: 549 / 370 },
  { src: "/logos/timeweb.svg", alt: "Timeweb Cloud", ratio: 188.37 / 18.66 },
  { text: "Hostman", alt: "Hostman" },
];

function LogoMark({ logo }: { logo: LogoEntry }) {
  if (logo.text) {
    return (
      <span
        role="img"
        aria-label={logo.alt}
        className="shrink-0 whitespace-nowrap font-display text-xl font-semibold tracking-tight text-muted sm:text-2xl"
      >
        {logo.text}
      </span>
    );
  }

  return (
    <div
      role="img"
      aria-label={logo.alt}
      className={
        logo.tall
          ? "h-8 shrink-0 bg-muted sm:h-9"
          : "h-6 shrink-0 bg-muted sm:h-7"
      }
      style={{
        aspectRatio: logo.ratio,
        WebkitMaskImage: `url(${logo.src})`,
        maskImage: `url(${logo.src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
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
