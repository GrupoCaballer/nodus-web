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

// Home: mapa de secciones de la skill nodus-web, en orden.
export default function Home() {
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
      <BlogList />
      <CtaFinal />
      <Zonas />
    </>
  );
}
