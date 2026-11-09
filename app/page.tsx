import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import Gancho from "@/components/Gancho/Gancho";
import QuienesSomos from "@/components/QuienesSomos/QuienesSomos";
import WhyNodus from "@/components/WhyNodus/WhyNodus";
import Experiencia from "@/components/Experiencia/Experiencia";
import Servicios from "@/components/Servicios/Servicios";
import CtaFinal from "@/components/CtaFinal/CtaFinal";
import SideMenu from "@/components/SideMenu/SideMenu";
import { allPosts } from "@/lib/blog";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Home en dos partes (decisión del equipo, 27-10-2026):
//  · Recorrido principal, obligatorio y ligero: intro → gancho (sin separar comprador y vendedor) → quiénes somos → cómo trabajamos (desde la experiencia) → por qué elegirnos (Vender / Comprar / Alquilar, con lo esencial de cada camino) → reseñas.
//  · Menú lateral, que se abre al terminar el recorrido: propiedades, zonas, blog, servicios, contacto.
export default async function Home() {
  const posts = (await allPosts()).slice(0, 3).map((p) => ({ slug: p.slug, titulo: p.titulo, categoria: p.categoria }));
  return (
    <>
      <Hero />
      <Gancho />
      <QuienesSomos />
      <WhyNodus />
      <Experiencia />
      <Servicios />
      <div data-story-end>
      </div>
      <CtaFinal />
      <SideMenu posts={posts} />
    </>
  );
}
