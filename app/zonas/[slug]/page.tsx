import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Guia from "@/components/Zonas/Guia";
import { GUIAS, getGuia } from "@/lib/zonas";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

/** Meta description ≤ 155 caracteres: las primeras frases enteras de la intro. */
function descripcion(intro: string) {
  let out = "";
  for (const frase of intro.split(/(?<=\.)\s+/)) {
    if ((out + " " + frase).trim().length > 155) break;
    out = (out + " " + frase).trim();
  }
  return out || intro.slice(0, 152) + "…";
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return {
    title: g.municipio === g.nombre ? `Inmobiliaria en ${g.nombre}` : `Inmobiliaria en ${g.nombre}, ${g.municipio}`,
    description: descripcion(g.intro),
    alternates: { canonical: `/zonas/${g.slug}` },
    openGraph: { title: `Vivir en ${g.nombre}`, description: g.intro, images: [g.foto.src] },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${g.nombre}, ${g.municipio}`,
    description: descripcion(g.intro),
    url: `${SITE.url}/zonas/${g.slug}`,
    address: { "@type": "PostalAddress", addressLocality: g.municipio, addressCountry: "ES" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Guia g={g} />
    </>
  );
}
