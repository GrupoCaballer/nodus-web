"use client";

import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import LazyVideo from "@/components/ui/LazyVideo";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./WhyNodus.module.css";

/** 1.3 "Por qué Nodus": etiqueta + titular que se enciende + vídeo aéreo de València con reveal scrub. */
export default function WhyNodus() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-video]",
        { scale: 0.9, y: "8vh" },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: "[data-video]", start: "top 95%", end: "top 35%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.root} id="por-que-nodus">
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>Cómo trabajamos</p>
        <Heading
          ignite
          className={styles.heading}
          strong="Tu vida cambia. No busques solo una casa: busca lo que viene después."
          muted="Te ayudamos a avanzar con claridad, con criterio y con un asesor a tu lado."
        />
      </div>

      <div className="container">
        <div className={styles.videoWrap} data-video>
          <LazyVideo
            className={styles.video}
            src="/video/valencia-aereo.mp4"
            poster="/video/valencia-aereo.webp"
            aria-label="Vista aérea de València al atardecer"
          />
        </div>
      </div>
    </section>
  );
}
