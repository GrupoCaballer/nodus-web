import type { Metadata } from "next";
import { og } from "@/lib/og";
import { notFound } from "next/navigation";
import Ficha from "@/components/Propiedades/Ficha";
import { PROPIEDADES, fotosDe, getPropiedad, nombreZona } from "@/lib/propiedades";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROPIEDADES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPropiedad(slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumen,
    alternates: { canonical: `/propiedades/${p.slug}` },
    openGraph: { title: p.titulo, description: p.resumen, images: [og(fotosDe(p)[0])] },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const p = getPropiedad(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.titulo,
    description: p.resumen,
    url: `${SITE.url}/propiedades/${p.slug}`,
    image: fotosDe(p).map((f) => SITE.url + f),
    offers: {
      "@type": "Offer",
      price: p.precio,
      priceCurrency: "EUR",
      availability: p.estado === "vendido" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      businessFunction: p.operacion === "venta" ? "http://purl.org/goodrelations/v1#Sell" : "http://purl.org/goodrelations/v1#LeaseOut",
    },
    address: { "@type": "PostalAddress", addressLocality: p.localidad, addressRegion: nombreZona(p.zona), addressCountry: "ES" },
    floorSize: { "@type": "QuantitativeValue", value: p.m2, unitCode: "MTK" },
    numberOfRooms: p.habitaciones,
    numberOfBathroomsTotal: p.banos,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Ficha p={p} />
    </>
  );
}
