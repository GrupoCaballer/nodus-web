"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Chevrons.module.css";

const IMAGES = [
  { src: "/fotos/chevron-calle.webp", alt: "Calle del centro histórico de València con luz de tarde" },
  { src: "/fotos/chevron-arco.webp", alt: "Gente paseando bajo un arco de piedra en el Carme, València" },
  { src: "/fotos/chevron-banco.webp", alt: "Pareja sentada en un banco de una calle tranquila de València" },
  { src: "/fotos/chevron-modernista.webp", alt: "Fachada modernista con palmeras en València" },
];

/** 1.4 "Esto no va solo de inmuebles": cuatro imágenes recortadas en chevron que entran escalonadas. */
export default function Chevrons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-chevron]", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-row]", start: "top 80%", once: true },
      });
      gsap.from("[data-text]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`container ${styles.root}`}>
      <div data-text>
        <Heading
          className={styles.heading}
          strong="Esto no va solo de inmuebles."
          muted="Va de identidad. De avanzar. De desatascarse."
        />
      </div>

      <ul className={styles.row} data-row>
        {IMAGES.map((img, i) => (
          <li key={img.src} className={styles.chevron} data-chevron style={{ zIndex: IMAGES.length - i }}>
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className={styles.img} />
          </li>
        ))}
      </ul>

      <p className={styles.text} data-text>
        No buscas solo un lugar: buscas que todo encaje. <span>Eso es lo que te ayudamos a encontrar.</span>
      </p>
    </section>
  );
}
