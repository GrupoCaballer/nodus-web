import type { Metadata } from "next";
import VenderPage from "@/components/VenderPage/VenderPage";
import vender from "@/content/vender.json";
import { SITE } from "@/lib/site";
import { allSituaciones } from "@/lib/situaciones";

export const metadata: Metadata = {
  title: "Vender piso en Valencia",
  description:
    "Vender tu piso en Valencia: valoración con criterio, web propia de tu vivienda, vídeo profesional y visitas filtradas hasta la notaría. Godella y área metropolitana.",
  alternates: { canonical: "/vender" },
  openGraph: {
    title: "Vender piso en Valencia | Nodus Real Estate",
    description: "Cada paso de la venta, conectado: valoración, web propia, vídeo, visitas filtradas y notaría.",
    url: "/vender",
    images: ["/fotos/vender-aereo.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phone,
      areaServed: ["Valencia", "Godella", "Rocafort", "Bétera", "L'Horta Nord", "Comunitat Valenciana"],
      address: { "@type": "PostalAddress", addressLocality: "Godella", addressRegion: "Valencia", addressCountry: "ES" },
    },
    {
      "@type": "FAQPage",
      mainEntity: vender.faq.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: f.respuesta },
      })),
    },
  ],
};

export default async function Page() {
  const situaciones = (await allSituaciones()).map(({ slug, titulo }) => ({ slug, titulo }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VenderPage situaciones={situaciones} />
    </>
  );
}
