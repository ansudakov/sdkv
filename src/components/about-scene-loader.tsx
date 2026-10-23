"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const AboutScene = dynamic(() => import("@/components/about-scene"), { ssr: false });

// Фигура в 3D занимает ~94% высоты холста и стоит чуть ниже центра (замер по скриншотам,
// камера и рост заданы в about-scene.tsx). Заставка повторяет это, чтобы кадр не прыгал при смене.
function ScenePoster() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-0 top-[4.7%] h-[94.1%]">
        <Image
          src="/photos/me-cutout.png"
          alt="Александр Судаков"
          fill
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const subscribe = () => () => {};
const getMode = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches && canUseWebGL() ? "3d" : "poster";
const getServerMode = () => "poster";

export function AboutSceneLoader() {
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode);
  const [ready, setReady] = useState(false);

  return (
    <div className="min-w-0">
      {/* На телефоне холст уже экрана: по бокам остаются поля, где палец прокручивает страницу. */}
      <div className="relative mx-auto h-[340px] w-3/5 overflow-hidden sm:h-[440px] md:w-full lg:h-[520px]">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            mode === "3d" && ready ? "opacity-0" : "opacity-100"
          }`}
        >
          <ScenePoster />
        </div>
        {mode === "3d" && (
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <AboutScene onReady={() => setReady(true)} />
          </div>
        )}
      </div>
      <p
        className={`mt-2 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted ${
          mode === "3d" ? "" : "invisible"
        }`}
      >
        <RotateIcon />
        Можно крутить
      </p>
    </div>
  );
}

function RotateIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4" />
      <path d="M12 16 9.5 13.5M12 16l-2.5 2.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
