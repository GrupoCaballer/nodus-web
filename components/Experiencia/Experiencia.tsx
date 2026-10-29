"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Experiencia.module.css";

// Cómo trabajamos, contado desde la experiencia: entender lo que una persona siente y necesita de verdad.
const PASOS = [
  {
    strong: "Escuchamos antes de buscar.",
    rest: "La primera conversación no va de metros ni de precios. Va de cómo vives, qué te falta y qué te sobra en la propiedad de ahora. Ahí está casi todo lo que necesitamos saber.",
  },
  {
    strong: "Traducimos sensaciones en criterios.",
    rest: "Luz, silencio, el colegio, el metro, un jardín. Convertimos lo que sientes en una lista clara de lo que importa de verdad, y la contrastamos con lo que hay en cada zona.",
  },
  {
    strong: "Avanzamos contigo, paso a paso.",
    rest: "Visitas con sentido, decisiones explicadas y nada que no se haya acordado antes. Cada paso conectado con el siguiente, hasta la firma y las llaves.",
  },
];

/**
 * Cómo trabajamos. En escritorio la sección se fija y el scroll vertical se convierte en un recorrido
 * lateral: titular y tres pasos en fila. En móvil y con reduced-motion, apilado en vertical.
 */
export default function Experiencia() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        const el = track.current;
        if (!el) return;
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.root} id="como-trabajamos">
      <div ref={track} className={styles.track}>
        <div className={styles.head} data-reveal="text">
          <p className={styles.label}>Cómo trabajamos</p>
          <Heading strong="Inmobiliaria," muted="reconectada." breakMuted />
          <p className={styles.lead}>
            Nuestra forma de trabajar nace de la experiencia: de entender lo que una persona siente y necesita de verdad
            cuando tiene una propiedad en mente, y de convertirlo en decisiones claras.
          </p>
        </div>
        <ol className={styles.list}>
          {PASOS.map((s, i) => (
            <li key={s.strong} className={styles.item} data-reveal="text">
              <span className={styles.num}>0{i + 1}</span>
              <p>
                <strong>{s.strong}</strong> <span>{s.rest}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
