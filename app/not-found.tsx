import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container" style={{ paddingTop: "calc(var(--header-h) + 16rem)", paddingBottom: "22rem" }}>
      <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: 500, lineHeight: 1.08 }}>Esta página no existe.</h1>
      <p style={{ marginTop: "3rem", marginBottom: "6rem", color: "var(--muted)", fontSize: "var(--fs-h3)" }}>
        Puede que la dirección haya cambiado con la web nueva.
      </p>
      <Button href="/">Volver al inicio</Button>
    </section>
  );
}
