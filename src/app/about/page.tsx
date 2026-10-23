import type { Metadata } from "next";
import { AboutSceneLoader } from "@/components/about-scene-loader";
import { AboutStats, type StatGroup } from "@/components/about-stats";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Я в 3D",
  description:
    "Александр Судаков в 3D-эскизе. Можно покрутить и посмотреть цифры про работу, тексты и обычный день.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  // Часть цифр выдуманная, пока заглушки. Заменить на настоящие.
  const groups: StatGroup[] = [
    {
      title: "Личное",
      stats: [
        { label: "Возраст", value: "39", unit: "лет" },
        { label: "Рост", value: "187", unit: "см" },
        { label: "Город", value: "Москва" },
        { label: "Волосы", value: "Черные + блонд" },
      ],
    },
    {
      title: "Работа",
      stats: [
        { label: "Опыт в редактуре", value: "9", unit: "лет" },
        { label: "Текстов, статей и лендингов", value: "2 000+" },
        { label: "Команд в руководстве", value: "3" },
        { label: "Рилсов снято", value: "100+" },
      ],
    },
    {
      title: "Ежедневно",
      stats: [
        { label: "Кофе", value: "2–3", unit: "чашки" },
        { label: "Шагов", value: "5–10 тыс" },
        { label: "Сон", value: "≈8", unit: "ч" },
        { label: "Больших задач", value: "2–3" },
      ],
    },
  ];

  return (
    <>
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            3D-эскиз
          </p>
          <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Вот он я в 3D<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Покрутите меня и посмотрите цифры. {site.role}. Живу в Москве.
          </p>
        </Container>
      </section>

      <Container className="grid items-center gap-6 py-8 md:gap-8 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12 lg:py-8">
        <AboutSceneLoader />
        <AboutStats
          name={site.name}
          meta={[
            { label: "Характер", value: "нордический, выдержанный" },
            { label: "Статус", value: "в работе" },
          ]}
          groups={groups}
        />
      </Container>
    </>
  );
}
