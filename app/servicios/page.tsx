import type { Metadata } from "next";
import ServiciosPage from "@/components/ServiciosPage/ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios inmobiliarios en Valencia",
  description:
    "Venta, compra con renders y presupuesto de reforma, broker hipotecario, alquiler por habitaciones e inversión. Inmobiliaria en Godella.",
  alternates: { canonical: "/servicios" },
};

export default function Page() {
  return <ServiciosPage />;
}
