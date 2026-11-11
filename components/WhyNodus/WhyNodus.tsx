"use client";

import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import LazyVideo from "@/components/ui/LazyVideo";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./WhyNodus.module.css";

/** 1.3 "Por qué Nodus": etiqueta + titular que se enciende + vídeo aéreo de Valencia con reveal scrub. */
export default function WhyNodus() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-video]",
        { scale: 0.9, y: "8vh", force3D: true },
        {
          scale: 1,
          y: 0,
          force3D: true,
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
        <p className={styles.label}>Dónde trabajamos</p>
        <div>
          <Heading
            ignite
            className={styles.heading}
            strong="Valencia y l'Horta Nord, desde dentro."
            muted="Te contamos cómo se vive en cada zona antes de que la visites."
          />
          <p className={styles.more}>
            <Link href="/zonas" className="link-underline">
              Ver las guías de zona
            </Link>
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.videoWrap} data-video>
          <LazyVideo
            className={styles.video}
            src="/video/valencia-aereo.mp4"
            poster="/video/valencia-aereo.webp"
            aria-label="Vista aérea de Valencia al atardecer"
          />
        </div>
      </div>
    </section>
  );
}
