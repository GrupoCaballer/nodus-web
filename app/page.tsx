import Hero from "@/components/Hero/Hero";
import WhyNodus from "@/components/WhyNodus/WhyNodus";
import Chevrons from "@/components/Chevrons/Chevrons";
import Steps from "@/components/Steps/Steps";
import Vender from "@/components/Vender/Vender";
import Testimonios from "@/components/Testimonios/Testimonios";
import Servicios from "@/components/Servicios/Servicios";
import Extras from "@/components/Extras/Extras";
import BlogList from "@/components/Blog/BlogList";
import CtaFinal from "@/components/CtaFinal/CtaFinal";
import Zonas from "@/components/Zonas/Zonas";
import { allPosts } from "@/lib/blog";

// Home: mapa de secciones de la skill nodus-web, en orden.
export default async function Home() {
  const posts = (await allPosts()).slice(0, 3);
  return (
    <>
      <Hero />
      <WhyNodus />
      <Chevrons />
      <Steps />
      <Vender />
      <Testimonios />
      <Servicios />
      <Extras />
      <BlogList posts={posts} />
      <CtaFinal />
      <Zonas />
    </>
  );
}
