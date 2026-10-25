import type { Metadata } from "next";
import Listado from "@/components/Propiedades/Listado";
import Heading from "@/components/ui/Heading";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Propiedades en venta y alquiler",
  description:
    "Pisos, chalets y casas en València, Godella, Campolivar y La Virgen de la Vega. Solo una parte de lo que gestionamos: también trabajamos producto off market.",
  alternates: { canonical: "/propiedades" },
};

export default function Page() {
  return (
    <section className={`container ${styles.root}`}>
      <div className={styles.head}>
        <Heading as="h1" strong="Inmuebles disponibles." muted="Y otros que no publicamos." breakMuted />
        <p>
          Lo que ves aquí es solo una parte de lo que gestionamos. Trabajamos con un volumen importante de producto off market
          que no se publica. Si buscas algo concreto, <a href="/comprar#contacto">escríbenos</a>.
        </p>
      </div>
      <Listado />
    </section>
  );
}
