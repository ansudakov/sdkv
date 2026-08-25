import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PhotoSlot } from "@/components/photo-slot";

export const metadata: Metadata = {
  title: "Фото",
  description: "Фотографии и кадры из рилсов Александра Судакова.",
};

const slots = [
  { label: "Портрет", tall: true },
  { label: "Рилс, кадр" },
  { label: "Бэкстейдж" },
  { label: "За текстом", tall: true },
  { label: "В поездке" },
  { label: "Портрет" },
  { label: "Рилс, кадр", tall: true },
  { label: "С командой" },
  { label: "На созвоне" },
  { label: "Портрет", tall: true },
  { label: "Рилс, кадр" },
  { label: "Кофе / рутина" },
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
            Галерея пока пустая — это места под фотографии. Каждый блок
            ниже соответствует будущему снимку.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {slots.map((slot, i) => (
            <PhotoSlot
              key={i}
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
