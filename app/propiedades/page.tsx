import type { Metadata } from "next";
import Listado from "@/components/Propiedades/Listado";
import Heading from "@/components/ui/Heading";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Propiedades en venta y alquiler",
  description:
    "Pisos, chalets y casas en Valencia, Godella, Campolivar y La Virgen de la Vega. Pocas propiedades a la vez y toda la atención en cada una.",
  alternates: { canonical: "/propiedades" },
};

export default function Page() {
  return (
    <section className={`container ${styles.root}`}>
      <div className={styles.head}>
        <Heading as="h1" strong="Pocas propiedades." muted="Toda la atención en cada una." breakMuted />
        <p>
          Llevamos pocas propiedades a la vez, a propósito: cada una sale con su web, su vídeo y sus visitas filtradas, y se
          vende antes de captar la siguiente. Si no está aquí lo que buscas, <a href="/comprar#contacto">buscamos contigo</a>.
        </p>
      </div>
      <Listado />
    </section>
  );
}
