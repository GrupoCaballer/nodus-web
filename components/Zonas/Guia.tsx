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

/** Guía de zona por municipio, con sus urbanizaciones, contada como la contaría un residente de toda la vida. */
export default function Guia({ g }: { g: GuiaT }) {
  const hero = useRef<HTMLElement>(null);
  const inmuebles = PROPIEDADES.filter((p) => (p.zona === g.slug || g.zonas.includes(p.zona)) && p.estado !== "vendido");

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
          {g.video ? (
            <video className={styles.heroVideo} src={g.video} poster={g.foto.src} autoPlay muted loop playsInline aria-hidden />
          ) : (
            <Image src={g.foto.src} alt={g.foto.alt} fill priority sizes="100vw" className={styles.cover} />
          )}
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
              Hablemos
            </Button>
            <Link href="/propiedades" className={styles.heroLink}>
              Ver propiedades
            </Link>
          </div>
          {g.foto.credito && !g.video && <p className={styles.credit}>{g.foto.credito}</p>}
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
          {g.padre && (
            <p data-reveal="text">
              <Link href={`/zonas/${g.padre}`} className="link-underline">
                {g.nombre} es parte de {g.municipio}: ver la guía del municipio
              </Link>
            </p>
          )}
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

      {/* Urbanizaciones y barrios del municipio */}
      {g.urbanizaciones && (
      <Section className={`container ${styles.urb}`} label={`Zonas de ${g.nombre}`}>
        <div data-reveal="text">
          <p className={styles.label}>Urbanizaciones y barrios</p>
          <Heading strong={g.urbanizaciones.titulo[0]} muted={g.urbanizaciones.titulo[1]} breakMuted />
        </div>
        <ol className={styles.urbList}>
          {g.urbanizaciones.items.map((u) => (
            <li key={u.nombre} className={styles.urbItem}>
              <figure className={styles.urbFig} data-reveal="image">
                <Image src={u.foto} alt={u.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className={styles.cover} />
              </figure>
              <div className={styles.urbText}>
                <h3 data-reveal="text">{u.nombre}</h3>
                <p data-reveal="text">{u.texto}</p>
                {"slug" in u && u.slug && (
                  <p data-reveal="text">
                    <Link href={`/zonas/${u.slug}`} className="link-underline">
                      Guía de {u.nombre}
                    </Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>
      )}

      {/* Estilo de vida */}
      {g.estilo && (
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
      )}

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
      {g.distancias && (
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
      )}

      {/* Patrimonio y entorno */}
      {g.patrimonio && (
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
      )}

      {/* Galería: fotos propias de lugares concretos de la zona */}
      {g.galeria.length > 0 && (
      <Section className={`container ${styles.galeria}`} label={`Galería de ${g.nombre}`}>
        <div data-reveal="text">
          <p className={styles.label}>La zona en imágenes</p>
          <Heading strong={g.nombre} muted="a pie de calle y desde el aire." />
        </div>
        {g.galeria.length ? (
          <ul className={styles.galeriaList}>
            {g.galeria.map((f) => (
              <li key={f.src} data-reveal="image">
                <figure className={styles.galeriaFig}>
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.cover} />
                  {(f.pie || f.credito) && (
                    <figcaption>
                      {f.pie}
                      {f.credito && <small>{f.credito}</small>}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>
      )}

      {/* Inmuebles en la zona */}
      {inmuebles.length > 0 && (
        <Section className={`container ${styles.inmuebles}`}>
          <div className={styles.inmueblesHead} data-reveal="text">
            <p className={styles.label}>Propiedades</p>
            <Heading strong={`Propiedades en ${g.nombre}.`} muted="Las que hay ahora." breakMuted />
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
            <p className={styles.label}>Hablemos</p>
            <Heading strong={`¿Buscas propiedad en ${g.nombre}`} muted="o vendes la tuya?" breakMuted />
          </div>
          <p data-reveal="text">
            Cuéntanos qué necesitas: la zona, la propiedad que tienes en mente o la que quieres vender. Te acompañamos en cada
            paso, sin compromisos en el primer contacto.
          </p>
        </div>
        <div data-reveal="text">
          <ContactForm origen={`Zona · ${g.nombre}`} conVivienda cta="Hablar con Nodus" />
        </div>
      </Section>
    </article>
  );
}
