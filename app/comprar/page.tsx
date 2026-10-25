import type { Metadata } from "next";
import ComprarPage from "@/components/ComprarPage/ComprarPage";
import comprar from "@/content/comprar.json";

export const metadata: Metadata = {
  title: "Comprar vivienda en València",
  description:
    "Asesor asignado, acceso a viviendas off market, reforma con renders y presupuesto antes de ofertar y broker hipotecario. València, Godella, Rocafort y Bétera.",
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
