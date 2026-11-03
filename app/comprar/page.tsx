import type { Metadata } from "next";
import ComprarPage from "@/components/ComprarPage/ComprarPage";
import comprar from "@/content/comprar.json";

export const metadata: Metadata = {
  title: "Comprar vivienda en Valencia",
  description:
    "Comprar propiedad en Valencia con asesor: viviendas fuera de portales, reforma con renders y presupuesto antes de ofertar, e hipoteca estudiada.",
  alternates: { canonical: "/comprar" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: comprar.faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ComprarPage />
    </>
  );
}
