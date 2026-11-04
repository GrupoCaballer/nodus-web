import zonasIndex from "@/content/zonas.json";
import godella from "@/content/zonas/godella.json";
import rocafort from "@/content/zonas/rocafort.json";
import betera from "@/content/zonas/betera.json";
import paterna from "@/content/zonas/paterna.json";
import laVirgenDeLaVega from "@/content/zonas/la-virgen-de-la-vega.json";
import campolivar from "@/content/zonas/campolivar.json";

export type FotoGaleria = { src: string; alt: string; pie?: string; credito?: string };

/** Guía de municipio con sus urbanizaciones. `video` y `galeria` propios son TODO-MEDIA mientras no existan. */
type Opcionales = "urbanizaciones" | "estilo" | "distancias" | "patrimonio";

/**
 * Guía de municipio o de urbanización. Las secciones de `Opcionales` pueden faltar en las guías de urbanización
 * (Campolivar, Santa Bárbara…): mejor sin sección que con relleno sin fuente.
 */
export type Guia = Omit<typeof godella, "galeria" | "video" | Opcionales> & Partial<Pick<typeof godella, Opcionales>> & {
  /** Municipio al que pertenece una urbanización con guía propia (su guía enlaza a la del municipio y al revés). */
  padre?: string;
  /** Meta description escrita para Google (≤ 155 caracteres). */
  descripcion?: string;
  video: string | null;
  galeria: FotoGaleria[];
};

export const GUIAS: Guia[] = [godella, campolivar, rocafort, betera, paterna, laVirgenDeLaVega] as Guia[];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);

/** Guía que cubre una zona del índice (p. ej. "campolivar" → Godella). */
export const guiaDeZona = (zona: string) => GUIAS.find((g) => g.slug === zona) ?? GUIAS.find((g) => g.zonas.includes(zona));

export const ZONAS_INDEX = zonasIndex;
