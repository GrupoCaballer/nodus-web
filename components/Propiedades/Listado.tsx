"use client";

import { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import { PROPIEDADES, TIPOS, nombreZona, type Propiedad } from "@/lib/propiedades";
import styles from "./Listado.module.css";

type Filtros = { operacion: "" | Propiedad["operacion"]; tipo: "" | Propiedad["tipo"]; zona: string; max: string; hab: string };
const INICIAL: Filtros = { operacion: "", tipo: "", zona: "", max: "", hab: "" };

/** Listado con filtros en cliente sobre content/propiedades.json (fase 2: Airtable con ISR). */
export default function Listado() {
  const [f, setF] = useState<Filtros>(INICIAL);
  const set = (k: keyof Filtros) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const zonas = useMemo(() => [...new Set(PROPIEDADES.map((p) => p.zona))].map((z) => ({ slug: z, nombre: nombreZona(z) ?? z })), []);

  const lista = useMemo(
    () =>
      PROPIEDADES.filter(
        (p) =>
          (!f.operacion || p.operacion === f.operacion) &&
          (!f.tipo || p.tipo === f.tipo) &&
          (!f.zona || p.zona === f.zona) &&
          (!f.max || p.precio <= Number(f.max)) &&
          (!f.hab || p.habitaciones >= Number(f.hab)),
      ).sort((a, b) => Number(a.estado === "vendido") - Number(b.estado === "vendido")),
    [f],
  );

  const activos = Object.values(f).filter(Boolean).length;

  return (
    <>
      <form className={styles.filters} onSubmit={(e) => e.preventDefault()} aria-label="Filtrar propiedades">
        <label>
          <span>Operación</span>
          <select value={f.operacion} onChange={set("operacion")}>
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </label>
        <label>
          <span>Tipo</span>
          <select value={f.tipo} onChange={set("tipo")}>
            <option value="">Todos</option>
            {Object.entries(TIPOS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Zona</span>
          <select value={f.zona} onChange={set("zona")}>
            <option value="">Todas</option>
            {zonas.map((z) => (
              <option key={z.slug} value={z.slug}>
                {z.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Precio máximo</span>
          <select value={f.max} onChange={set("max")}>
            <option value="">Sin límite</option>
            <option value="3000">3.000 €/mes</option>
            <option value="300000">300.000 €</option>
            <option value="400000">400.000 €</option>
            <option value="600000">600.000 €</option>
          </select>
        </label>
        <label>
          <span>Habitaciones</span>
          <select value={f.hab} onChange={set("hab")}>
            <option value="">Cualquiera</option>
            <option value="2">2 o más</option>
            <option value="3">3 o más</option>
            <option value="4">4 o más</option>
          </select>
        </label>
        {activos > 0 && (
          <button type="button" className={styles.reset} onClick={() => setF(INICIAL)}>
            Quitar filtros
          </button>
        )}
      </form>

      <p className={styles.count} aria-live="polite">
        {lista.length === 1 ? "1 propiedad" : `${lista.length} propiedades`}
      </p>

      <h2 className="visually-hidden">Propiedades disponibles</h2>
      {lista.length ? (
        <ul className={styles.grid}>
          {lista.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          Con esos filtros no hay nada publicado ahora mismo. Llevamos pocas viviendas a la vez: <a href="/comprar#contacto">cuéntanos qué buscas</a> y lo buscamos contigo.
        </p>
      )}
    </>
  );
}
