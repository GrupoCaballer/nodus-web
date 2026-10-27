import fs from "node:fs";
import path from "node:path";

// Páginas de /vender/[slug]: un caso concreto del vendedor (con inquilino, herencia, hipoteca, gastos).
// Mismo formato MDX que el blog; cada una responde a un grupo del estudio de palabras clave de octubre de 2026.
export type SituacionMeta = {
  titulo: string;
  /** Texto corto para enlazar desde /vender. */
  corto: string;
  fecha: string;
  resumen: string;
  /** Pendiente de revisión legal o fiscal: noindex y fuera del sitemap hasta que alguien lo valide. */
  borrador?: boolean;
};

export type Situacion = SituacionMeta & { slug: string };

const DIR = path.join(process.cwd(), "content", "vender");

export const slugsSituaciones = () =>
  fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

export async function loadSituacion(slug: string) {
  const mod = (await import(`@/content/vender/${slug}.mdx`)) as { default: React.ComponentType; meta: SituacionMeta };
  return { Content: mod.default, meta: mod.meta };
}

export async function allSituaciones(): Promise<Situacion[]> {
  return Promise.all(
    slugsSituaciones().map(async (slug) => {
      const { meta } = await loadSituacion(slug);
      return { slug, ...meta };
    }),
  );
}
