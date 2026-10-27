import zonasIndex from "@/content/zonas.json";
import godella from "@/content/zonas/godella.json";
import rocafort from "@/content/zonas/rocafort.json";
import betera from "@/content/zonas/betera.json";
import paterna from "@/content/zonas/paterna.json";
import laVirgenDeLaVega from "@/content/zonas/la-virgen-de-la-vega.json";

export type FotoGaleria = { src: string; alt: string; pie?: string; credito?: string };

/** Guía de municipio con sus urbanizaciones. `video` y `galeria` propios son TODO-MEDIA mientras no existan. */
export type Guia = Omit<typeof godella, "galeria" | "video"> & {
  video: string | null;
  galeria: FotoGaleria[];
};

export const GUIAS: Guia[] = [godella, rocafort, betera, paterna, laVirgenDeLaVega] as Guia[];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);

/** Guía que cubre una zona del índice (p. ej. "campolivar" → Godella). */
export const guiaDeZona = (zona: string) => GUIAS.find((g) => g.slug === zona || g.zonas.includes(zona));

export const ZONAS_INDEX = zonasIndex;
