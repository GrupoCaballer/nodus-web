import zonasIndex from "@/content/zonas.json";
import campolivar from "@/content/zonas/campolivar.json";
import torreEnConill from "@/content/zonas/torre-en-conill.json";
import santaBarbara from "@/content/zonas/santa-barbara.json";
import laVirgenDeLaVega from "@/content/zonas/la-virgen-de-la-vega.json";

export type FotoGaleria = { src: string; alt: string; pie?: string };

/** Guía de zona. `video` y `galeria` son material propio (TODO-MEDIA mientras no exista). */
export type Guia = Omit<typeof campolivar, "galeria" | "video"> & {
  video: string | null;
  galeria: FotoGaleria[];
};

/** Guías redactadas. El resto de zonas del índice todavía no tiene guía. */
export const GUIAS: Guia[] = [campolivar, torreEnConill, santaBarbara, laVirgenDeLaVega] as Guia[];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);

export const ZONAS_INDEX = zonasIndex;
