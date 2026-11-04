import type { Metadata } from "next";
import AlquilarPage from "@/components/AlquilarPage/AlquilarPage";
import alquilar from "@/content/alquilar.json";

export const metadata: Metadata = {
  title: "Alquiler por habitaciones en Valencia",
  description:
    "Alquiler por habitaciones en Valencia: puesta en marcha desde 500 €, búsqueda de inquilinos y gestión total por el 10 % mensual.",
  alternates: { canonical: "/alquilar" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Gestión de alquiler por habitaciones",
      areaServed: "Valencia",
      provider: { "@type": "RealEstateAgent", name: "Nodus Real Estate" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de alquiler",
        itemListElement: alquilar.planes.items.map((p) => ({
          "@type": "Offer",
          name: p.nombre,
          description: p.texto,
          priceSpecification: { "@type": "PriceSpecification", description: `${p.precio}. ${p.nota}` },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: alquilar.faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AlquilarPage />
    </>
  );
}
