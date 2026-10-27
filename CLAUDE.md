# Nodus Real Estate — web

Proyecto Next.js 15 + TS + CSS Modules + GSAP/ScrollTrigger/SplitText + Lenis.
Referencia de nivel: https://www.findrealestate.com/ (mecánicas y ritmo; nunca copiar textos ni assets).

## Reglas
- Español, trato de usted con particulares. Tono directo, sin humo, frases cortas.
- Marca siempre "Nodus Real Estate" (nunca GC Properties / Grupo Caballer).
- No publicar honorarios de compraventa. Los 3 planes de alquiler sí (ver content/).
- Logo: SVG de /public/logo, monocolor vía currentColor; en dorado sobre negro. No redibujar.
- Paleta (decisión del equipo 27-10-2026): negro #0b0b0b / #000 de fondo, texto #f2efe8, dorado #c8a868 solo en acentos (logo, botones, etiquetas, viñetas, cursor). El hero conserva el cielo con texto oscuro. Sin degradados, sin sombras, sin iconos genéricos, sin emojis.
- Tipografía fluida: html font-size en vw, todo en rem. Instrument Sans + Lora vía next/font.
- Animación: un único registro de GSAP en components/motion/gsap.ts; Lenis en LenisProvider; respetar prefers-reduced-motion.
- Imágenes: next/image, WebP, alt en español. Solo imágenes libres (Pexels/Unsplash) o propias.
- Nada de datos inventados: si falta una reseña, un artículo o una propiedad, dejar `TODO-…` visible y avisar.
- Antes de cerrar una tarea: `npm run lint && npm run build` y captura con Playwright de desktop (1440) y móvil (390) de la sección tocada.

## Skills
Leer `frontend-design` antes de maquetar; `webapp-testing` para validar; skills `seo-*` al final de cada página; `nodus-web` siempre.
