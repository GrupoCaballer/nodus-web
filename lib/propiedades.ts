import propiedades from "@/content/propiedades.json";
import zonas from "@/content/zonas.json";

export type Propiedad = (typeof propiedades)[number];
export type Operacion = Propiedad["operacion"];

export const PROPIEDADES: Propiedad[] = propiedades;

export const getPropiedad = (slug: string) => PROPIEDADES.find((p) => p.slug === slug);

export const fotosDe = (p: Propiedad) =>
  Array.from({ length: p.fotos }, (_, i) => `/propiedades/${p.slug}/${String(i + 1).padStart(2, "0")}.webp`);

export const precio = (p: Pick<Propiedad, "precio" | "operacion">) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p.precio) +
  (p.operacion === "alquiler" ? "/mes" : "");

export const nombreZona = (slug: string) => zonas.grupos.flatMap((g) => g.zonas).find((z) => z.slug === slug)?.nombre;

export const TIPOS: Record<Propiedad["tipo"], string> = { piso: "Piso", chalet: "Chalet", casa: "Casa" };

/** Inmuebles parecidos: misma operación primero, después misma zona. Nunca el propio ni los vendidos. */
export const similares = (p: Propiedad, n = 3) =>
  PROPIEDADES.filter((o) => o.slug !== p.slug && o.estado !== "vendido")
    .sort((a, b) => Number(b.zona === p.zona) - Number(a.zona === p.zona) || Number(b.operacion === p.operacion) - Number(a.operacion === p.operacion))
    .slice(0, n);
