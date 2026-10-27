"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Steps.module.css";

// Textos del brief (compra) y de la web antigua (venta), resumidos a tres pasos cada uno.
const COMPRA = [
  { strong: "Habla con una persona.", rest: "Te asignamos un asesor que escucha, no un formulario." },
  { strong: "Gana claridad.", rest: "Definimos lo que necesitas, no solo lo que hay disponible." },
  { strong: "Avanza.", rest: "Encontramos lo que encaja y lo hacemos realidad." },
];

const VENTA = [
  { strong: "Valoramos con criterio.", rest: "Visita, comparables y una propuesta de precio con sus límites, explicada." },
  { strong: "Presentamos y filtramos.", rest: "Web propia, vídeo, home staging. Solo entran compradores con capacidad real." },
  { strong: "Cerramos.", rest: "Ofertas con condiciones y plazos, negociación y notaría hasta la entrega de llaves." },
];

/** Cómo trabajamos, a dos caras: la experiencia de quien compra y la de quien vende. */
export default function Steps() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`container ${styles.root}`} id="como-trabajamos">
      <div className={styles.head} data-reveal="text">
        <Heading strong="Inmobiliaria," muted="reconectada." breakMuted />
        <p className={styles.lead}>
          Dos experiencias distintas, una misma manera de trabajar: una persona que escucha, pasos claros y nada que no se haya
          acordado antes.
        </p>
      </div>

      <div className={styles.cols}>
        <div className={styles.col}>
          <p className={styles.label} data-reveal="text">
            Si compras
          </p>
          <ol className={styles.list}>
            {COMPRA.map((s, i) => (
              <li key={s.strong} className={styles.item} data-reveal="text">
                <span className={styles.num}>0{i + 1}</span>
                <p>
                  <strong>{s.strong}</strong> <span>{s.rest}</span>
                </p>
              </li>
            ))}
          </ol>
          <div data-reveal="text" className={styles.action}>
            <Button href="/comprar">Empezar a buscar</Button>
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.label} data-reveal="text">
            Si vendes
          </p>
          <ol className={styles.list}>
            {VENTA.map((s, i) => (
              <li key={s.strong} className={styles.item} data-reveal="text">
                <span className={styles.num}>0{i + 1}</span>
                <p>
                  <strong>{s.strong}</strong> <span>{s.rest}</span>
                </p>
              </li>
            ))}
          </ol>
          <div data-reveal="text" className={styles.action}>
            <Button href="/vender">Hablemos de la venta</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
