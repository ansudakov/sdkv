import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PhotoCard } from "@/components/photo-card";

export const metadata: Metadata = {
  title: "Фото",
  description: "Фотографии и кадры из рилсов Александра Судакова.",
};

const slots = [
  { src: "/photos/portrait-main.jpg", label: "Портрет", tall: true },
  { src: "/photos/reel-city.jpg", label: "Рилс, кадр" },
  { src: "/photos/backstage-park.jpg", label: "Бэкстейдж" },
  { src: "/photos/writing-indoor.jpg", label: "За текстом", tall: true },
  { src: "/photos/travel-cathedral.jpg", label: "В поездке" },
  { src: "/photos/portrait-office.jpg", label: "Портрет" },
  { src: "/photos/reel-steps.jpg", label: "Рилс, кадр", tall: true },
  { src: "/photos/onset-gold-doors.jpg", label: "В деле" },
  { src: "/photos/call-glass.jpg", label: "На созвоне" },
  { src: "/photos/portrait-stairs.jpg", label: "Портрет", tall: true },
  { src: "/photos/reel-registan.jpg", label: "Рилс, кадр" },
  { src: "/photos/coffee-routine.jpg", label: "Кофе / рутина", tall: true },
];

export default function PhotosPage() {
  return (
    <>
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Фото
          </p>
          <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            В кадре и
            <br />
            за кадром<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Портреты, кадры из рилсов и рабочие будни — без глянца.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {slots.map((slot, i) => (
            <PhotoCard
              key={slot.src}
              src={slot.src}
              index={i + 1}
              label={slot.label}
              className={slot.tall ? "aspect-[3/4] sm:mt-8" : "aspect-square"}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
