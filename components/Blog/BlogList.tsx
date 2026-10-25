"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useReveal } from "@/components/motion/useReveal";
import type { Post } from "@/lib/blog";
import styles from "./BlogList.module.css";

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(".", "");

/** 1.10 "Blog y recursos": tres artículos en filas con fecha, titular, resumen y foto 16:9 con reveal. */
export default function BlogList({ posts }: { posts: Post[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className={`container ${styles.root}`} id="blog">
      <div className={styles.head}>
        <div data-reveal="text">
          <Heading strong="Blog y" muted="recursos." breakMuted />
        </div>
        <div className={styles.copy}>
          <p data-reveal="text">Precios por barrio, qué mira un comprador y cómo preparar una vivienda. Datos de València, sin humo.</p>
          <div data-reveal="text">
            <Button href="/blog">Ver todos los artículos</Button>
          </div>
        </div>
      </div>

      <ol className={styles.list}>
        {posts.map((p) => (
          <li key={p.slug} className={styles.item}>
            <div className={styles.itemText}>
              <time dateTime={p.fecha} className={styles.date} data-reveal="text">
                {fecha(p.fecha)}
              </time>
              <h3 className={styles.title} data-reveal="text">
                <Link href={`/blog/${p.slug}`}>{p.titulo}</Link>
              </h3>
              <p className={styles.summary} data-reveal="text">
                {p.resumen}
              </p>
              <div data-reveal="text">
                <Button href={`/blog/${p.slug}`}>Leer más</Button>
              </div>
            </div>
            <figure className={styles.fig} data-reveal="image">
              <Image src={p.imagen} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className={styles.img} />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
