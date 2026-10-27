"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import { useReveal } from "@/components/motion/useReveal";
import styles from "./ServiciosPage.module.css";

// Textos de la web antigua y del contexto de Nodus. Lo marcado TODO-TEXTO lo redacta Nodus.
const SERVICIOS = [
  {
    id: "renders",
    label: "Renders y reforma",
    titulo: "¿Quieres imaginarte tu casa reformada?",
    texto: "Si la vivienda que te gusta necesita obra, antes de comprar te presentamos renders de cómo quedará y un presupuesto de obra. Así decides con la casa terminada delante, no con la que hay hoy. TODO-TEXTO: ampliar con el proceso y un caso real.",
    img: "/fotos/extra-reforma.webp",
    alt: "Arquitectura contemporánea de líneas geométricas en València",
    cta: { href: "/comprar", label: "Comprar con Nodus" },
  },
  {
    id: "valoracion",
    label: "Valoración y venta",
    titulo: "Una valoración con criterio.",
    texto: "Combinamos la visita a la vivienda con el análisis de su ubicación, estado, características y propiedades comparables. Te explicamos la propuesta de precio y sus límites para acordar una salida al mercado con criterio. Después, web con esencia propia, vídeo, home staging y visitas filtradas.",
    img: "/fotos/servicio-vender.webp",
    alt: "Fachada modernista con palmeras en València",
    cta: { href: "/vender", label: "Vender con Nodus" },
  },
  {
    id: "off-market",
    label: "Activos off market",
    titulo: "Las mejores casas no se anuncian.",
    texto: "Las familias que llevan años en una zona se mueven por recomendación, y los propietarios que quieren vender prefieren hacerlo sin exposición pública. Conocemos el mercado y tenemos acceso a propiedades que no llegan al mercado abierto. Gestionamos ventas discretas y encargos de compra. TODO-TEXTO: grandes activos.",
    img: "/fotos/zona-campolivar.webp",
    alt: "Chalet entre vegetación en València",
    cta: { href: "/zonas", label: "Ver zonas" },
  },
  {
    id: "financiacion",
    label: "Broker hipotecario",
    titulo: "Llega con la hipoteca estudiada.",
    texto: "Asesoría legal, fiscal y financiera coordinada. Un broker personalizado estudia tu caso y compara entidades; en algunas de nuestras viviendas hay financiación con condiciones preferentes a través de Bayteca. Resolvemos la complejidad para que solo tengas que tomar decisiones informadas.",
    img: "/fotos/extra-financiacion.webp",
    alt: "Edificio histórico de fachada ornamentada en València",
    cta: { href: "/contacto", label: "Consultar" },
  },
  {
    id: "inversion",
    label: "Inversión",
    titulo: "Una operación bien estructurada da resultados a largo plazo.",
    texto: "Análisis de rentabilidad, selección de activos y seguimiento de la inversión. Presentación de operaciones a fondos y family offices: dossier, LOI y due diligence, en València, Comunitat Valenciana, España, Portugal y Andorra.",
    img: "/fotos/extra-inversion.webp",
    alt: "Plaza del Ayuntamiento de València con gente paseando",
    cta: { href: "/contacto", label: "Hablar de una operación" },
  },
  {
    id: "alquiler",
    label: "Alquiler por habitaciones",
    titulo: "Tu vivienda, habitación a habitación.",
    texto: "Preparamos tu piso, seleccionamos inquilinos y gestionamos el día a día. Un servicio completo en València, desde la primera habitación hasta el seguimiento mensual. Tres planes con precio que puedes contratar por separado o combinar.",
    img: "/fotos/servicio-alquilar.webp",
    alt: "Paseo marítimo con palmeras en València",
    cta: { href: "/alquilar", label: "Ver los planes" },
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

/** /servicios — lo que hace Nodus más allá de enseñar casas: renders, valoración, off market, broker, inversión, alquiler. */
export default function ServiciosPage() {
  return (
    <>
      <Section className={`container ${styles.hero}`}>
        <p className={styles.eyebrow} data-reveal="text">
          Servicios
        </p>
        <div data-reveal="text">
          <Heading as="h1" size="h1" strong="Cómo te ayuda Nodus." muted="De la primera visita a la firma, y lo que va después." breakMuted />
        </div>
        <nav className={styles.index} aria-label="Servicios" data-reveal="text">
          {SERVICIOS.map((s) => (
            <Link key={s.id} href={`#${s.id}`}>
              {s.label}
            </Link>
          ))}
        </nav>
      </Section>

      <ol className={styles.list}>
        {SERVICIOS.map((s, i) => (
          <li key={s.id} id={s.id} className={`${styles.item} ${i % 2 ? styles.alt : ""}`}>
            <Section className={`container ${styles.itemInner}`}>
              <figure className={styles.fig} data-reveal="image">
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.img} />
              </figure>
              <div className={styles.text}>
                <p className={styles.label} data-reveal="text">
                  {s.label}
                </p>
                <h2 data-reveal="text">{s.titulo}</h2>
                <p data-reveal="text">{s.texto}</p>
                <div data-reveal="text">
                  <Button href={s.cta.href}>{s.cta.label}</Button>
                </div>
              </div>
            </Section>
          </li>
        ))}
      </ol>

      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <Heading strong="Cuéntanos qué necesitas." />
          </div>
          <p data-reveal="text">Te acompañamos en cada paso, sin complicaciones. Sin compromisos en el primer contacto.</p>
          <div data-reveal="text">
            <WhatsApp block />
          </div>
        </div>
        <div data-reveal="text">
          <ContactForm origen="Servicios" />
        </div>
      </Section>
    </>
  );
}
