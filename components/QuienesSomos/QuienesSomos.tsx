"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./QuienesSomos.module.css";

// Textos de la web antigua. Las cifras las pone Nodus (TODO-DATO).
const STATS = [
  { dato: "TODO-DATO", texto: "operaciones cerradas" },
  { dato: "TODO-DATO", texto: "años en València y l'Horta Nord" },
  { dato: "2 semanas", texto: "en las que cada anuncio recibe la mayor parte de sus visitas" },
  { dato: "0 €", texto: "si vendes a un comprador propio" },
];

const VALORES = [
  { titulo: "Integridad", texto: "Decimos lo que pensamos, aunque no sea lo que el cliente quiere escuchar." },
  { titulo: "Rigor", texto: "Cada operación recibe el mismo nivel de atención, independientemente de su valor." },
  { titulo: "Cercanía", texto: "Somos accesibles, directos y humanos. Detrás de cada operación hay una persona." },
  { titulo: "Eficiencia", texto: "Respetamos el tiempo de nuestros clientes. Sin burocracia innecesaria." },
];

/** Quiénes somos: por qué estamos aquí, cifras y valores. Texto de la web antigua. */
export default function QuienesSomos() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className={styles.root} id="quienes-somos">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={styles.label} data-reveal="text">
            Quiénes somos
          </p>
          <div data-reveal="text">
            <Heading tone="dark" strong="No somos la agencia más grande." muted="Somos la más fiable." breakMuted />
          </div>
        </div>

        <div className={styles.grid}>
          <figure className={styles.fig} data-reveal="image">
            <Image src="/fotos/testimonios-terraza.webp" alt="Terrazas de cafeterías en una calle de València" fill sizes="(max-width: 768px) 100vw, 40vw" className={styles.img} />
          </figure>
          <div className={styles.text}>
            <p data-reveal="text">
              Nodus nace de una convicción: el sector inmobiliario merece un servicio sin fisuras, donde cada parte del proceso
              esté conectada con la siguiente.
            </p>
            <p data-reveal="text">
              Una operación inmobiliaria raramente es solo una transacción. Es una mudanza, una inversión, un cambio de etapa.
              Nuestro trabajo empieza donde empieza esa complejidad.
            </p>
            <p className={styles.claim} data-reveal="text">
              Ser la primera llamada. No la última opción.
            </p>
          </div>
        </div>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.texto} data-reveal="text">
              <strong>{s.dato}</strong>
              <span>{s.texto}</span>
            </li>
          ))}
        </ul>

        <ul className={styles.valores}>
          {VALORES.map((v) => (
            <li key={v.titulo} data-reveal="text">
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
