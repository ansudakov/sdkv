import type { Metadata } from "next";
import { Container } from "@/components/container";
import { TrackedLink } from "@/components/tracked-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Почта, Телеграм, телеграм-канал, Инстаграм, Ютуб и Тикток Александра Судакова. Живу и работаю в Москве.",
  alternates: {
    canonical: "/contacts",
  },
};

type Contact = {
  label: string;
  value: string;
  href: string;
  note?: string;
  gaEvent?: string;
  external?: boolean;
};

const workContacts: Contact[] = [
  {
    label: "Почта",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Задачи, брифы, договоры.",
    gaEvent: "contact_email_click",
  },
  {
    label: "Телеграм",
    value: site.telegramContactHandle,
    href: site.telegramContact,
    note: "Личные сообщения.",
    gaEvent: "contact_telegram_click",
    external: true,
  },
];

const socialContacts: Contact[] = [
  {
    label: "ТГ-канал",
    value: site.telegramHandle,
    href: site.telegram,
    note: "Заметки, мысли и всё подряд.",
    external: true,
  },
  {
    label: "Инстаграм",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
  },
  {
    label: "Ютуб",
    value: site.youtubeHandle,
    href: site.youtube,
    external: true,
  },
  {
    label: "Тикток",
    value: site.tiktokHandle,
    href: site.tiktok,
    external: true,
  },
];

const facts = [
  { label: "Город", value: "Москва, Россия" },
  { label: "Связь", value: "В рабочее время по Москве" },
  { label: "Языки", value: "Русский (C2), английский (C1)" },
  { label: "Формат", value: "По ТК или ИП" },
  { label: "Документы", value: "Шаблон договора, КЭП и ЭДО. Полный комплект." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Контакты",
  url: `${site.url}/contacts`,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.role,
    knowsLanguage: ["ru", "en"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    sameAs: [site.telegram, site.instagram, site.youtube, site.tiktok],
  },
};

function breakAfterAt(value: string) {
  const at = value.indexOf("@");
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  const className =
    "group flex items-center justify-between gap-6 py-6 sm:py-8";
  const content = (
    <>
      <span className="flex min-w-0 flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {contact.label}
          {contact.note && <span className="normal-case tracking-normal"> · {contact.note}</span>}
        </span>
        <span className="break-words font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl lg:text-5xl">
          {breakAfterAt(contact.value)}
        </span>
      </span>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </>
  );

  const external = contact.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (contact.gaEvent) {
    return (
      <TrackedLink
        gaEvent={contact.gaEvent}
        href={contact.href}
        className={className}
        {...external}
      >
        {content}
      </TrackedLink>
    );
  }

  return (
    <a href={contact.href} className={className} {...external}>
      {content}
    </a>
  );
}

function ContactList({ title, items }: { title: string; items: Contact[] }) {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <Container>
        <h2 className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-accent">
          {title}
        </h2>
        <ul className="divide-y divide-border">
          {items.map((contact) => (
            <li key={contact.label}>
              <ContactRow contact={contact} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default function ContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-b border-border pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Container>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Контакты
          </p>
          <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Пишите<span className="text-accent">,</span>
            <br />
            где удобно<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Живу и работаю в Москве. В рабочее время по Москве на связи:
            оперативно решаю вопросы и держу контакт с заказчиками.
          </p>
        </Container>
      </section>

      <ContactList title="Для работы" items={workContacts} />
      <ContactList title="Читать и смотреть" items={socialContacts} />

      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Как со мной работать
          </h2>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 border-t border-border pt-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Резюме в PDF
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Резюме на hh.ru
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
