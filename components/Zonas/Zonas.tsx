import Link from "next/link";
import zonas from "@/content/zonas.json";
import { guiaDeZona } from "@/lib/zonas";
import styles from "./Zonas.module.css";

/** 1.11b Barrios: tres columnas de enlaces a /zonas/[slug]. Las zonas destacadas van en tinta plena. */
export default function Zonas() {
  const destacadas = new Set(zonas.destacadas);
  return (
    <section className={`container ${styles.root}`} aria-labelledby="zonas-titulo">
      <p className={styles.label}>Zonas</p>
      <h2 id="zonas-titulo" className={styles.title}>
        Barrios y zonas donde trabajamos <span>en Valencia y alrededores</span>
      </h2>
      <div className={styles.cols}>
        {zonas.grupos.map((g) => (
          <div key={g.titulo}>
            <h3 className={styles.colTitle}>{g.titulo}</h3>
            <ul className={styles.list}>
              {g.zonas.map((z) => {
                const guia = guiaDeZona(z.slug);
                const texto = (
                  <>
                    {z.nombre}
                    {"municipio" in z && z.municipio ? <small> · {z.municipio}</small> : null}
                  </>
                );
                // Sin guía publicada no hay página: texto plano para no enlazar a un 404.
                return (
                  <li key={z.slug}>
                    {guia ? (
                      <Link href={`/zonas/${guia.slug}`} className={destacadas.has(z.slug) ? styles.strong : undefined}>
                        {texto}
                      </Link>
                    ) : (
                      <span>{texto}</span>
                    )}
                  </li>
                );
              })}
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
