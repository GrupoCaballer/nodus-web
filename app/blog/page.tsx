import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import { CATEGORIAS, allPosts, fecha } from "@/lib/blog";
import Newsletter from "@/components/Newsletter/Newsletter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog y recursos",
  description: "Precios por barrio, qué mira un comprador y cómo preparar una vivienda. Datos de València y su área metropolitana, sin humo.",
  alternates: { canonical: "/blog" },
};

type Search = { searchParams: Promise<{ cat?: string }> };

export default async function Page({ searchParams }: Search) {
  const { cat } = await searchParams;
  const posts = await allPosts();
  const activa = CATEGORIAS.find((c) => c === cat);
  const lista = activa ? posts.filter((p) => p.categoria === activa) : posts;

  return (
    <div className={`container ${styles.root}`}>
      <div className={styles.head}>
        <Heading as="h1" strong="Blog y" muted="recursos." breakMuted />
        <p>Precios por barrio, qué mira un comprador y cómo preparar una vivienda. Datos de València, sin humo.</p>
      </div>

      <nav className={styles.cats} aria-label="Categorías">
        <Link href="/blog" className={!activa ? styles.catActive : styles.cat}>
          Todos
        </Link>
        {CATEGORIAS.map((c) => (
          <Link key={c} href={`/blog?cat=${encodeURIComponent(c)}`} className={activa === c ? styles.catActive : styles.cat}>
            {c}
          </Link>
        ))}
      </nav>

      {lista.length ? (
        <ol className={styles.list}>
          {lista.map((p) => (
            <li key={p.slug} className={styles.item}>
              <Link href={`/blog/${p.slug}`} className={styles.itemLink}>
                <figure className={styles.fig}>
                  <Image src={p.imagen} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.img} />
                </figure>
                <p className={styles.meta}>
                  <time dateTime={p.fecha}>{fecha(p.fecha)}</time> · {p.categoria}
                </p>
                <h2 className={styles.title}>{p.titulo}</h2>
                <p className={styles.summary}>{p.resumen}</p>
                <span className={styles.more}>
                  <span className="visually-hidden">{p.titulo}: </span>Leer más →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>Todavía no hay artículos en esta categoría.</p>
      )}
      <div className={styles.newsletter}>
        <Newsletter />
      </div>
    </div>
  );
}
