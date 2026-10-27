import type { Metadata } from "next";
import ServiciosPage from "@/components/ServiciosPage/ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios: renders, valoración, off market, financiación e inversión",
  description:
    "Renders y presupuesto de reforma antes de comprar, valoración con criterio, activos off market, broker hipotecario con Bayteca, inversión y alquiler por habitaciones. Nodus Real Estate, València.",
  alternates: { canonical: "/servicios" },
};

export default function Page() {
  return <ServiciosPage />;
}
