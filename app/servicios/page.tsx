import type { Metadata } from "next";
import ServiciosPage from "@/components/ServiciosPage/ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios: valoración, renders, financiación, alquiler y off market",
  description:
    "Valoración con criterio, renders y presupuesto de reforma antes de comprar, broker hipotecario con Bayteca, alquiler por habitaciones y operaciones off market e inversión. Nodus Real Estate, Valencia.",
  alternates: { canonical: "/servicios" },
};

export default function Page() {
  return <ServiciosPage />;
}
