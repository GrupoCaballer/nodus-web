import type { Metadata } from "next";
import NosotrosPage from "@/components/NosotrosPage/NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros: equipo y forma de trabajar",
  description:
    "Nodus Real Estate es una agencia joven de Godella (Valencia): el punto donde se encuentran quien vende y quien compra. Equipo, valores y forma de trabajar.",
  alternates: { canonical: "/nosotros" },
};

export default function Page() {
  return <NosotrosPage />;
}
