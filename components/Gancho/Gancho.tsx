"use client";

import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Gancho.module.css";

/** Gancho tras el hero: habla a quien compra y a quien vende, y los separa en dos caminos. */
export default function Gancho() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className={`container ${styles.root}`} id="gancho">
      <div data-reveal="text">
        <Heading as="h2" size="h1" ignite strong="¿Quieres comprar o vender una propiedad?" muted="Compra, vende o invierte en València." breakMuted />
      </div>
      <p className={styles.lead} data-reveal="text">
        Asesoramiento inmobiliario integral: desde la primera visita hasta la firma. Sin fisuras.
      </p>
      <ul className={styles.paths}>
        <li data-reveal="text">
          <Link href="/comprar" className={styles.path}>
            <span className={styles.pathLabel}>Quiero comprar</span>
            <span className={styles.pathText}>Imagínate viviendo allí. Nosotros buscamos lo que encaja y te acompañamos hasta las llaves.</span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </li>
        <li data-reveal="text">
          <Link href="/vender" className={styles.path}>
            <span className={styles.pathLabel}>Quiero vender</span>
            <span className={styles.pathText}>Imagínate la visita con tu comprador ideal. Nosotros filtramos quién entra y cerramos la venta.</span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
