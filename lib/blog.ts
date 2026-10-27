import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  imagen: string;
  alt: string;
  autor?: string;
  /** Artículo con TODO pendiente: se muestra en la web pero con noindex y fuera del sitemap. */
  borrador?: boolean;
};

export type Post = PostMeta & { slug: string };

export const CATEGORIAS = ["Mercado", "Comprar", "Vender", "Zonas", "Inversión"] as const;

const DIR = path.join(process.cwd(), "content", "blog");

export const slugs = () =>
  fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

/** Carga el módulo MDX de un artículo (componente + meta). */
export async function loadPost(slug: string) {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as { default: React.ComponentType; meta: PostMeta };
  return { Content: mod.default, meta: mod.meta };
}

/** Todos los artículos ordenados por fecha descendente. */
export async function allPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    slugs().map(async (slug) => {
      const { meta } = await loadPost(slug);
      return { slug, ...meta };
    }),
  );
  return posts.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
