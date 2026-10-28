"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import Embed from "./Embed";
import PropertyCard from "./PropertyCard";
import { useReveal } from "@/components/motion/useReveal";
import { fotosDe, nombreZona, precio, similares, TIPOS, type Propiedad } from "@/lib/propiedades";
import { guiaDeZona } from "@/lib/zonas";
import styles from "./Ficha.module.css";

/** Ficha de inmueble: galería grande, datos y CTA fijos, descripción, características, vídeo y tour, zona, similares, formulario. */
export default function Ficha({ p }: { p: Propiedad }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const fotos = fotosDe(p);
  const [todas, setTodas] = useState(false);
  const visibles = todas ? fotos : fotos.slice(0, 5);
  const zona = nombreZona(p.zona);
  const guia = guiaDeZona(p.zona);
  const vendido = p.estado === "vendido";
  const parecidos = similares(p);

  return (
    <article ref={root} className={styles.root}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Migas de pan">
          <Link href="/propiedades">Propiedades</Link>
          <span aria-hidden> / </span>
          {guia ? <Link href={`/zonas/${guia.slug}`}>{zona ?? guia.nombre}</Link> : <span>{p.localidad}</span>}
        </nav>

        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>
              {vendido ? "Vendido" : p.operacion === "venta" ? "En venta" : "En alquiler"} · {TIPOS[p.tipo]} · {p.localidad}
            </p>
            <h1 className={styles.h1}>{p.titulo}</h1>
          </div>
          <p className={styles.price}>{precio(p)}</p>
        </header>

        {/* Galería: primera foto a ancho completo, resto en dos columnas */}
        <div className={styles.gallery}>
          {visibles.map((src, i) => (
            <figure key={src} className={i === 0 ? styles.first : styles.thumb} data-reveal="image">
              <Image src={src} alt={`${p.titulo}, foto ${i + 1}`} fill priority={i === 0} sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"} className={styles.img} />
            </figure>
          ))}
        </div>
        {!todas && fotos.length > 5 && (
          <button type="button" className={styles.more} onClick={() => setTodas(true)}>
            Ver las {fotos.length} fotos →
          </button>
        )}

        <div className={styles.grid}>
          <div className={styles.main}>
            <dl className={styles.facts}>
              <div>
                <dt>Superficie</dt>
                <dd>{p.m2} m²</dd>
              </div>
              <div>
                <dt>Habitaciones</dt>
                <dd>{p.habitaciones}</dd>
              </div>
              <div>
                <dt>Baños</dt>
                <dd>{p.banos}</dd>
              </div>
              <div>
                <dt>Tipo</dt>
                <dd>{TIPOS[p.tipo]}</dd>
              </div>
              <div>
                <dt>Operación</dt>
                <dd>{p.operacion === "venta" ? "Venta" : "Alquiler"}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{vendido ? "Vendido" : "Disponible"}</dd>
              </div>
            </dl>

            <section className={styles.desc} aria-labelledby="desc">
              <h2 id="desc">Sobre esta propiedad</h2>
              {p.descripcion.map((par) => (
                <p key={par.slice(0, 40)}>{par}</p>
              ))}
            </section>

            <section aria-labelledby="carac">
              <h2 id="carac">Características</h2>
              <ul className={styles.features}>
                {p.caracteristicas.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            {(p.videos.length > 0 || p.tour) && (
              <section aria-labelledby="media" className={styles.media}>
                <h2 id="media">Vídeo y tour virtual</h2>
                {p.videos.map((id) => (
                  <Embed key={id} kind="youtube" id={id} title={`Vídeo de ${p.titulo}`} />
                ))}
                {p.tour && <Embed kind="matterport" id={p.tour} title={`Tour virtual de ${p.titulo}`} />}
              </section>
            )}

            {guia && (
              <section className={styles.zone} aria-labelledby="zona">
                <h2 id="zona">La zona</h2>
                <p>
                  Esta vivienda está en <strong>{zona ?? guia.nombre}</strong>. Tenemos una guía de {guia.nombre} con datos del
                  mercado, servicios, accesos y lo que no se publica.
                </p>
                <Button href={`/zonas/${guia.slug}`}>Guía de {guia.nombre}</Button>
              </section>
            )}
          </div>

          <aside className={styles.side}>
            <div className={styles.sticky} id="contacto">
              <p className={styles.sidePrice}>{precio(p)}</p>
              <p className={styles.sideMeta}>
                {p.m2} m² · {p.habitaciones} hab. · {p.banos} {p.banos === 1 ? "baño" : "baños"}
              </p>
              {vendido ? (
                <p className={styles.sold}>Esta vivienda ya se ha vendido. Si buscas algo parecido, cuéntanoslo y lo buscamos contigo.</p>
              ) : (
                <p className={styles.sideText}>Pide una visita o más información. Te llamamos en el día.</p>
              )}
              <ContactForm origen={`Ficha · ${p.titulo}`} cta={vendido ? "Avisadme de similares" : "Pedir visita"} />
              <div className={styles.wa}>
                <WhatsApp label="O escríbenos por WhatsApp" />
              </div>
            </div>
          </aside>
        </div>

        {parecidos.length > 0 && (
          <section className={styles.similar} aria-labelledby="similares">
            <h2 id="similares">También te puede encajar</h2>
            <ul className={styles.similarList}>
              {parecidos.map((s) => (
                <PropertyCard key={s.slug} p={s} compact />
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
