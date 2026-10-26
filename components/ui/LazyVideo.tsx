"use client";

import { useEffect, useRef } from "react";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & { src: string; eager?: boolean };

/**
 * Vídeo de fondo que no descarga nada hasta estar cerca del viewport
 * (ahorra megas y trabajo de decodificación en la carga). Con `eager`
 * carga al instante (para banners en la primera pantalla).
 */
export default function LazyVideo({ src, eager = false, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const load = () => {
      if (v.src) return;
      v.src = src;
      v.load();
      v.play().catch(() => {});
    };
    if (eager) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, eager]);

  return <video ref={ref} preload="none" muted loop playsInline {...rest} />;
}
