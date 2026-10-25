import zonasIndex from "@/content/zonas.json";
import campolivar from "@/content/zonas/campolivar.json";
import torreEnConill from "@/content/zonas/torre-en-conill.json";
import santaBarbara from "@/content/zonas/santa-barbara.json";
import laVirgenDeLaVega from "@/content/zonas/la-virgen-de-la-vega.json";

export type Guia = typeof campolivar;

/** Guías redactadas. El resto de zonas del índice todavía no tiene guía. */
export const GUIAS: Guia[] = [campolivar, torreEnConill, santaBarbara, laVirgenDeLaVega];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);

export const ZONAS_INDEX = zonasIndex;
