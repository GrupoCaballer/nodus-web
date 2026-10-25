"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Steps.module.css";

const STEPS = [
  { strong: "Habla con una persona.", rest: "Te asignamos un asesor que escucha, no un formulario." },
  { strong: "Gana claridad.", rest: "Definimos lo que necesitas, no solo lo que hay disponible." },
  { strong: "Avanza.", rest: "Encontramos lo que encaja y lo hacemos realidad." },
];

/** 1.5 "Inmobiliaria, reconectada": titular + botón a la izquierda, tres pasos numerados a la derecha. */
export default function Steps() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`container ${styles.root}`}>
      <div className={styles.left}>
        <div data-reveal="text">
          <Heading strong="Inmobiliaria," muted="reconectada." breakMuted />
        </div>
        <div data-reveal="text" className={styles.action}>
          <Button href="/propiedades">Empezar a buscar</Button>
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.label} data-reveal="text">
          Pasos:
        </p>
        <ol className={styles.list}>
          {STEPS.map((s, i) => (
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
