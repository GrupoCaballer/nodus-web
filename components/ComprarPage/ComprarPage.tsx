"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import Testimonios from "@/components/Testimonios/Testimonios";
import PropertyCard from "@/components/Propiedades/PropertyCard";
import { useReveal } from "@/components/motion/useReveal";
import { PROPIEDADES } from "@/lib/propiedades";
import { GUIAS } from "@/lib/zonas";
import comprar from "@/content/comprar.json";
import styles from "@/components/VenderPage/VenderPage.module.css";

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** /comprar — espejo de /vender para quien busca vivienda (docs/interiores.md §6). */
export default function ComprarPage() {
  const destacadas = PROPIEDADES.filter((p) => p.estado !== "vendido" && p.operacion === "venta").slice(0, 3);

  return (
    <>
      <Section className={`container ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-reveal="text">
            Comprar propiedad · Valencia y área metropolitana
          </p>
          <h1 className={styles.h1} data-reveal="text">
            Encuentra lo que encaja. <span>Con alguien al lado.</span>
          </h1>
          <p className={styles.lead} data-reveal="text">
            Asesoramiento inmobiliario integral, desde la primera visita hasta la firma. Sin fisuras: una persona que escucha lo
            que necesitas, busca lo que encaja de verdad y te acompaña hasta las llaves.
          </p>
          <ul className={styles.promesas}>
            {comprar.promesas.map((p) => (
              <li key={p} data-reveal="text">
                {p}
              </li>
            ))}
          </ul>
          <div data-reveal="text">
            <Button href="#contacto">Empezar a buscar</Button>
          </div>
        </div>
        <figure className={styles.heroFig} data-reveal="image">
          <Image
            src="/fotos/chevron-calle.webp"
            alt="Calle del centro histórico de Valencia con luz de tarde"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className={styles.cover}
          />
        </figure>
      </Section>

      <Section className={`container ${styles.pasos}`}>
        <div data-reveal="text">
          <p className={styles.label}>Cómo funciona</p>
          <Heading strong="Tres pasos." muted="Una persona al lado." />
        </div>
        <ol className={styles.pasosList}>
          {comprar.pasos.map((p, i) => (
            <li key={p.titulo} className={styles.paso} data-reveal="text">
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <p>
                <strong>{p.titulo}</strong> <span>{p.texto}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className={`container ${styles.barrio}`}>
        <div data-reveal="text">
          <p className={styles.label}>Dónde buscar</p>
          <Heading strong="El barrio importa." muted="Lo que viene después, también." breakMuted />
        </div>
        <div className={styles.barrioText}>
          <p data-reveal="text">
            Un piso en Benimaclet, una casa en Godella o un chalet en Campolivar son vidas distintas: el colegio, el metro, el
            jardín, la vuelta a casa. Conocemos cada zona como quien vive en ella y te contamos lo que no sale en el anuncio.
          </p>
          <p data-reveal="text">
            También cuenta lo que viene después para ti: una mudanza, una reforma, vender la propiedad en la que vives ahora. Por eso
            empezamos escuchando, y la búsqueda se construye alrededor de eso.
          </p>
          <ul className={styles.zonasList} data-reveal="text">
            {GUIAS.map((g) => (
              <li key={g.slug}>
                <Link href={`/zonas/${g.slug}`}>{g.nombre}</Link>
              </li>
            ))}
          </ul>
          <div data-reveal="text">
            <Button href="/zonas">Ver todas las zonas</Button>
          </div>
        </div>
      </Section>

      <Section className={styles.incluido}>
        <div className="container">
          <div data-reveal="text">
            <p className={styles.labelDark}>Incluido cuando compras con Nodus</p>
            <Heading tone="dark" strong="Asesoramiento integral." muted="Desde la primera visita hasta la firma." breakMuted />
          </div>
          <ul className={styles.incluidoList}>
            {comprar.incluido.map((it) => (
              <li key={it.titulo} data-reveal="text">
                <h3>{it.titulo}</h3>
                <p>{it.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {destacadas.length > 0 && (
        <Section className={`container ${styles.pasos}`}>
          <div data-reveal="text">
            <p className={styles.label}>En venta ahora</p>
            <Heading strong="Pocas propiedades." muted="Toda la atención en cada una." breakMuted />
            <p className={styles.barrioText} style={{ marginTop: "3rem" }}>
              Llevamos pocas propiedades a la vez, a propósito: cada una sale con su web, su vídeo y sus visitas filtradas, y se
              vende antes de captar la siguiente. Si buscas algo concreto que no está aquí, escríbenos y lo buscamos contigo.
            </p>
            <div style={{ marginTop: "4rem" }}>
              <Button href="/propiedades">Ver todas las propiedades</Button>
            </div>
          </div>
          <ul className="cards-list" data-reveal="text">
            {destacadas.map((p) => (
              <PropertyCard key={p.slug} p={p} compact />
            ))}
          </ul>
        </Section>
      )}

      <Testimonios />

      <Section className={`container ${styles.faq}`}>
        <div data-reveal="text">
          <p className={styles.label}>Preguntas</p>
          <Heading strong="Preguntas" muted="antes de empezar." />
        </div>
        <div className={styles.faqList}>
          {comprar.faq.map((f) => (
            <details key={f.pregunta} className={styles.faqItem} data-reveal="text">
              <summary>
                <span>{f.pregunta}</span>
                <span className={styles.plus} aria-hidden />
              </summary>
              <p>{f.respuesta}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <p className={styles.label}>Hablemos</p>
            <Heading strong="Cuéntanos qué buscas." />
          </div>
          <p data-reveal="text">
            Zona, presupuesto, plazos y lo que no puede faltar. Te acompañamos en cada paso, sin complicaciones y sin
            compromisos en el primer contacto.
          </p>
          <div data-reveal="text">
            <WhatsApp block />
          </div>
          <p data-reveal="text">
            <Link href="/vender" className="link-underline">
              ¿También vendes tu casa?
            </Link>
          </p>
        </div>
        <div data-reveal="text">
          <ContactForm origen="Comprar" conVivienda cta="Empezar a buscar" />
        </div>
      </Section>
    </>
  );
}
