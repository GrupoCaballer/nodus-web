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
    word: "Vender",
    href: "/vender",
    text: "Visitamos tu propiedad, estudiamos las comparables de tu zona y te explicamos qué sostiene el precio. La presentamos con una web con esencia propia, vídeo profesional y home staging, filtramos las visitas y negociamos contigo cada oferta hasta la notaría.",
    img: "/fotos/servicio-vender.webp",
    alt: "Fachada modernista con palmeras en Valencia",
  },
  {
    word: "Comprar",
    href: "/comprar",
    text: "Un asesor que escucha tu situación y tus plazos, no un formulario. Definimos lo que necesitas, estudiamos la hipoteca antes de la primera visita y te acompañamos hasta las llaves. Si hace falta reforma, llegas con los renders y el presupuesto hechos.",
    img: "/fotos/servicio-comprar.webp",
    alt: "Edificios y arbolado de un barrio residencial de Valencia",
  },
  {
    word: "Alquilar",
    href: "/alquilar",
    text: "Preparamos tu propiedad, seleccionamos inquilinos con solvencia y convivencia en mente y gestionamos el día a día: cobros, incidencias y mantenimiento. Un servicio completo en Valencia, desde la primera habitación hasta el seguimiento mensual.",
    img: "/fotos/servicio-alquilar.webp",
    alt: "Paseo marítimo con palmeras en Valencia",
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
        <p className={styles.label}>Por qué elegirnos</p>
        <Heading tone="dark" strong="Un equipo para cada camino." muted="Vendas, compres o alquiles." breakMuted />
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
          Y lo que va más allá: <span>reforma con renders, financiación y operaciones off market.</span>
        </p>
        <Button href="/servicios" tone="light">
          Ver todos los servicios
        </Button>
      </div>
    </section>
  );
}
