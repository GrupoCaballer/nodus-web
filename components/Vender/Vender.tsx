"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Vender.module.css";

/** 1.6 "Vende con Nodus": foto vertical con parallax, titular grande, foto apaisada con reveal, párrafo mitad gris. */
export default function Vender() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-parallax]",
        { y: "10vh" },
        { y: "-10vh", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`container ${styles.root}`} id="vender">
      <div className={styles.small} data-parallax>
        <figure className={styles.smallFig} data-reveal="image">
          <Image src="/fotos/vender-fachada.webp" alt="Edificio señorial entre árboles en Valencia" fill sizes="(max-width: 768px) 60vw, 24vw" className={styles.img} />
        </figure>
      </div>

      <div className={styles.title} data-reveal="text">
        <Heading strong="No vendas solo tu casa." muted="Véndela bien." breakMuted />
      </div>

      <figure className={styles.big} data-reveal="image">
        <Image src="/fotos/vender-aereo.webp" alt="Vista aérea del Palau de les Arts y la ciudad de Valencia" fill sizes="(max-width: 768px) 100vw, 66vw" className={styles.img} />
      </figure>

      <div className={styles.copy}>
        <p data-reveal="text">
          Cada vivienda sale al mercado con una web con esencia propia, vídeo profesional (con dron en chalets), difusión en
          Instagram y home staging.{" "}
          <span>
            Llevamos pocas viviendas a la vez, así que la tuya no será una más en un listado. Filtramos las visitas para que solo
            entren compradores con capacidad real y te acompañamos hasta la notaría. Sin exclusiva clásica: dos meses de
            prueba, y si vendes a un comprador tuyo, no pagas.
          </span>
        </p>
        <div data-reveal="text">
          <Button href="/vender#contacto">Quiero vender</Button>
        </div>
      </div>
    </section>
  );
}
