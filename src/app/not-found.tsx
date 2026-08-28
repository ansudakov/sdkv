import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Container>
        <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">
          404
        </p>
        <h1 className="balance font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          Такой страницы
          <br />
          нет<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Возможно, ссылка устарела или в адресе опечатка.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-accent-vivid px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85"
        >
          На главную
        </Link>
      </Container>
    </section>
  );
}
