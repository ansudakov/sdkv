"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";

// Откуда каждая буква прилетает при загрузке: сдвиг по x, по y и поворот.
// Внешняя обёртка анимирует сборку, внутренняя — покачивание на ховере,
// чтобы две анимации transform не перебивали друг друга.
const LETTERS = [
  { char: "S", shake: "logo-shake-1", from: ["-1.4em", "-0.9em", "-35deg"] },
  { char: "D", shake: "logo-shake-2", from: ["-0.4em", "1.1em", "25deg"] },
  { char: "K", shake: "logo-shake-3", from: ["0.5em", "-1.2em", "-20deg"] },
  { char: "V", shake: "logo-shake-2", from: ["1.5em", "0.8em", "40deg"] },
];

export function HeaderLogo() {
  const pathname = usePathname();

  function handleClick(e: MouseEvent) {
    // Если открыто мобильное меню, закрываем его: иначе оно остаётся поверх главной
    const menuWasOpen = document.body.style.overflow === "hidden";
    window.dispatchEvent(new Event("close-mobile-nav"));
    if (pathname === "/") {
      e.preventDefault();
      // Пока меню открыто, прокрутка страницы заблокирована: ждём, пока оно закроется
      const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
      if (menuWasOpen) setTimeout(toTop, 80);
      else toTop();
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight sm:text-xl"
    >
      <span className="logo-pop inline-block shrink-0">
        <span className="logo-shake-avatar block h-7 w-7 overflow-hidden rounded-full border border-accent">
          <Image
            src="/photos/alexander-main.jpg"
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </span>
      </span>
      <span className="flex items-baseline">
        {LETTERS.map(({ char, shake, from }, i) => (
          <span
            key={char}
            className="logo-assemble inline-block"
            style={
              {
                "--from-x": from[0],
                "--from-y": from[1],
                "--from-r": from[2],
                animationDelay: `${110 + i * 25}ms`,
              } as CSSProperties
            }
          >
            <span className={`${shake} inline-block${char === "V" ? " text-accent" : ""}`}>{char}</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
