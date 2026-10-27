"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import { useReveal } from "@/components/motion/useReveal";
import alquilar from "@/content/alquilar.json";
import base from "@/components/VenderPage/VenderPage.module.css";
import styles from "./AlquilarPage.module.css";

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** /alquilar — gestión de alquiler por habitaciones con los tres planes y precios de la web actual. */
export default function AlquilarPage() {
  return (
    <>
      <Section className={`container ${base.hero}`}>
        <div className={base.heroText}>
          <p className={base.eyebrow} data-reveal="text">
            {alquilar.eyebrow}
          </p>
          <h1 className={base.h1} data-reveal="text">
            {alquilar.titulo[0]} <span>{alquilar.titulo[1]}</span>
          </h1>
          <p className={base.lead} data-reveal="text">
            {alquilar.intro}
          </p>
          <div data-reveal="text">
            <Button href="#contacto">Hablemos de tu propiedad</Button>
          </div>
        </div>
        <figure className={base.heroFig} data-reveal="image">
          <Image
            src="/fotos/servicio-alquilar.webp"
            alt="Paseo marítimo con palmeras en Valencia"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className={base.cover}
          />
        </figure>
      </Section>

      {/* Punto de partida */}
      <Section className={`container ${styles.partida}`}>
        <div data-reveal="text">
          <p className={base.label}>El punto de partida</p>
          <Heading strong={alquilar.partida.titulo[0]} muted={alquilar.partida.titulo[1]} breakMuted />
        </div>
        <ul className={styles.partidaList}>
          {alquilar.partida.items.map((it) => (
            <li key={it.titulo} data-reveal="text">
              <h3>{it.titulo}</h3>
              <p>{it.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Planes */}
      <Section className={styles.planes} id="planes">
        <div className="container">
          <div className={styles.planesHead}>
            <div data-reveal="text">
              <p className={base.labelDark}>Servicios y honorarios</p>
              <Heading tone="dark" strong={alquilar.planes.titulo[0]} muted={alquilar.planes.titulo[1]} breakMuted />
            </div>
            <p className={styles.planesText} data-reveal="text">
              {alquilar.planes.texto}
            </p>
          </div>
          <ol className={styles.planesList}>
            {alquilar.planes.items.map((p, i) => (
              <li key={p.nombre} className={styles.plan} data-reveal="text">
                <span className={styles.planNum}>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.planBody}>
                  <h3>{p.nombre}</h3>
                  <p>{p.texto}</p>
                  <ul className={styles.incluye}>
                    {p.incluye.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.planPrice}>
                  <strong>{p.precio}</strong>
                  <span>{p.nota}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Cómo trabajamos */}
      <Section className={`container ${base.pasos}`}>
        <div data-reveal="text">
          <p className={base.label}>Cómo trabajamos</p>
          <Heading strong={alquilar.pasos.titulo[0]} muted={alquilar.pasos.titulo[1]} breakMuted />
          <p className={styles.pasosText}>{alquilar.pasos.texto}</p>
        </div>
        <ol className={base.pasosList}>
          {alquilar.pasos.items.map((p, i) => (
            <li key={p.titulo} className={base.paso} data-reveal="text">
              <span className={base.num}>{String(i + 1).padStart(2, "0")}</span>
              <p>
                <strong>{p.titulo}</strong> <span>{p.texto}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section className={`container ${base.faq}`}>
        <div data-reveal="text">
          <p className={base.label}>Preguntas</p>
          <Heading strong="Antes de" muted="dar el paso." />
        </div>
        <div className={base.faqList}>
          {alquilar.faq.map((f) => (
            <details key={f.pregunta} className={base.faqItem} data-reveal="text">
              <summary>
                <span>{f.pregunta}</span>
                <span className={base.plus} aria-hidden />
              </summary>
              <p>{f.respuesta}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto" className={`container ${base.contacto}`}>
        <div className={base.contactoText}>
          <div data-reveal="text">
            <p className={base.label}>Hablemos</p>
            <Heading strong="Hablemos de tu propiedad." />
          </div>
          <p data-reveal="text">
            Cuéntanos dónde está, cuántas habitaciones tiene y si ya está alquilado. Te decimos qué podemos asumir y con qué
            presupuesto, antes de empezar.
          </p>
          <div data-reveal="text">
            <WhatsApp block />
          </div>
        </div>
        <div data-reveal="text">
          <ContactForm origen="Alquilar" conVivienda cta="Hablar con Nodus" />
        </div>
      </Section>
    </>
  );
}
