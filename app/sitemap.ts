import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog";
import { GUIAS } from "@/lib/zonas";
import { PROPIEDADES } from "@/lib/propiedades";
import { allSituaciones } from "@/lib/situaciones";
import { SITE } from "@/lib/site";

const FIJAS = ["", "/propiedades", "/vender", "/comprar", "/alquilar", "/zonas", "/servicios", "/blog", "/nosotros", "/contacto"];

// Solo páginas indexables: fuera los borradores (noindex) y las legales.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => SITE.url + path;
  const posts = (await allPosts()).filter((p) => !p.borrador);
  const situaciones = (await allSituaciones()).filter((s) => !s.borrador);
  return [
    ...FIJAS.map((p) => ({ url: url(p) })),
    ...situaciones.map((s) => ({ url: url(`/vender/${s.slug}`), lastModified: s.fecha })),
    ...GUIAS.map((g) => ({ url: url(`/zonas/${g.slug}`) })),
    ...PROPIEDADES.map((p) => ({ url: url(`/propiedades/${p.slug}`) })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.fecha })),
  ];
}
