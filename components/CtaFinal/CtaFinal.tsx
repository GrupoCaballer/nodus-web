"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./CtaFinal.module.css";

/** 1.11 CTA final: foto a sangre oscurecida, titular blanco mitad gris que se enciende, botón blanco. */
export default function CtaFinal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-bg]",
        { y: "-12%" },
        { y: "12%", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.root}>
      <div className={styles.bg} data-bg>
        <Image src="/fotos/cta-playa.webp" alt="" fill sizes="100vw" className={styles.img} />
      </div>
      <div className={`container ${styles.content}`}>
        <Heading as="h2" size="h1" tone="dark" ignite className={styles.heading} strong="Encuentra tu sitio." muted="Te acompañamos hasta la firma." breakMuted />
        <Button href="/contacto" tone="light">
          Hablemos
        </Button>
      </div>
    </section>
  );
}
