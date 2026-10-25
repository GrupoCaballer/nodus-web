import type { Metadata } from "next";
import NosotrosPage from "@/components/NosotrosPage/NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros: equipo y forma de trabajar",
  description:
    "Nodus Real Estate es una agencia de Godella (València) que lleva pocas viviendas a la vez para dedicarles toda la atención. Equipo, valores, reforma con renders, financiación e inversión.",
  alternates: { canonical: "/nosotros" },
};

export default function Page() {
  return <NosotrosPage />;
}
