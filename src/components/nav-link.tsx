"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/**
 * Пункт меню, который знает, что он активен: текущий раздел и его вложенные страницы
 * (например, /blog/статья подсвечивает «Блог»). Клик по пункту текущей страницы
 * плавно возвращает наверх, как клик по логотипу на главной.
 */
export function NavLink({
  href,
  className,
  activeClassName,
  inactiveClassName,
  onNavigate,
  children,
}: {
  href: string;
  className: string;
  activeClassName: string;
  inactiveClassName: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  function handleClick(e: MouseEvent) {
    // Мобильное меню блокирует прокрутку: ждём, пока оно закроется
    const menuWasOpen = document.body.style.overflow === "hidden";
    onNavigate?.();
    if (pathname === href) {
      e.preventDefault();
      const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
      if (menuWasOpen) setTimeout(toTop, 80);
      else toTop();
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : inactiveClassName}`}
    >
      {children}
    </Link>
  );
}
