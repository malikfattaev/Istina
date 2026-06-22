"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Плавный «люкс» скролл на Lenis. Настроено на плавность, но без тягучей
 * инерции: высокий lerp = скролл быстро догоняет колесо и мгновенно
 * откликается. Тач на мобильных остаётся нативным.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // root-режим не добавляет обёртку в DOM -> разметка одинакова при любом
  // значении reduceMotion, гидрация не ломается.
  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12, // отклик: больше = быстрее догоняет (плавно, но не вяло)
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false, // тач остаётся нативным
      }}
    >
      {children}
    </ReactLenis>
  );
}
