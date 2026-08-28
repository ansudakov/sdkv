import Link from "next/link";
import { Container } from "@/components/container";
import { TrackedLink } from "@/components/tracked-link";
import { site, nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-14 sm:py-16">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Давайте сделаем
              <br />
              что-то{" "}
              <span className="relative inline-block leading-none">
                е
                <span className="absolute top-[0.02em] left-[14%] h-[0.22em] w-[0.22em] rounded-full bg-accent" />
                <span className="absolute top-[0.02em] left-[54%] h-[0.22em] w-[0.22em] rounded-full bg-accent" />
              </span>
              мкое<span className="text-accent">.</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <TrackedLink
                gaEvent="contact_email_click"
                href={`mailto:${site.email}`}
                className="text-lg text-accent underline decoration-1 underline-offset-4"
              >
                {site.email}
              </TrackedLink>
              <TrackedLink
                gaEvent="contact_telegram_click"
                href={site.telegramContact}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-accent underline decoration-1 underline-offset-4"
              >
                Написать в ТГ
              </TrackedLink>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-muted">Разделы</span>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-muted">Ещё</span>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                ТГ-канал
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Инстаграм
              </a>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Ютуб
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Тикток
              </a>
              <a href={site.resumePdf} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Резюме (PDF)
              </a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Резюме на hh.ru
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} ИП {site.name}, ИНН {site.inn}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Политика конфиденциальности
            </Link>
            <span>{site.role}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
