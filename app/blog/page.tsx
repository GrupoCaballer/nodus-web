import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import { allPosts, fecha, type Post } from "@/lib/blog";
import Newsletter from "@/components/Newsletter/Newsletter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog y recursos",
  description: "Precios por barrio, qué mira un comprador y cómo preparar una propiedad. Datos de Valencia y su área metropolitana, sin humo.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const lista = await allPosts();

  return (
    <div className={`container ${styles.root}`}>
      <div className={styles.head}>
        <Heading as="h1" strong="Blog y" muted="recursos." breakMuted />
        <p>Precios por barrio, qué mira un comprador y cómo preparar una propiedad. Datos de Valencia, sin humo.</p>
      </div>


      {lista.length ? (
        <ol className={styles.list}>
          {lista.map((p) => (
            <li key={p.slug} className={styles.item}>
              {p.borrador ? (
                <div className={styles.itemLink} aria-disabled="true">
                  <Tarjeta p={p} />
                  <span className={styles.soon}>Artículo en preparación</span>
                </div>
              ) : (
                <Link href={`/blog/${p.slug}`} className={styles.itemLink}>
                  <Tarjeta p={p} />
                  <span className={styles.more}>
                    <span className="visually-hidden">{p.titulo}: </span>Leer más →
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>Todavía no hay artículos publicados.</p>
      )}
      <div className={styles.newsletter}>
        <Newsletter />
      </div>
    </div>
  );
}

function Tarjeta({ p }: { p: Post }) {
  return (
    <>
      <figure className={styles.fig}>
        <Image src={p.imagen} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.img} />
      </figure>
      <p className={styles.meta}>
        <time dateTime={p.fecha}>{fecha(p.fecha)}</time> · {p.categoria}
      </p>
      <h2 className={styles.title}>{p.titulo}</h2>
      <p className={styles.summary}>{p.resumen}</p>
    </>
  );
}
