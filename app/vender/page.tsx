import type { Metadata } from "next";
import { og } from "@/lib/og";
import VenderPage from "@/components/VenderPage/VenderPage";
import vender from "@/content/vender.json";
import { allSituaciones } from "@/lib/situaciones";

export const metadata: Metadata = {
  title: "Vender piso en Valencia",
  description:
    "Vender su propiedad en Valencia y Godella: valoración, web propia de la vivienda, vídeo profesional y visitas filtradas hasta la notaría.",
  alternates: { canonical: "/vender" },
  openGraph: {
    title: "Vender piso en Valencia | Nodus Real Estate",
    description: "Cada paso de la venta, conectado: valoración, web propia, vídeo, visitas filtradas y notaría.",
    url: "/vender",
    images: [og("/fotos/vender-aereo.webp")],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
  // Las situaciones en borrador (revisión legal pendiente) no se enlazan hasta que Nodus las apruebe.
  const situaciones = (await allSituaciones())
    .filter((s) => !s.borrador)
    .map(({ slug, titulo }) => ({ slug, titulo }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VenderPage situaciones={situaciones} />
    </>
  );
}
