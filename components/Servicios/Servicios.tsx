"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Servicios.module.css";

const ROWS = [
  {
    word: "Comprar",
    href: "/propiedades",
    text: "Un asesor que escucha antes de enseñar. Si la vivienda necesita obra, Hugo la dibuja con renders y presupuesto cerrado antes de que firmes. Y un broker financiero para llegar con la hipoteca estudiada.",
    img: "/fotos/servicio-comprar.webp",
    alt: "Edificios y arbolado de un barrio residencial de València",
  },
  {
    word: "Vender",
    href: "/vender",
    text: "Una web con esencia propia para tu vivienda, vídeo profesional, difusión en Instagram y home staging. Visitas filtradas y acompañamiento hasta la notaría.",
    img: "/fotos/servicio-vender.webp",
    alt: "Fachada modernista con palmeras en València",
  },
  {
    word: "Alquilar",
    href: "/alquilar",
    text: "Gestión integral del alquiler por habitaciones: puesta en marcha, comercialización y gestión total. Tres planes con precio claro que puedes contratar por separado o combinar.",
    img: "/fotos/servicio-alquilar.webp",
    alt: "Paseo marítimo con palmeras en València",
  },
];

/** 1.8 "Cómo te ayuda Nodus": tres filas negras a ancho completo; al pasar el ratón la fila se abre y aparece la foto tras la palabra. */
export default function Servicios() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top 95%", end: "top 70%", scrub: true },
        });
      });
    },
    { scope: root },
  );

  const follow = (e: React.MouseEvent<HTMLElement>) => {
    const row = e.currentTarget;
    const r = row.getBoundingClientRect();
    row.style.setProperty("--mx", `${e.clientX - r.left}px`);
    row.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} className={styles.root} id="servicios">
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>Servicios</p>
        <Heading tone="dark" strong="Cómo te ayuda" muted="Nodus" breakMuted />
      </div>

      <ol className={styles.rows}>
        {ROWS.map((r, i) => (
          <li key={r.word} className={styles.row} data-row onMouseMove={follow}>
            <Link href={r.href} className={styles.link}>
              <span className={styles.num}>{i + 1}</span>
              <p className={styles.text}>{r.text}</p>
              <span className={styles.wordWrap}>
                <span className={styles.photo} aria-hidden>
                  <Image src={r.img} alt="" fill sizes="40vw" className={styles.img} />
                </span>
                <span className={styles.word}>{r.word}</span>
              </span>
              <span className={styles.cursor} aria-hidden>
                ver
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className={`container ${styles.foot}`}>
        <p>
          Cada operación la lleva una persona, de principio a fin. <span>Sin intermediarios innecesarios, sin promesas vacías.</span>
        </p>
        <Button href="/contacto" tone="light">
          Empezar con Nodus
        </Button>
      </div>
    </section>
  );
}
