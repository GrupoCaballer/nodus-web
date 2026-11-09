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
        <Heading as="h2" size="h1" ignite strong="Expertos en experiencias inmobiliarias." muted="Imaginar tu vida en otro lugar o despedirte del tuyo, bien acompañado." breakMuted />
      </div>
      <p className={styles.lead} data-reveal="text">
        Si compras, te contamos cómo se vive en cada zona hasta que te ves allí. Si vendes, tienes a una persona a tu
        lado en cada paso: un plan por escrito, visitas filtradas y acompañamiento hasta la notaría.
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
