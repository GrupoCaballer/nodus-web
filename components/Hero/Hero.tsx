"use client";

import Image from "next/image";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { KNOT_CENTERLINE, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";
import styles from "./Hero.module.css";

/**
 * Hero de 500vh (350vh en móvil) con un hijo sticky de 100vh.
 * Ritmo medido en la referencia (progreso 0→1, scrub):
 *  0.00–0.20  el titular se funde (escala y baja durante todo el recorrido)
 *  0.10–0.50  el contorno del logo se dibuja en trazo blanco sobre la fachada
 *  0.33–0.50  fundido cruzado: edificio entero → edificio visto a través del logo
 *  0.50–1.00  nada nuevo: edificio, nubes y niebla siguen su deriva (ease-out)
 *  final      banda blanca en degradado enlaza con la sección siguiente
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const rise = isMobile ? -22 : -36; // vh que sube el edificio
      const grow = isMobile ? 1.2 : 1.3;

      // Todos los trazados del contorno se dibujan con dasharray.
      const paths = q<SVGPathElement>("[data-outline] path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Titular: opacidad en el primer 20 %, escala y bajada durante todo el recorrido
      tl.to(q("[data-content]"), { opacity: 0, duration: 0.2 }, 0);
      tl.to(q("[data-content]"), { scale: 0.9, y: "20vh", duration: 1, ease: "power1.out" }, 0);

      // Edificio (ambas copias), nubes y niebla: deriva lenta con ease-out
      tl.to(q("[data-house]"), { scale: grow, y: `${rise}vh`, duration: 1, ease: "power1.out" }, 0);
      tl.to(q("[data-cloud='1']"), { x: "-9vw", duration: 1, ease: "power1.out" }, 0);
      tl.to(q("[data-cloud='2']"), { x: "7vw", duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(q("[data-smoke]"), { y: "33vh" }, { y: "0vh", duration: 1, ease: "power1.out" }, 0);

      // Contorno: aparece enseguida y se dibuja del 10 % al 50 %
      tl.to(q("[data-outline]"), { opacity: 1, duration: 0.02 }, 0);
      tl.to(paths, { strokeDashoffset: 0, duration: 0.4 }, 0.1);
      tl.to(q("[data-outline]"), { opacity: 0, duration: 0.22 }, 0.33);

      // Fundido cruzado edificio → edificio enmascarado
      tl.to(q("[data-house-plain]"), { opacity: 0, duration: 0.17 }, 0.33);
      tl.to(q("[data-composite]"), { opacity: 1, duration: 0.17 }, 0.33);
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.root} data-header-over aria-label="Presentación">
      <div className={styles.top}>
        <div className={styles.back}>
          <Image src="/hero/cielo.webp" alt="" fill priority sizes="100vw" className={styles.cover} />
        </div>

        <div className={styles.house} data-house data-house-plain>
          <Image
            src="/hero/edificio.webp"
            alt="Chalet contemporáneo blanco con jardín mediterráneo en la Marina Alta, Alicante"
            width={2200}
            height={898}
            priority
            sizes="(max-width: 768px) 240vw, 104vw"
            className={styles.houseImg}
          />
        </div>

        {/* Copia del edificio vista a través del logotipo */}
        <div className={styles.composite} data-composite aria-hidden>
          <div className={styles.house} data-house>
            <Image src="/hero/edificio.webp" alt="" width={2200} height={898} sizes="(max-width: 768px) 300vw, 104vw" className={styles.houseImg} />
          </div>
        </div>

        <div className={styles.clouds} aria-hidden>
          <Image src="/hero/nube-1.webp" alt="" width={1226} height={550} className={styles.cloud1} data-cloud="1" sizes="60vw" />
          <Image src="/hero/nube-2.webp" alt="" width={1375} height={926} className={styles.cloud2} data-cloud="2" sizes="50vw" />
        </div>

        {/* Contorno del logo (nudo + letras) dibujándose */}
        <svg className={styles.outline} viewBox={LOGO_VIEWBOX} data-outline aria-hidden>
          <path d={KNOT_CENTERLINE} className={styles.knotStroke} />
          {LOGO_PATHS.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" className={styles.letterStroke} />
          ))}
        </svg>

        <div className={styles.smoke} data-smoke aria-hidden>
          <Image src="/hero/niebla.webp" alt="" width={2400} height={800} sizes="120vw" className={styles.smokeImg} />
        </div>

        <div className={styles.content} data-content>
          <h1 className={styles.title}>El punto donde todo converge.</h1>
          <p className={styles.sub}>
            Asesoramiento inmobiliario integral en València. <span>Desde la primera visita hasta la firma.</span>
          </p>
          <Button href="/propiedades">Ver propiedades</Button>
        </div>
      </div>

      {/* Banda blanca que enlaza con la sección siguiente al final del recorrido */}
      <div className={styles.fade} aria-hidden />
    </section>
  );
}
