import type { Metadata } from "next";
import ServiciosPage from "@/components/ServiciosPage/ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios inmobiliarios en Valencia",
  description:
    "Valoración y venta, renders y presupuesto antes de reformar, broker hipotecario, alquiler por habitaciones y operaciones off market e inversión. Nodus, Valencia.",
  alternates: { canonical: "/servicios" },
};

export default function Page() {
  return <ServiciosPage />;
}
