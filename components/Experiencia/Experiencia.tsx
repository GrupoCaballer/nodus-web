"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
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

/** Cómo trabajamos: nuestra forma de trabajar nace de la experiencia con cada cliente, no de una plantilla. */
export default function Experiencia() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`container ${styles.root}`} id="como-trabajamos">
      <div className={styles.head} data-reveal="text">
        <Heading strong="Inmobiliaria," muted="reconectada." breakMuted />
        <p className={styles.lead}>
          Nuestra forma de trabajar nace de la experiencia: de entender lo que una persona siente y necesita de verdad cuando
          tiene una propiedad en mente, y de convertirlo en decisiones claras.
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
    </section>
  );
}
