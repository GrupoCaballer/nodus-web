"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import LazyVideo from "@/components/ui/LazyVideo";
import ContactForm from "@/components/ContactForm/ContactForm";
import { useReveal } from "@/components/motion/useReveal";
import { useIgnite } from "@/components/motion/useIgnite";
import equipo from "@/content/equipo.json";
import { SITE } from "@/lib/site";
import styles from "./NosotrosPage.module.css";

const VALORES = [
  { titulo: "Integridad", texto: "Decimos lo que pensamos, aunque no sea lo que el cliente quiere escuchar." },
  { titulo: "Rigor", texto: "Cada operación recibe el mismo nivel de atención, independientemente de su valor." },
  { titulo: "Cercanía", texto: "Somos accesibles, directos y humanos. Detrás de cada operación hay una persona." },
  { titulo: "Eficiencia", texto: "Respetamos el tiempo de nuestros clientes. Sin burocracia innecesaria." },
];

const EXTRAS = [
  {
    id: "reforma",
    titulo: "Reforma y renders",
    texto: "Reforma con renders y presupuesto de obra para quien compra una vivienda que necesita obra. TODO-TEXTO: ampliar con el texto de Nodus.",
    img: "/fotos/extra-reforma.webp",
    alt: "Arquitectura contemporánea de líneas geométricas en Valencia",
  },
  {
    id: "financiacion",
    titulo: "Financiación",
    texto: "Asesoría legal, fiscal y financiera coordinada. Resolvemos la complejidad para que el cliente solo tenga que tomar decisiones informadas. Broker financiero para llegar con la hipoteca estudiada.",
    img: "/fotos/extra-financiacion.webp",
    alt: "Edificio histórico de fachada ornamentada en Valencia",
  },
  {
    id: "inversion",
    titulo: "Inversión",
    texto: "Análisis de rentabilidad, selección de propiedades y seguimiento de la inversión. Una operación bien estructurada da resultados a largo plazo. Presentación de operaciones a fondos y family offices: dossier, LOI y due diligence.",
    img: "/fotos/extra-inversion.webp",
    alt: "Plaza del Ayuntamiento de Valencia con gente paseando",
  },
];

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** /nosotros — banner con vídeo, quiénes somos, valores, equipo, reforma / financiación / inversión (docs/interiores.md §6). */
export default function NosotrosPage() {
  const quote = useRef<HTMLParagraphElement>(null);
  useIgnite(quote);

  return (
    <>
      {/* Banner con vídeo */}
      <section className={styles.banner} data-header-over>
        <LazyVideo eager className={styles.video} src="/video/nosotros.mp4" poster="/video/nosotros.webp" aria-hidden />
        <div className={`container ${styles.bannerText}`}>
          <p className={styles.eyebrow}>Nosotros · Godella, Valencia</p>
          <h1 className={styles.h1}>
            No somos la agencia más grande. <span>Somos la más fiable.</span>
          </h1>
        </div>
      </section>

      {/* Quiénes somos */}
      <Section className={`container ${styles.quienes}`}>
        <div data-reveal="text">
          <p className={styles.label}>Quiénes somos</p>
        </div>
        <div className={styles.quienesText}>
          <p className={styles.big} data-reveal="text">
            Nodus nace de una convicción: el sector inmobiliario merece un servicio sin fisuras, donde cada parte del proceso
            esté conectada con la siguiente.
          </p>
          <p data-reveal="text">
            Una operación inmobiliaria raramente es solo una transacción. Es una mudanza, una inversión, un cambio de etapa.
            Nuestro trabajo empieza donde empieza esa complejidad.
          </p>
          <p data-reveal="text">
            Llevamos pocas viviendas a la vez, a propósito: cada una sale con su web, su vídeo y sus visitas filtradas, y se
            vende antes de captar la siguiente.
          </p>
        </div>
      </Section>

      {/* Frase que se enciende */}
      <section className={`container ${styles.quote}`}>
        <p ref={quote} className={styles.quoteText}>
          <span>Ser la primera llamada.</span>{" "}
          <span data-muted className={styles.quoteMuted}>
            No la última opción.
          </span>
        </p>
      </section>

      {/* Valores */}
      <Section className={styles.valores}>
        <div className="container">
          <div data-reveal="text">
            <p className={styles.labelDark}>Cómo trabajamos</p>
            <Heading tone="dark" strong="Cuatro cosas" muted="que no negociamos." breakMuted />
          </div>
          <ul className={styles.valoresList}>
            {VALORES.map((v) => (
              <li key={v.titulo} data-reveal="text">
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Equipo */}
      <Section className={`container ${styles.equipo}`} id="equipo">
        <div className={styles.equipoHead} data-reveal="text">
          <Heading strong="El equipo." muted="Una persona por operación, de principio a fin." breakMuted />
        </div>
        <ul className={styles.equipoList}>
          {equipo.map((m) => (
            <li key={m.nombre} className={styles.persona} data-reveal="text">
              <figure className={styles.retrato}>
                {m.foto ? (
                  <Image src={m.foto} alt={m.nombre} fill sizes="(max-width: 768px) 50vw, 20vw" className={styles.cover} />
                ) : (
                  <span className={styles.iniciales} aria-hidden>
                    {m.nombre
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </figure>
              <h3>{m.nombre}</h3>
              <p className={styles.cargo}>{m.cargo}</p>
              {m.zonas && <p className={styles.zonas}>{m.zonas}</p>}
              {m.email && (
                <a href={`mailto:${m.email}`} className={styles.mail}>
                  {m.email}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Reforma / Financiación / Inversión */}
      <Section className={`container ${styles.extras}`}>
        <div data-reveal="text">
          <Heading strong="Mucho más que" muted="comprar y vender." breakMuted />
        </div>
        <ol className={styles.extrasList}>
          {EXTRAS.map((e, i) => (
            <li key={e.id} id={e.id} className={`${styles.extra} ${i % 2 ? styles.extraAlt : ""}`}>
              <figure className={styles.extraFig} data-reveal="image">
                <Image src={e.img} alt={e.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.cover} />
              </figure>
              <div className={styles.extraText}>
                <h3 data-reveal="text">{e.titulo}</h3>
                <p data-reveal="text">{e.texto}</p>
                <div data-reveal="text">
                  <Button href="/contacto">Hablemos</Button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Contacto */}
      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <Heading strong="Cuéntanos qué necesitas." />
          </div>
          <p data-reveal="text">Te acompañamos en cada paso, sin complicaciones. Sin compromisos en el primer contacto.</p>
          <p data-reveal="text">
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
            <br />
            <a href={SITE.phoneHref} className="link-underline">
              {SITE.phone}
            </a>
          </p>
          <p data-reveal="text">
            <Link href="/contacto" className="link-underline">
              Todos los datos de contacto
            </Link>
          </p>
        </div>
        <div data-reveal="text">
          <ContactForm origen="Nosotros" />
        </div>
      </Section>
    </>
  );
}
