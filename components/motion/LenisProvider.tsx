"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Scroll suave desactivado (3-11-2026): con Lenis el scroll iba "pillado" en los equipos del equipo.
    // El scroll nativo del navegador es el más fluido; las animaciones de GSAP siguen funcionando con él.
    // Para volver a activarlo, poner SMOOTH_SCROLL = true.
    const SMOOTH_SCROLL = false;
    if (!SMOOTH_SCROLL || prefersReducedMotion()) return;

    // lerp más alto = scroll más directo, menos sensación de arrastre (3-11-2026, antes 0.1)
    const instance = new Lenis({ lerp: 0.16, smoothWheel: true, wheelMultiplier: 1 });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    // Acceso para pruebas automatizadas (Playwright): window.__lenis.scrollTo(y, { immediate: true })
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
