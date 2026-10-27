"use client";

import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Gancho.module.css";

/** Gancho tras el hero: primero a quien vende (prioridad de Nodus), después a quien compra. */
export default function Gancho() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className={`container ${styles.root}`} id="gancho">
      <div data-reveal="text">
        <Heading as="h2" size="h1" ignite strong="¿Vendes o compras?" muted="Aquí os encontráis los dos." breakMuted />
      </div>
      <p className={styles.lead} data-reveal="text">
        Asesoramiento inmobiliario integral, desde la primera visita hasta la firma. Sin fisuras: cada paso, conectado con el
        siguiente, y una persona al otro lado del teléfono que sabe en qué punto está tu operación.
      </p>
      <ul className={styles.paths}>
        <li data-reveal="text">
          <Link href="/vender" className={styles.path}>
            <span className={styles.pathLabel}>Quiero vender</span>
            <span className={styles.pathText}>
              Imagínate la visita con tu comprador ideal. Valoramos tu casa con criterio, la presentamos con una web con esencia
              propia y filtramos quién entra. Tú decides; nosotros cerramos.
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </li>
        <li data-reveal="text">
          <Link href="/comprar" className={styles.path}>
            <span className={styles.pathLabel}>Quiero comprar</span>
            <span className={styles.pathText}>
              Imagínate viviendo allí. Escuchamos lo que necesitas, buscamos lo que encaja de verdad y te acompañamos hasta las
              llaves, con la hipoteca estudiada antes de la primera visita.
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
