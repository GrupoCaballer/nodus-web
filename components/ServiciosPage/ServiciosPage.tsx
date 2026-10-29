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
    id: "valoracion",
    label: "Valoración y venta",
    titulo: "Una valoración con criterio. Una venta con un equipo detrás.",
    texto: "Visitamos tu propiedad y la estudiamos con su ubicación, su estado y las comparables de la zona. Te explicamos qué sostiene el precio propuesto y qué puede condicionar la negociación. Después, una web con esencia propia, vídeo profesional, home staging y visitas filtradas, hasta la firma.",
    img: "/fotos/servicio-vender.webp",
    alt: "Fachada modernista con palmeras en Valencia",
    cta: { href: "/vender", label: "Vender con Nodus" },
  },
  {
    id: "reforma",
    label: "Renders y reforma",
    titulo: "Imagínate la propiedad ya reformada.",
    texto: "Si la propiedad que te gusta necesita obra, antes de comprar te enseñamos cómo quedará con renders y un presupuesto de obra. Decides con la propiedad terminada delante, no con la que hay hoy, y ofertas sabiendo lo que te va a costar de verdad.",
    img: "/fotos/extra-reforma.webp",
    alt: "Arquitectura contemporánea de líneas geométricas en Valencia",
    cta: { href: "/comprar", label: "Comprar con Nodus" },
  },
  {
    id: "financiacion",
    label: "Broker hipotecario",
    titulo: "Llega con la hipoteca estudiada.",
    texto: "Un broker estudia tu caso antes de la primera visita, compara entidades y te acompaña hasta la firma. En algunas de nuestras propiedades hay financiación con condiciones preferentes a través de Bayteca. Asesoría legal, fiscal y financiera coordinada, para que solo tengas que tomar decisiones informadas.",
    img: "/fotos/extra-financiacion.webp",
    alt: "Edificio histórico de fachada ornamentada en Valencia",
    cta: { href: "/contacto", label: "Consultar mi caso" },
  },
  {
    id: "alquiler",
    label: "Alquiler por habitaciones",
    titulo: "Tu propiedad, habitación a habitación.",
    texto: "Preparamos tu propiedad, seleccionamos inquilinos con solvencia y convivencia en mente y gestionamos el día a día: cobros, incidencias y mantenimiento. Un servicio completo en Valencia, en tres planes con precio que puedes contratar por separado o combinar.",
    img: "/fotos/servicio-alquilar.webp",
    alt: "Paseo marítimo con palmeras en Valencia",
    cta: { href: "/alquilar", label: "Ver los planes" },
  },
  {
    id: "off-market",
    label: "Off market e inversión",
    titulo: "Operaciones que no se anuncian.",
    texto: "Hay propietarios que prefieren vender sin exposición pública y compradores que buscan sin aparecer en ningún portal. Gestionamos esas ventas discretas y encargos de compra con la misma rigurosidad que el resto, y presentamos operaciones a fondos y family offices con dossier, LOI y due diligence, en Valencia, España, Portugal y Andorra.",
    img: "/fotos/extra-inversion.webp",
    alt: "Plaza del Ayuntamiento de Valencia con gente paseando",
    cta: { href: "/contacto", label: "Hablar de una operación" },
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

/** /servicios — lo que hace Nodus además de enseñar propiedades: valoración y venta, renders, broker, alquiler y, aparte, off market e inversión. */
export default function ServiciosPage() {
  return (
    <>
      <Section className={`container ${styles.hero}`}>
        <p className={styles.eyebrow} data-reveal="text">
          Servicios
        </p>
        <div data-reveal="text">
          <Heading as="h1" size="h1" strong="Lo que hace Nodus" muted="además de enseñar propiedades." breakMuted />
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
          <p data-reveal="text">
            Cuéntanos tu caso en dos líneas y te decimos cómo lo haríamos. Te acompañamos en cada paso, sin complicaciones y sin
            compromisos en el primer contacto.
          </p>
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
