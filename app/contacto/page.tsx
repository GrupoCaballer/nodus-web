import type { Metadata } from "next";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import equipo from "@/content/equipo.json";
import { SITE } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Nodus Real Estate, inmobiliaria en Godella (Valencia). ${SITE.email} · ${SITE.phone}. Te contestamos en el día.`,
  alternates: { canonical: "/contacto" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", addressLocality: "Godella", addressRegion: "Valencia", addressCountry: "ES" },
  sameAs: [SITE.instagram].filter(Boolean),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`container ${styles.root}`}>
        <div className={styles.left}>
          <Heading as="h1" strong="Cuéntanos qué necesitas." muted="Te contestamos en el día." breakMuted />
          <p className={styles.lead}>Comprar, vender, alquilar o invertir. Sin compromiso en el primer contacto.</p>
          <WhatsApp block />

          <dl className={styles.datos}>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Oficina</dt>
              <dd>
                {SITE.place}
                <br />
                <span className={styles.todo}>TODO-DIRECCIÓN: calle y horario de atención</span>
              </dd>
            </div>
            <div>
              <dt>Redes</dt>
              <dd>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </dd>
            </div>
          </dl>

          <h2 className={styles.h2}>Habla directamente con el equipo</h2>
          <ul className={styles.equipo}>
            {equipo
              .filter((m) => m.email)
              .map((m) => (
                <li key={m.email}>
                  <span>{m.nombre}</span>
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                  {m.telefono && <a href={`tel:${m.telefono.replace(/\s/g, "")}`}>{m.telefono}</a>}
                </li>
              ))}
          </ul>
          <p className={styles.note}>
            ¿Vendes? Empieza por <Link href="/vender">cómo trabajamos la venta</Link>. ¿Buscas? Mira{" "}
            <Link href="/propiedades">lo que hay ahora</Link> o cuéntanos qué no encuentras.
          </p>
        </div>

        <div className={styles.right}>
          <ContactForm origen="Contacto" conVivienda />
        </div>
      </div>
    </>
  );
}
