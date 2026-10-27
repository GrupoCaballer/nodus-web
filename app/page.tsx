import Hero from "@/components/Hero/Hero";
import Gancho from "@/components/Gancho/Gancho";
import QuienesSomos from "@/components/QuienesSomos/QuienesSomos";
import WhyNodus from "@/components/WhyNodus/WhyNodus";
import Steps from "@/components/Steps/Steps";
import Servicios from "@/components/Servicios/Servicios";
import Testimonios from "@/components/Testimonios/Testimonios";
import CtaFinal from "@/components/CtaFinal/CtaFinal";
import SideMenu from "@/components/SideMenu/SideMenu";
import { allPosts } from "@/lib/blog";

// Home en dos partes (decisión del equipo, 27-10-2026):
//  · Recorrido principal, obligatorio y ligero: intro → gancho → quiénes somos → cómo trabajamos → por qué elegirnos → reseñas.
//  · Menú lateral, que se abre al terminar el recorrido: propiedades, zonas, blog, servicios, contacto.
export default async function Home() {
  const posts = (await allPosts()).slice(0, 3).map((p) => ({ slug: p.slug, titulo: p.titulo, categoria: p.categoria }));
  return (
    <>
      <Hero />
      <Gancho />
      <QuienesSomos />
      <WhyNodus />
      <Steps />
      <Servicios />
      <div data-story-end>
        <Testimonios />
      </div>
      <CtaFinal />
      <SideMenu posts={posts} />
    </>
  );
}
