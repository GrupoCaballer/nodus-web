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

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** /nosotros — banner con vídeo, quiénes somos, frase, valores, equipo, enlace a Servicios y contacto. */
export default function NosotrosPage() {
  const quote = useRef<HTMLParagraphElement>(null);
  useIgnite(quote);

  return (
    <>
      {/* Banner con vídeo */}
      <section className={styles.banner} data-header-over="dark">
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
            Somos un equipo joven y vanguardista de Valencia. Sin miedo a hacer las cosas de otra manera y con dominio de las
            nuevas tecnologías: una web con esencia propia para cada propiedad, vídeo, renders y datos reales en cada decisión.
          </p>
          <p data-reveal="text">
            Una operación inmobiliaria raramente es solo una transacción. Es una mudanza, una inversión, un cambio de etapa.
            Nuestro trabajo empieza donde empieza esa complejidad: somos el punto donde se encuentran quien vende y quien
            compra, y donde la intermediación vuelve a ser un trabajo limpio, eficaz y satisfactorio para los dos.
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
            <p className={styles.labelDark}>Lo que no negociamos</p>
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
          <p className={styles.label}>El equipo</p>
          <Heading strong="Una persona por operación," muted="de principio a fin." breakMuted />
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
              {m.cargo && !m.cargo.startsWith("TODO") && <p className={styles.cargo}>{m.cargo}</p>}
              {m.zonas && !m.zonas.startsWith("TODO") && <p className={styles.zonas}>{m.zonas}</p>}
              {m.email && (
                <a href={`mailto:${m.email}`} className={styles.mail}>
                  {m.email}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Lo que hacemos: remite a Servicios en vez de repetirlo */}
      <Section className={`container ${styles.extras}`}>
        <div data-reveal="text">
          <p className={styles.label}>Lo que hacemos</p>
          <Heading strong="Mucho más que" muted="enseñar propiedades." breakMuted />
        </div>
        <p className={styles.extrasText} data-reveal="text">
          Valoración y venta, renders y presupuesto antes de reformar, broker hipotecario, alquiler por habitaciones y, aparte,
          operaciones off market e inversión. Cada servicio, explicado en su página.
        </p>
        <div data-reveal="text">
          <Button href="/servicios">Ver todos los servicios</Button>
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <p className={styles.label}>Hablemos</p>
            <Heading strong="Cuéntanos qué necesitas." />
          </div>
          <p data-reveal="text">
            Te acompañamos en cada paso, sin complicaciones y sin compromisos en el primer contacto. Si prefieres hablar con
            alguien concreto, arriba tienes el correo de cada persona del equipo.
          </p>
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
