"use client";

import { RefObject } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Las palabras en gris de un titular "mitad gris" pasan a tinta plena
 * una a una según avanza el scroll (scrub). Marca las partes apagadas
 * con [data-muted]; ver components/ui/Heading.
 */
export function useIgnite(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const muted = el.querySelectorAll<HTMLElement>("[data-muted]");
      if (!muted.length) return;

      const split = SplitText.create(muted, { type: "words" });
      gsap.set(muted, { opacity: 1 });
      gsap.fromTo(
        split.words,
        { opacity: "var(--mute-o, 0.5)" },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );
}
