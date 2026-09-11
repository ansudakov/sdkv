"use client";

export function FooterMark() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх страницы"
      className="footer-mark group block w-full text-center font-display text-[28vw] font-bold leading-none tracking-tight sm:text-[15vw]"
    >
      <span className="logo-shake-1 inline-block">S</span>
      <span className="logo-shake-2 inline-block">D</span>
      <span className="logo-shake-3 inline-block">K</span>
      <span className="logo-shake-2 inline-block">V</span>
    </button>
  );
}
