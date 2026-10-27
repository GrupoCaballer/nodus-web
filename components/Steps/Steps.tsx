"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Steps.module.css";

// Textos de la web antigua (venta) y del brief (compra), ampliados con los servicios de docs/contexto/nodus.md.
const VENTA = [
  {
    strong: "Valoramos con criterio.",
    rest: "Visitamos tu propiedad, estudiamos las comparables de tu zona y te explicamos qué sostiene el precio propuesto y qué puede condicionar la negociación.",
  },
  {
    strong: "Presentamos y filtramos.",
    rest: "Web con esencia propia, vídeo profesional, home staging y difusión en Instagram y portales. A las visitas solo entran compradores con capacidad real.",
  },
  {
    strong: "Cerramos.",
    rest: "Te presentamos cada oferta con sus condiciones y plazos, negociamos contigo y coordinamos la notaría hasta la firma y la entrega de llaves.",
  },
];

const COMPRA = [
  {
    strong: "Habla con una persona.",
    rest: "Te asignamos un asesor que escucha tu situación, tus plazos y lo que viene después. No un formulario.",
  },
  {
    strong: "Gana claridad.",
    rest: "Definimos lo que necesitas, no solo lo que hay disponible, y estudiamos la hipoteca antes de la primera visita.",
  },
  {
    strong: "Avanza.",
    rest: "Encontramos lo que encaja, lo visitamos contigo, negociamos y te acompañamos hasta las llaves. Si hace falta reforma, con renders y presupuesto.",
  },
];

/** Por qué elegirnos, a dos caras: primero quien vende, después quien compra. */
export default function Steps() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const lado = (label: string, pasos: typeof VENTA, href: string, cta: string) => (
    <div className={styles.col}>
      <p className={styles.label} data-reveal="text">
        {label}
      </p>
      <ol className={styles.list}>
        {pasos.map((s, i) => (
          <li key={s.strong} className={styles.item} data-reveal="text">
            <span className={styles.num}>0{i + 1}</span>
            <p>
              <strong>{s.strong}</strong> <span>{s.rest}</span>
            </p>
          </li>
        ))}
      </ol>
      <div data-reveal="text" className={styles.action}>
        <Button href={href}>{cta}</Button>
      </div>
    </div>
  );

  return (
    <section ref={root} className={`container ${styles.root}`} id="por-que-elegirnos">
      <div className={styles.head} data-reveal="text">
        <p className={styles.label}>Por qué elegirnos</p>
        <Heading strong="Si vendes, si compras." muted="Un equipo para cada camino." breakMuted />
        <p className={styles.lead}>
          Tres pasos si vendes, tres si compras. Una persona que escucha, un plan acordado antes de empezar y cada paso
          conectado con el siguiente. Así es como la intermediación vuelve a ser un trabajo limpio.
        </p>
      </div>

      <div className={styles.cols}>
        {lado("Si vendes", VENTA, "/vender", "Hablemos de la venta")}
        {lado("Si compras", COMPRA, "/comprar", "Empezar a buscar")}
      </div>
    </section>
  );
}
