import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import { GUIAS, ZONAS_INDEX, guiaDeZona } from "@/lib/zonas";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Zonas: dónde trabajamos",
  description:
    "Guías de Godella, Rocafort, Bétera y Paterna por urbanización: cómo se vive, servicios cercanos y las casas que vendemos ahora.",
  alternates: { canonical: "/zonas" },
};

export default function Page() {
  const conGuia = new Set(GUIAS.flatMap((g) => [g.slug, ...g.zonas]));
  return (
    <div className={styles.root}>
      <section className={`container ${styles.head}`}>
        <Heading as="h1" strong="Dónde trabajamos." muted="Guías con datos, no con adjetivos." breakMuted />
        <p>
          Cómo se vive en cada sitio, qué hay cerca, cuánto se tarda y qué propiedades tenemos ahora, municipio a municipio y
          urbanización a urbanización. Contado como lo contaría alguien que vive allí. Empezamos por los que mejor conocemos.
        </p>
      </section>

      <section className="container" aria-labelledby="destacadas">
        <h2 id="destacadas" className={styles.visuallyHidden}>
          Zonas destacadas
        </h2>
        <ul className={styles.cards}>
          {GUIAS.map((g) => (
            <li key={g.slug} className={styles.card}>
              <Link href={`/zonas/${g.slug}`} className={styles.cardLink}>
                <Image src={g.foto.src} alt={g.foto.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.img} />
                <div className={styles.cardText}>
                  <p className={styles.cardEyebrow}>{g.eyebrow}</p>
                  <h3 className={styles.cardTitle}>{g.nombre}</h3>
                  <p className={styles.cardIntro}>{g.intro.split(". ")[0]}.</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.rest}`} aria-labelledby="todas">
        <h2 id="todas" className={styles.restTitle}>
          Todas las zonas <span>donde operamos</span>
        </h2>
        <div className={styles.cols}>
          {ZONAS_INDEX.grupos.map((g) => (
            <div key={g.titulo}>
              <h3 className={styles.colTitle}>{g.titulo}</h3>
              <ul className={styles.list}>
                {g.zonas.map((z) => (
                  <li key={z.slug}>
                    {conGuia.has(z.slug) ? (
                      <Link href={`/zonas/${guiaDeZona(z.slug)!.slug}`} className={styles.strong}>
                        {z.nombre} <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <span>{z.nombre}</span>
                    )}
                    {"municipio" in z && z.municipio ? <small> · {z.municipio}</small> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.note}>Las zonas sin guía todavía también se trabajan. Si tu propiedad está en una de ellas, <Link href="/vender#contacto">cuéntanoslo</Link>.</p>
      </section>
    </div>
  );
}
