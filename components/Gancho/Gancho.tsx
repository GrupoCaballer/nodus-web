"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Gancho.module.css";

/** Gancho tras el hero: habla a cualquiera que tenga una propiedad en mente, sin separar aún a quien compra de quien vende. */
export default function Gancho() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className={`container ${styles.root}`} id="gancho">
      <div className={styles.text}>
      <div data-reveal="text">
        <Heading as="h2" size="h1" ignite strong="Imagínate ya en el siguiente paso." muted="Del camino nos ocupamos nosotros." breakMuted />
      </div>
      <p className={styles.lead} data-reveal="text">
        Una propiedad raramente es solo una transacción. Es una mudanza, una inversión, un cambio de etapa. Nodus es el punto
        donde todo eso converge: una persona que escucha lo que necesitas de verdad y un equipo que conecta cada paso hasta la
        firma. Sin fisuras.
      </p>
      <div className={styles.cta} data-reveal="text">
        <Button href="/contacto">Cuéntanos tu caso</Button>
      </div>
      </div>
      <figure className={styles.fig} data-reveal="image">
        <Image
          src="/fotos/chevron-arco.webp"
          alt="Gente paseando bajo un arco de piedra en Valencia"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className={styles.img}
        />
      </figure>
    </section>
  );
}
