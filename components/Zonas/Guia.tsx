"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import PropertyCard from "@/components/Propiedades/PropertyCard";
import { useReveal } from "@/components/motion/useReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { PROPIEDADES } from "@/lib/propiedades";
import type { Guia as GuiaT } from "@/lib/zonas";
import styles from "./Guia.module.css";

function Section({ children, className, id, label }: { children: React.ReactNode; className?: string; id?: string; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className} aria-label={label}>
      {children}
    </section>
  );
}

/** Guía de zona: plantilla de las guías actuales de Nodus, ampliada con inmuebles en la zona. */
export default function Guia({ g }: { g: GuiaT }) {
  const hero = useRef<HTMLElement>(null);
  const inmuebles = PROPIEDADES.filter((p) => p.zona === g.slug && p.estado !== "vendido");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-hero-img]",
        { y: "-8%" },
        { y: "8%", ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true } },
      );
    },
    { scope: hero },
  );

  return (
    <article className={styles.root}>
      {/* Hero con foto a sangre */}
      <section ref={hero} className={styles.hero} data-header-over>
        <div className={styles.heroImg} data-hero-img>
          <Image src={g.foto.src} alt={g.foto.alt} fill priority sizes="100vw" className={styles.cover} />
        </div>
        <div className={`container ${styles.heroText}`}>
          <nav className={styles.crumbs} aria-label="Migas de pan">
            <Link href="/zonas">Zonas</Link>
            <span aria-hidden> / </span>
            <span>{g.eyebrow}</span>
          </nav>
          <h1 className={styles.h1}>
            {g.titulo[0]} <span>{g.titulo[1]}</span>
          </h1>
          <p className={styles.lead}>{g.intro}</p>
          <div className={styles.heroActions}>
            <Button href="#contacto" tone="light">
              Propiedades off market
            </Button>
            <Link href="#contacto" className={styles.heroLink}>
              Contactar
            </Link>
          </div>
          {g.foto.credito && <p className={styles.credit}>{g.foto.credito}</p>}
        </div>
      </section>

      {/* La zona + datos */}
      <Section className={`container ${styles.zona}`}>
        <div data-reveal="text">
          <p className={styles.label}>{g.zona.label}</p>
          <Heading strong={g.zona.titulo[0]} muted={g.zona.titulo[1]} breakMuted />
        </div>
        <div className={styles.zonaText}>
          {g.zona.parrafos.map((p) => (
            <p key={p.slice(0, 30)} data-reveal="text">
              {p}
            </p>
          ))}
          <dl className={styles.datos} data-reveal="text">
            {g.datos.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Estilo de vida */}
      <Section className={`container ${styles.estilo}`}>
        <p className={styles.label} data-reveal="text">
          Estilo de vida
        </p>
        <ul className={styles.estiloList}>
          {g.estilo.map((e) => (
            <li key={e.titulo} data-reveal="text">
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Qué ofrece la zona */}
      <Section className={styles.ofrece}>
        <div className="container">
          <div data-reveal="text">
            <p className={styles.labelDark}>Qué ofrece la zona</p>
            <Heading tone="dark" strong={g.ofrece.titulo[0]} muted={g.ofrece.titulo[1]} breakMuted />
          </div>
          <ul className={styles.ofreceList}>
            {g.ofrece.items.map((it) => (
              <li key={it.titulo} data-reveal="text">
                <p className={styles.ofreceSub}>{it.sub}</p>
                <h3>{it.titulo}</h3>
                <p>{it.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Distancias */}
      <Section className={`container ${styles.distancias}`}>
        <div data-reveal="text">
          <p className={styles.label}>Distancias</p>
          <Heading strong={g.distancias.titulo[0]} muted={g.distancias.titulo[1]} breakMuted />
          <p className={styles.distText}>{g.distancias.texto}</p>
        </div>
        <ul className={styles.distList}>
          {g.distancias.items.map((d) => (
            <li key={d.lugar} data-reveal="text">
              <span>{d.lugar}</span>
              <strong>{d.tiempo}</strong>
            </li>
          ))}
        </ul>
      </Section>

      {/* Patrimonio y entorno */}
      <Section className={`container ${styles.patrimonio}`}>
        <div data-reveal="text">
          <p className={styles.label}>Patrimonio y entorno</p>
          <Heading strong={g.patrimonio.titulo[0]} muted={g.patrimonio.titulo[1]} breakMuted />
        </div>
        <div className={styles.patrimonioText}>
          {g.patrimonio.parrafos.map((p) => (
            <p key={p.slice(0, 30)} data-reveal="text">
              {p}
            </p>
          ))}
          <ul className={styles.patrimonioList}>
            {g.patrimonio.items.map((it) => (
              <li key={it.titulo} data-reveal="text">
                <h3>{it.titulo}</h3>
                <p>{it.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Inmuebles en la zona */}
      {inmuebles.length > 0 && (
        <Section className={`container ${styles.inmuebles}`}>
          <div className={styles.inmueblesHead} data-reveal="text">
            <Heading strong={`Inmuebles en ${g.nombre}.`} muted="Pocos, y bien llevados." breakMuted />
            <Button href="/propiedades">Ver todas las propiedades</Button>
          </div>
          <ul className={styles.inmueblesList} data-reveal="text">
            {inmuebles.map((p) => (
              <PropertyCard key={p.slug} p={p} compact />
            ))}
          </ul>
        </Section>
      )}

      {/* Nodus en la zona */}
      <Section className={styles.nodus}>
        <div className="container">
          <div className={styles.nodusHead}>
            <div data-reveal="text">
              <p className={styles.labelDark}>Nodus Real Estate en {g.nombre}</p>
              <Heading tone="dark" strong={g.nodus.titulo[0]} muted={g.nodus.titulo[1]} breakMuted />
            </div>
            <div className={styles.nodusText}>
              {g.nodus.parrafos.map((p) => (
                <p key={p.slice(0, 30)} data-reveal="text">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ul className={styles.nodusList}>
            {g.nodus.servicios.map((s) => (
              <li key={s.titulo} data-reveal="text">
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <Heading strong={`¿Buscas en ${g.nombre}`} muted="o quieres vender la tuya?" breakMuted />
          </div>
          <p data-reveal="text">Cuéntanos qué necesitas. Te acompañamos en cada paso, sin compromisos en el primer contacto.</p>
        </div>
        <div data-reveal="text">
          <ContactForm origen={`Zona · ${g.nombre}`} conVivienda cta="Hablar con Nodus" />
        </div>
      </Section>
    </article>
  );
}
