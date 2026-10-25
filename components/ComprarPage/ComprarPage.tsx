"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import Testimonios from "@/components/Testimonios/Testimonios";
import PropertyCard from "@/components/Propiedades/PropertyCard";
import { useReveal } from "@/components/motion/useReveal";
import { PROPIEDADES } from "@/lib/propiedades";
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
            Comprar vivienda · València y área metropolitana
          </p>
          <h1 className={styles.h1} data-reveal="text">
            Encuentra lo que encaja. <span>Con alguien al lado.</span>
          </h1>
          <p className={styles.lead} data-reveal="text">
            Asesoramiento inmobiliario integral: desde la primera visita hasta la firma. Sin fisuras.
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
            alt="Calle del centro histórico de València con luz de tarde"
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
          <Heading strong="Inmobiliaria," muted="reconectada." />
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

      <Section className={`container ${styles.split}`}>
        <figure className={styles.splitFig} data-reveal="image">
          <Image src="/fotos/servicio-comprar.webp" alt="Edificios y arbolado de un barrio residencial de València" fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.cover} />
        </figure>
        <div className={styles.splitText}>
          <div data-reveal="text">
            <Heading strong="Las mejores casas" muted="no se anuncian." breakMuted />
          </div>
          <p data-reveal="text">
            En Campolivar, las operaciones más interesantes rara vez aparecen en Idealista o Fotocasa. Las familias que llevan
            años en la zona se mueven por recomendación, y los propietarios que quieren vender prefieren hacerlo sin exposición
            pública. Conocemos el mercado y tenemos acceso a propiedades que no llegan al mercado abierto.
          </p>
          <div data-reveal="text">
            <Button href="/zonas">Ver zonas</Button>
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
            <Heading strong="En venta ahora." muted="Pocas, y bien llevadas." breakMuted />
            <p className={styles.barrioText} style={{ marginTop: "3rem" }}>
              Llevamos pocas viviendas a la vez para dedicarles toda la atención. Si buscas algo concreto, escríbenos.
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
            <Heading strong="Cuéntanos qué buscas." />
          </div>
          <p data-reveal="text">
            Te acompañamos en cada paso, sin complicaciones. Sin compromisos en el primer contacto.
          </p>
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
