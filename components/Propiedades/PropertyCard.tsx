import Image from "next/image";
import Link from "next/link";
import { fotosDe, nombreZona, precio, type Propiedad } from "@/lib/propiedades";
import styles from "./PropertyCard.module.css";

/** Tarjeta de inmueble: foto 4:3, precio, operación · hab · baños, título y zona. */
export default function PropertyCard({ p, compact = false }: { p: Propiedad; compact?: boolean }) {
  const vendido = p.estado === "vendido";
  return (
    <li className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <Link href={`/propiedades/${p.slug}`} className={styles.link}>
        <figure className={styles.fig}>
          <Image src={fotosDe(p)[0]} alt={p.titulo} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.img} />
          {vendido && <span className={styles.badge}>Vendido</span>}
        </figure>
        <div className={styles.body}>
          <p className={styles.price}>{precio(p)}</p>
          <p className={styles.meta}>
            {p.operacion === "venta" ? "En venta" : "En alquiler"} · {p.m2} m² · {p.habitaciones} hab. · {p.banos}{" "}
            {p.banos === 1 ? "baño" : "baños"}
          </p>
          <h3 className={styles.title}>{p.titulo}</h3>
          <p className={styles.zone}>{nombreZona(p.zona) ?? p.localidad}</p>
        </div>
      </Link>
    </li>
  );
}
