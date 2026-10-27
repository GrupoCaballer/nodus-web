"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Heading from "@/components/ui/Heading";
import testimonios from "@/content/testimonios.json";
import styles from "./Testimonios.module.css";

/** 1.7 Testimonios: foto grande a la izquierda, cita en Lora con paginación de círculos a la derecha. Swiper con fade y swipe. */
export default function Testimonios() {
  const el = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!el.current) return;
    swiper.current = new Swiper(el.current, {
      modules: [EffectFade],
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 700,
      loop: false,
      autoHeight: true,
      on: { slideChange: (s) => setActive(s.activeIndex) },
    });
    return () => {
      swiper.current?.destroy(true, true);
    };
  }, []);

  return (
    <section className={styles.root} id="testimonios">
      <div className="container">
        <p className={styles.label}>Lo que dicen</p>
        <Heading
          className={styles.heading}
          strong="No te fíes de nuestra palabra."
          muted="Escucha a quienes ya han comprado o vendido con Nodus."
        />

        <div className={styles.grid}>
          <figure className={styles.photo}>
            <Image src="/fotos/testimonios-terraza.webp" alt="Terrazas de cafeterías en una calle de València" fill sizes="(max-width: 768px) 100vw, 45vw" className={styles.img} />
          </figure>

          <div className={styles.slider}>
            <ol className={styles.dots} aria-label="Elegir testimonio">
              {testimonios.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={i === active ? styles.dotActive : styles.dot}
                    aria-current={i === active}
                    onClick={() => swiper.current?.slideTo(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>

            <span className={styles.quoteMark} aria-hidden>
              “
            </span>

            <div ref={el} className="swiper">
              <div className="swiper-wrapper">
                {testimonios.map((t) => (
                  <blockquote key={t.id} className={`swiper-slide ${styles.slide}`}>
                    <p className={styles.quote}>{t.texto}</p>
                    <footer className={styles.meta}>
                      <cite>{t.nombre}</cite>
                      <span aria-hidden> / </span>
                      <span className={styles.stars} aria-label={`${t.estrellas} de 5 estrellas`}>
                        {"★".repeat(t.estrellas)}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
