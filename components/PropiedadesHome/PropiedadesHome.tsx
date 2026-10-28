"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/Propiedades/PropertyCard";
import { useReveal } from "@/components/motion/useReveal";
import { PROPIEDADES } from "@/lib/propiedades";
import styles from "./PropiedadesHome.module.css";

/** Propiedades en la home: las disponibles, para que quien baja se las encuentre. */
export default function PropiedadesHome() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const lista = PROPIEDADES.filter((p) => p.estado !== "vendido");

  return (
    <section ref={root} className={`container ${styles.root}`} id="propiedades">
      <div className={styles.head}>
        <div data-reveal="text">
          <p className={styles.label}>Propiedades</p>
          <Heading strong="Pocas propiedades." muted="Toda la atención en cada una." breakMuted />
        </div>
        <div className={styles.copy}>
          <p data-reveal="text">
            Llevamos pocas propiedades a la vez, a propósito: cada una sale con su web, su vídeo y sus visitas filtradas, y se
            vende antes de captar la siguiente.
          </p>
          <div data-reveal="text">
            <Button href="/propiedades">Ver todas las propiedades</Button>
          </div>
        </div>
      </div>
      <ul className={styles.grid} data-reveal="text">
        {lista.map((p) => (
          <PropertyCard key={p.slug} p={p} />
        ))}
      </ul>
    </section>
  );
}
