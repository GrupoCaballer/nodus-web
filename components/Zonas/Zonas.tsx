import Link from "next/link";
import zonas from "@/content/zonas.json";
import { guiaDeZona } from "@/lib/zonas";
import styles from "./Zonas.module.css";

/** 1.11b Barrios: tres columnas de enlaces a /zonas/[slug]. Las zonas destacadas van en tinta plena. */
export default function Zonas() {
  const destacadas = new Set(zonas.destacadas);
  return (
    <section className={`container ${styles.root}`} aria-labelledby="zonas-titulo">
      <h2 id="zonas-titulo" className={styles.title}>
        Barrios y zonas donde trabajamos <span>en València y alrededores</span>
      </h2>
      <div className={styles.cols}>
        {zonas.grupos.map((g) => (
          <div key={g.titulo}>
            <h3 className={styles.colTitle}>{g.titulo}</h3>
            <ul className={styles.list}>
              {g.zonas.map((z) => (
                <li key={z.slug}>
                  <Link href={`/zonas/${guiaDeZona(z.slug)?.slug ?? z.slug}`} className={destacadas.has(z.slug) ? styles.strong : undefined}>
                    {z.nombre}
                    {"municipio" in z && z.municipio ? <small> · {z.municipio}</small> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link href="/zonas" className={styles.all}>
        Ver todas las zonas <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
