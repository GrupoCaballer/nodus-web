"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Cursor.module.css";

/**
 * Cursor con punto: un punto pequeño sigue al ratón con un poco de inercia y
 * crece sobre enlaces y botones. Solo con puntero fino y sin reduced-motion;
 * en táctil no se monta.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion() || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");

    const x = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      el.classList.add(styles.visible);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hot = t?.closest("a, button, summary, select, label, [data-cursor]");
      el.classList.toggle(styles.hot, !!hot);
      el.classList.toggle(styles.media, !!t?.closest("figure, video, [data-cursor='media']"));
    };
    const down = () => el.classList.add(styles.down);
    const up = () => el.classList.remove(styles.down);
    const leave = () => el.classList.remove(styles.visible);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div ref={dot} className={styles.dot} aria-hidden />;
}
