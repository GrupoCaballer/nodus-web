import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Guia from "@/components/Zonas/Guia";
import { GUIAS, getGuia } from "@/lib/zonas";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return {
    title: g.municipio === g.nombre ? `Inmobiliaria en ${g.nombre}` : `Inmobiliaria en ${g.nombre}, ${g.municipio}`,
    description: g.intro,
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
    description: g.intro,
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
