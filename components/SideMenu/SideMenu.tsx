"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/components/motion/gsap";
import { PROPIEDADES, precio, nombreZona } from "@/lib/propiedades";
import { ZONAS_INDEX } from "@/lib/zonas";
import { SITE } from "@/lib/site";
import styles from "./SideMenu.module.css";

export type SideMenuPost = { slug: string; titulo: string; categoria: string; borrador?: boolean };

/**
 * Menú lateral de la home. El recorrido principal (intro → reseñas) es
 * obligatorio; todo lo demás (propiedades, zonas, blog, servicios) vive aquí.
 * Se abre solo la primera vez que el scroll termina el recorrido (final de
 * [data-story-end]) y después queda una pestaña fija para reabrirlo.
 */
export default function SideMenu({ posts }: { posts: SideMenuPost[] }) {
  const panel = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  const propiedades = PROPIEDADES.filter((p) => p.estado !== "vendido").slice(0, 4);
  const zonas = ZONAS_INDEX.destacadas
    .map((slug) => ZONAS_INDEX.grupos.flatMap((g) => g.zonas).find((z) => z.slug === slug))
    .filter((z): z is NonNullable<typeof z> => !!z);

  useGSAP(() => {
    const end = document.querySelector("[data-story-end]");
    if (!end) return;
    ScrollTrigger.create({
      trigger: end,
      start: "bottom 70%",
      onEnter: () => setReady(true),
      onLeaveBack: () => {
        setReady(false);
        setOpen(false);
      },
    });
  });

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    gsap.fromTo(
      panel.current!.querySelectorAll("[data-item]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.04, delay: 0.2 },
    );
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={[styles.tab, ready ? styles.tabReady : "", open ? styles.tabOpen : ""].join(" ")}
        aria-expanded={open}
        aria-controls="menu-lateral"
        onClick={() => setOpen((o) => !o)}
        tabIndex={ready ? 0 : -1}
      >
        <span>{open ? "Cerrar" : "Explorar"}</span>
      </button>

      <aside
        ref={panel}
        id="menu-lateral"
        className={[styles.panel, open ? styles.panelOpen : ""].join(" ")}
        aria-label="Explorar Nodus"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className={styles.inner}>
          <header className={styles.head} data-item>
            <p className={styles.label}>Sigue explorando</p>
            <p className={styles.title}>Lo que hay ahora en Nodus.</p>
          </header>

          <section className={styles.group}>
            <h2 className={styles.groupTitle} data-item>
              <Link href="/propiedades">Propiedades</Link>
              <span className={styles.count}>{propiedades.length}</span>
            </h2>
            <ul className={styles.list}>
              {propiedades.map((p) => (
                <li key={p.slug} data-item>
                  <Link href={`/propiedades/${p.slug}`} className={styles.item}>
                    <span className={styles.itemMain}>{p.titulo}</span>
                    <span className={styles.itemMeta}>
                      {nombreZona(p.zona) ?? p.localidad} · {precio(p)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/propiedades" className={styles.more} data-item>
              Ver todas las propiedades
            </Link>
          </section>

          <section className={styles.group}>
            <h2 className={styles.groupTitle} data-item>
              <Link href="/zonas">Zonas</Link>
            </h2>
            <ul className={`${styles.list} ${styles.inline}`}>
              {zonas.map((z) => (
                <li key={z.slug} data-item>
                  <Link href={`/zonas/${z.slug}`} className={styles.chip}>
                    {z.nombre}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/zonas" className={styles.more} data-item>
              Ver todas las zonas
            </Link>
          </section>

          <section className={styles.group}>
            <h2 className={styles.groupTitle} data-item>
              <Link href="/blog">Blog</Link>
            </h2>
            <ul className={styles.list}>
              {posts.map((p) => (
                <li key={p.slug} data-item>
                  {p.borrador ? (
                    <div className={`${styles.item} ${styles.itemSoon}`}>
                      <span className={styles.itemMain}>{p.titulo}</span>
                      <span className={styles.itemMeta}>En preparación</span>
                    </div>
                  ) : (
                    <Link href={`/blog/${p.slug}`} className={styles.item}>
                      <span className={styles.itemMain}>{p.titulo}</span>
                      <span className={styles.itemMeta}>{p.categoria}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <nav className={styles.foot} aria-label="Más" data-item>
            <Link href="/servicios">Servicios</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Hablemos</Link>
            <a href={SITE.whatsappHref} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}
