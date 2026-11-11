"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import { useReveal } from "@/components/motion/useReveal";
import vender from "@/content/vender.json";
import { GUIAS } from "@/lib/zonas";
import styles from "./VenderPage.module.css";

const destacadas = GUIAS.map((g) => ({ slug: g.slug, nombre: g.nombre, municipio: undefined as string | undefined }));

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** /vender — estructura de la landing de compradores de la referencia, con los textos de Nodus (docs/interiores.md §5). */
export default function VenderPage({ situaciones = [] }: { situaciones?: { slug: string; titulo: string }[] }) {
  return (
    <>
      {/* 5.1 Hero */}
      <Section className={`container ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-reveal="text">
            Vender tu propiedad · Valencia y área metropolitana
          </p>
          <h1 className={styles.h1} data-reveal="text">
            Vender tu piso en Valencia. <span>Cada paso, conectado.</span>
          </h1>
          <p className={styles.lead} data-reveal="text">
            Una valoración con criterio. Una estrategia acordada contigo. Un equipo que coordina la venta desde la primera
            conversación hasta la firma.
          </p>
          <ul className={styles.promesas}>
            {vender.promesas.map((p) => (
              <li key={p} data-reveal="text">
                {p}
              </li>
            ))}
          </ul>
          <div data-reveal="text">
            <Button href="#contacto">Hablemos de la venta</Button>
          </div>
        </div>
        <figure className={styles.heroFig} data-reveal="image">
          <Image
            src="/fotos/vender-fachada.webp"
            alt="Edificio señorial entre árboles en Valencia"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className={styles.cover}
          />
        </figure>
      </Section>

      {/* 5.2 Barra de prueba */}
      <Section className={styles.proof}>
        <ul className={`container ${styles.proofList}`}>
          {vender.prueba.map((p) => (
            <li key={p.texto} data-reveal="text">
              <strong>{p.dato}</strong>
              <span>{p.texto}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5.3 Seis pasos */}
      <Section className={`container ${styles.pasos}`}>
        <div className={styles.pasosAside}>
          <div data-reveal="text">
            <p className={styles.label}>Cómo funciona</p>
            <Heading strong="Seis pasos." muted="Un mismo equipo." />
          </div>
          <figure className={styles.pasosFig} data-reveal="image">
            <Image
              src="/fotos/chevron-banco.webp"
              alt="Pareja sentada en un banco de una calle de Valencia"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className={styles.cover}
            />
          </figure>
        </div>
        <ol className={styles.pasosList}>
          {vender.pasos.map((p, i) => (
            <li key={p.titulo} className={styles.paso} data-reveal="text">
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <p>
                <strong>{p.titulo}</strong> <span>{p.texto}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5.4 El barrio importa */}
      <Section className={`container ${styles.barrio}`}>
        <div data-reveal="text">
          <p className={styles.label}>El barrio</p>
          <Heading strong="Cada zona se vende distinto." muted="Cada propietario, también." breakMuted />
        </div>
        <div className={styles.barrioText}>
          <p data-reveal="text">
            Un piso en el casco de Godella, un dúplex en Santa Bárbara o un chalet en Campolivar necesitan enfoques distintos. La
            ubicación, la distribución, el estado del edificio y el perfil de comprador orientan la forma de presentar cada
            propiedad.
          </p>
          <p data-reveal="text">
            También cuenta lo que viene después para ti: una mudanza, otra compra o la reorganización de tu patrimonio. Por
            eso empezamos escuchando.
          </p>
          <ul className={styles.zonasList} data-reveal="text">
            {destacadas.map((z) => (
              <li key={z.slug}>
                <Link href={`/zonas/${z.slug}`}>
                  {z.nombre}
                  {"municipio" in z && z.municipio ? <small> · {z.municipio}</small> : null}
                </Link>
              </li>
            ))}
          </ul>
          {situaciones.length > 0 && (
            <>
              <p data-reveal="text">Si tu caso tiene algo particular, empieza por aquí:</p>
              <ul className={styles.zonasList} data-reveal="text">
                {situaciones.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/vender/${s.slug}`}>{s.titulo}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Section>

      {/* 5.5 Bloque partido */}
      <Section className={`container ${styles.split}`}>
        <figure className={styles.splitFig} data-reveal="image">
          <Image
            src="/fotos/vender-aereo.webp"
            alt="Vista aérea del Palau de les Arts y la Ciudad de las Artes y las Ciencias, Valencia"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.cover}
          />
        </figure>
        <div className={styles.splitText}>
          <div data-reveal="text">
            <p className={styles.label}>La web de tu casa</p>
            <Heading strong="La web vende la propiedad." muted="Nosotros cerramos la venta." breakMuted />
          </div>
          <p data-reveal="text">
            Cada vivienda sale con una web con esencia propia, su vídeo y su difusión en Instagram y en portales nacionales e
            internacionales. Pero una venta se cierra en las visitas, en la negociación y en la notaría. Ahí está el equipo,
            y ahí es donde se nota que cada paso está conectado con el siguiente.
          </p>
        </div>
      </Section>

      {/* 5.6 Incluido */}
      <Section className={styles.incluido}>
        <div className="container">
          <div data-reveal="text">
            <p className={styles.labelDark}>Incluido cuando vendes con Nodus</p>
            <Heading tone="dark" strong="Lo que lleva cada propiedad" muted="desde el primer día." breakMuted />
          </div>
          <ul className={styles.incluidoList}>
            {vender.incluido.map((it: { titulo: string; texto: string }) => (
              <li key={it.titulo} data-reveal="text">
                <h3>{it.titulo}</h3>
                <p>{it.texto}</p>
              </li>
            ))}
          </ul>

          {/* 5.7 Condiciones claras */}
          <div className={styles.condiciones}>
            <div data-reveal="text">
              <Heading tone="dark" size="h3" as="h3" strong="Condiciones claras." muted="Antes de empezar." />
            </div>
            <ul>
              {vender.condiciones.map((c) => (
                <li key={c} data-reveal="text">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      {/* 5.9 FAQ */}
      <Section className={`container ${styles.faq}`}>
        <div data-reveal="text">
          <p className={styles.label}>Preguntas</p>
          <Heading strong="Decidir" muted="con información." />
        </div>
        <div className={styles.faqList}>
          {vender.faq.map((f) => (
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

      {/* 5.10 CTA + formulario */}
      <Section id="contacto" className={`container ${styles.contacto}`}>
        <div className={styles.contactoText}>
          <div data-reveal="text">
            <p className={styles.label}>Hablemos</p>
            <Heading strong="¿Estás pensando en vender?" />
          </div>
          <p data-reveal="text">
            Cuéntanos dónde está, cómo es y cuáles son tus planes. Empecemos por una conversación sin compromiso: te decimos
            cómo lo haríamos y tú decides.
          </p>
          <div data-reveal="text">
            <WhatsApp block />
          </div>
        </div>
        <div data-reveal="text">
          <ContactForm origen="Vender" conVivienda cta="Hablar con Nodus" />
        </div>
      </Section>
    </>
  );
}
