"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./QuienesSomos.module.css";

// Textos de la web antigua. Las cifras las pone Nodus (TODO-DATO).
const STATS = [
  { dato: "TODO-DATO", texto: "operaciones cerradas" },
  { dato: "TODO-DATO", texto: "años en Valencia y l'Horta Nord" },
  { dato: "2 semanas", texto: "en las que cada anuncio recibe la mayor parte de sus visitas" },
  { dato: "TODO-DATO", texto: "propiedades vendidas en los últimos doce meses" },
];

/** Quiénes somos: por qué estamos aquí y cuatro cifras. Texto de la web antigua; los valores completos viven en /nosotros. */
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
            <Image src="/fotos/testimonios-terraza.webp" alt="Terrazas de cafeterías en una calle de Valencia" fill sizes="(max-width: 768px) 100vw, 40vw" className={styles.img} />
          </figure>
          <div className={styles.text}>
            <p data-reveal="text">
              Somos un equipo joven y vanguardista de Valencia. Sin miedo a hacer las cosas de otra manera y con dominio de las
              nuevas tecnologías: una web con esencia propia para cada vivienda, vídeo, renders y datos reales en cada decisión.
            </p>
            <p data-reveal="text">
              Una operación inmobiliaria raramente es solo una transacción. Es una mudanza, una inversión, un cambio de etapa.
              Nuestro trabajo empieza donde empieza esa complejidad.
            </p>
            <p className={styles.claim} data-reveal="text">
              Ser la primera llamada. No la última opción.
            </p>
            <p data-reveal="text">
              <Link href="/nosotros" className="link-underline">
                Conocer al equipo
              </Link>
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
      </div>
    </section>
  );
}
