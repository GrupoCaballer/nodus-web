"use client";

import { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Reveals transversales:
 *  [data-reveal="image"] → clip-path inset(0 0 100% 0) → inset(0) + scale 1.1 → 1
 *  [data-reveal="text"]  → y 24, opacity 0, stagger 0.06
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      root.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        const media = el.querySelector("img, video");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        tl.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out" },
        );
        if (media) {
          tl.fromTo(media, { scale: 1.1 }, { scale: 1, duration: 1.2, ease: "power3.out" }, 0);
        }
      });

      const texts = gsap.utils.toArray<HTMLElement>('[data-reveal="text"]', root);
      if (texts.length) {
        gsap.from(texts, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      }
    },
    { scope: ref },
  );
}
