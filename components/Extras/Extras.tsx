"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./Extras.module.css";

const CARDS = [
  { title: "Reforma y renders", href: "/nosotros#reforma", img: "/fotos/extra-reforma.webp", alt: "Arquitectura contemporánea de líneas geométricas en València" },
  { title: "Financiación", href: "/nosotros#financiacion", img: "/fotos/extra-financiacion.webp", alt: "Edificio histórico de fachada ornamentada en València" },
  { title: "Inversión", href: "/nosotros#inversion", img: "/fotos/extra-inversion.webp", alt: "Plaza del Ayuntamiento de València con gente paseando" },
];

/** 1.9 "Mucho más que comprar y vender": titular + párrafo y tres tarjetas-foto apaisadas con el título encima. */
export default function Extras() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`container ${styles.root}`}>
      <div className={styles.head}>
        <div data-reveal="text">
          <p className={styles.label}>Por qué elegirnos</p>
          <Heading tone="dark" strong="Mucho más que" muted="comprar y vender." breakMuted />
        </div>
        <div className={styles.copy}>
          <p data-reveal="text">
            Reforma con renders y presupuesto de obra, broker hipotecario y operaciones de inversión para fondos y family offices:
            dossier, LOI y due diligence.
          </p>
          <div data-reveal="text">
            <Button href="/nosotros" tone="light">
              Descubrir servicios
            </Button>
          </div>
        </div>
      </div>

      <ul className={styles.cards}>
        {CARDS.map((c) => (
          <li key={c.title} className={styles.card} data-reveal="image">
            <Link href={c.href} className={styles.cardLink}>
              <Image src={c.img} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.img} />
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <span className={styles.more}>
                <span className="visually-hidden">{c.title}: </span>Saber más
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
