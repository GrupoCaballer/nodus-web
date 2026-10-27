import Hero from "@/components/Hero/Hero";
import Gancho from "@/components/Gancho/Gancho";
import QuienesSomos from "@/components/QuienesSomos/QuienesSomos";
import WhyNodus from "@/components/WhyNodus/WhyNodus";
import Steps from "@/components/Steps/Steps";
import Chevrons from "@/components/Chevrons/Chevrons";
import Servicios from "@/components/Servicios/Servicios";
import Extras from "@/components/Extras/Extras";
import Testimonios from "@/components/Testimonios/Testimonios";
import PropiedadesHome from "@/components/PropiedadesHome/PropiedadesHome";
import Zonas from "@/components/Zonas/Zonas";
import BlogList from "@/components/Blog/BlogList";
import CtaFinal from "@/components/CtaFinal/CtaFinal";
import { allPosts } from "@/lib/blog";

// Home como relato (decisión del equipo, 27-10-2026):
// intro limpia → gancho → quiénes somos → cómo trabajamos → por qué elegirnos → reseñas → propiedades → zonas → blog → cierre
export default async function Home() {
  const posts = (await allPosts()).slice(0, 3);
  return (
    <>
      <Hero />
      <Gancho />
      <QuienesSomos />
      <WhyNodus />
      <Steps />
      <Chevrons />
      <Servicios />
      <Extras />
      <Testimonios />
      <PropiedadesHome />
      <Zonas />
      <BlogList posts={posts} />
      <CtaFinal />
    </>
  );
}
