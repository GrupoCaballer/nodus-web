# Web Nodus Real Estate — brief para Claude Code

Objetivo: construir desde cero la web de **Nodus Real Estate** (agencia inmobiliaria de Godella, València) igualando el nivel de **https://www.findrealestate.com/** (referencia principal, analizada abajo pieza a pieza), adaptada a la Comunitat Valenciana. Misma arquitectura de scroll, mismas mecánicas de animación, mismo ritmo tipográfico. Contenido, logo y voz de Nodus.

Lee primero `contexto/nodus.md` (quién es Nodus, voz, reglas) y `contexto/contenido-web-actual.md` (todos los textos de la web actual nodusrealestate.com que hay que conservar: servicios, propiedades, FAQ, aviso legal del titular Adrián). Los SVG del logo están en `assets/`.

---

## 0. Decisiones ya tomadas (no preguntar)

| Tema | Decisión |
|---|---|
| Stack | **Next.js 15 (App Router) + TypeScript + CSS Modules** (la referencia es Next.js en Vercel). Animación con **GSAP 3 + ScrollTrigger + SplitText** (SplitText es gratuito desde GSAP 3.13) y **Lenis** para smooth scroll. Carrusel de testimonios con **Swiper**. Sin Tailwind, sin Framer Motion, sin librerías de UI. |
| Idioma | Español (castellano). Preparar `next-intl` o estructura `/[locale]` solo si sale gratis; no es prioridad. Segunda fase: valenciano e inglés. |
| Fuentes | **Instrument Sans** (titulares y UI, pesos 500/600/700) + **Lora** (citas y testimonios, 400 regular e itálica), igual que la referencia. Cargar con `next/font/google`. |
| Color | Blanco `#FFFFFF`, negro tinta `#151717` (texto), negro de secciones oscuras `#000000`, gris apagado = texto a `rgba(21,23,23,.5)` sobre claro y `rgba(255,255,255,.4)` sobre oscuro. **Sin dorado, sin azul marino, sin degradados.** El logo de Nodus va en negro sobre claro y blanco sobre oscuro (SVG monocolor; ignorar el dorado del archivo original). |
| Logo | Tal cual está en `assets/nodus-marca.svg` (nudo infinito) y `assets/nodus-logo.svg` (nudo + palabra). No se redibuja. `assets/knot-path.json` contiene la línea central del nudo (path SVG) por si se quiere animar el trazo con `stroke-dasharray`. |
| Honorarios | **No se publican honorarios de compraventa.** Los tres planes de alquiler con precio que ya están en la web actual sí se mantienen (ver contenido). |
| Fotos | **Imágenes libres** (Pexels / Unsplash, licencia libre) de València y la Comunitat Valenciana. Nada de fotos de Nueva York ni de la referencia. Listado de assets en §4. Fotos reales de propiedades vendrán después (Airtable "Cartera Nodus Real Estate"), dejar los slots preparados. |
| Formulario | Server Action que envía a un endpoint de correo (Resend o Nodemailer vía SMTP de Gmail) a `info@nodusrealestate.com`. Variables en `.env.local`. Honeypot + rate limit. Sin captcha visible. |
| Despliegue | Vercel. Dominio `nodusrealestate.com` se conecta después. |
| Estética | Prohibido todo lo que delate IA: iconos genéricos, tarjetas con sombra, degradados, numerales decorativos tipo "01 / 02" gigantes, bloques de cifras repetidos, emojis. Fotos grandes, poco texto, mucho aire. |

---

## 1. Análisis técnico de findrealestate.com (lo que hay que igualar)

Datos tomados inspeccionando la página en producción (24-10-2026, viewport 1234×669).

### 1.1 Stack detectado
- Next.js (App Router, `_next/static/media`, imágenes por `next/image`), desplegado en Vercel.
- `html.lenis` → **Lenis** smooth scroll, integrado con ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`).
- **GSAP + ScrollTrigger** con `scrub` (3 timelines scrub detectadas) y **SplitText** (titulares que se "encienden" palabra a palabra / línea a línea al hacer scroll).
- **Swiper** para el carrusel de testimonios.
- `clip-path` para las flechas/chevrones de la sección "This isn't just about real estate".
- `mask-image` con un SVG inline (data URI del logotipo) en el hero: la casa se ve **a través de las letras del logo**.
- CSS Modules (`hero_root__N0Loz`, `why-us_root__aGsFp`, `arrows-section_root__yyPBl`, `testimonials_root__PiYLZ`, `services_root__Ch_WM`).
- Tipografía fluida: `html { font-size: ~0.52vw }` (body = 6.43 px a 1234 px de ancho) y todo en `rem`, de forma que la maqueta escala proporcional al viewport. **Replicar este patrón** (`font-size: clamp(5px, 0.52vw, 9px)` en `html`, con un breakpoint móvil que lo suba a ~2.2vw).
- Fuentes: `Instrument Sans` (todo) y `Lora` (testimonios).
- Página total: 11 618 px de alto a 669 px de viewport (≈ 17 pantallas). El hero solo ocupa 3 345 px (5 pantallas).

### 1.2 Hero — la pieza clave (sección `hero_root`, altura 500vh, hijo `hero_top` en `position: sticky; top: 0; height: 100vh`)

Capas (de atrás a delante), todas `position: absolute` dentro del sticky:

1. `hero_back` → imagen de cielo con nubes (`back.jpg`), cubre todo el viewport.
2. `hero_house` (z-index 1) → PNG del edificio **recortado con fondo transparente**, muy grande (1604×1427 px en un viewport de 1234). Al inicio está centrado abajo; con el scroll **escala de 1 a 1.3 y sube** (`translateY` hasta ≈ −440 px), de modo que el edificio "se acerca" al espectador.
3. `hero_composite` (z-index 1, `mask-image: url(data:image/svg+xml … logo)`, `mask-size: 628px 272px; mask-position: 50% 50%`) → contiene **otra copia** del edificio con la misma transformación. Resultado: fuera de las letras se ve el edificio normal; dentro de las letras también. Después, cuando `hero_house` se desvanece y el cielo queda detrás, **el edificio solo se ve a través de las letras del logo**, sobre cielo (captura 3).
4. `hero_clouds` (z-index 2) → dos PNG de nube (722×307 y 602×255) que se desplazan en horizontal en sentidos opuestos (`translateX` −108 px y +90 px al final), por delante del edificio.
5. `hero_logo` (z-index 1) → el mismo logotipo como **SVG de contorno** (stroke blanco, sin relleno) que aparece dibujándose sobre el edificio en el tramo intermedio (captura 2: "FIND Real Estate" en línea blanca encima de la fachada) y desaparece cuando entra la máscara.
6. `hero_smoke` (z-index 3) → PNG de niebla/humo pegado abajo (1234×398), tapa la base del edificio y se mueve ligeramente.
7. `hero_content` (`position: relative`) → H1 "Find What Moves You" (Instrument Sans 700, 90 px ≈ 14 rem), subtítulo con la segunda mitad en gris, botón pill negro "Find Properties →". Con el scroll **escala a 0.9, baja 134 px y se funde a opacidad 0** en el primer 20 % del recorrido.

Secuencia del scroll (0 → 1 del sticky, `scrub: true`):
- 0.00–0.20: contenido (titular + botón) se encoge y desaparece; edificio empieza a subir y escalar.
- 0.15–0.45: contorno del logo en stroke blanco aparece sobre la fachada (captura 2). Las nubes avanzan.
- 0.45–0.70: el edificio sin máscara se funde; queda el **edificio visto a través de las letras** sobre el cielo (captura 3). El logo con máscara crece ligeramente.
- 0.70–1.00: el cielo sigue subiendo (parallax) y entra la siguiente sección deslizándose por encima; el logo con máscara se desvanece.

La cabecera (logo, nav, "Sign In" pill negro) es fija, fondo blanco, y pasa a transparente sobre el hero.

**Versión Nodus:** mismo esquema, con (a) un edificio valenciano recortado en PNG (ver §4), (b) la máscara = `assets/nodus-logo.svg` (nudo + NODUS), (c) el contorno intermedio = `assets/knot-path.json` dibujándose con `stroke-dashoffset` **antes** de que entre la máscara (el nudo "se dibuja" y después "se llena" con el edificio). H1: **"El punto donde todo converge."** Subtítulo: "Asesoramiento inmobiliario integral en València. Desde la primera visita hasta la firma." Botón: "Ver propiedades →".

### 1.3 "Why FIND" (sección `why-us`, fondo blanco, 1050 px)
- Etiqueta pequeña a la izquierda ("Why FIND", 13 px / 2 rem, peso 600), y a la derecha un párrafo-titular de 46 px (7.2 rem, peso 500) donde **la primera frase está en negro y el resto en gris `rgba(21,23,23,.5)`**. Con el scroll, SplitText divide en palabras y las palabras pasan de gris a negro una a una (scrub).
- Debajo, un **vídeo** (`why-us.mp4`, autoplay, loop, muted, sin controles) a ancho de contenedor, con un *dolly* aéreo sobre la ciudad y desenfoque de movimiento en los bordes (el blur está en el propio vídeo). Al entrar, el vídeo escala desde 0.9 y sube (reveal con scrub).
- Nodus: etiqueta "Por qué Nodus", frase: **"Tu vida cambia. No busques solo una casa: busca lo que viene después.** Te ayudamos a avanzar con claridad, con criterio y con un asesor a tu lado." Vídeo: dron sobre València (Ciudad de las Artes / la Albufera / el Carme) de Pexels (ver §4).

### 1.4 "This isn't just about real estate." (sección `arrows-section`, 705 px)
- Titular centrado 46 px, mitad gris.
- Fila de **4 imágenes recortadas en forma de chevron** (`clip-path: polygon(...)` apuntando a la derecha), 4 retratos/interiores en blanco y negro-cálido. Al hacer scroll las flechas entran escalonadas desde la izquierda (`x: -40, opacity: 0, stagger 0.1`) y al pasar el ratón la imagen se desplaza dentro del chevron (`object-position`).
- Párrafo centrado debajo, mitad gris.
- Nodus: "**Esto no va solo de inmuebles.** Va de identidad. De avanzar. De desatascarse. No buscas solo un lugar: buscas que todo encaje. Eso es lo que te ayudamos a encontrar." Imágenes: 4 fotos libres (persona en terraza con la ciudad detrás, interior luminoso, calle del Carme, pareja mirando un piso).

### 1.5 "Real Estate, Rewired." (554 px)
- Dos columnas: izquierda titular 46 px en dos líneas (segunda en gris) + botón pill "Start Your Search →"; derecha etiqueta "Steps:" y **3 filas con línea separadora**, numeradas en gris minúsculo (01, 02, 03) y cada paso con la frase clave en negro y el resto en gris. Reveal por filas (`y: 30, opacity 0, stagger`).
- Nodus: "**Inmobiliaria, reconectada.**" Pasos: 1 **Habla con una persona.** Te asignamos un asesor que escucha, no un formulario. 2 **Gana claridad.** Definimos lo que necesitas, no solo lo que hay disponible. 3 **Avanza.** Encontramos lo que encaja y lo hacemos realidad. Botón: "Empezar a buscar →".

### 1.6 "Don't Rent Your Career. Own It." (1069 px) — sección para captar agentes
- Layout asimétrico: foto vertical pequeña abajo-izquierda (parallax lento), titular grande arriba derecha, foto grande apaisada (bosque de casas) con reveal, párrafo mitad gris, botón "Join The Movement →".
- Nodus: aquí va **"Vende con Nodus"** (propietarios), no agentes. Titular: "**No vendas solo tu casa. Véndela bien.**" Párrafo con los 6 pasos y los diferenciales de `contenido-web-actual.md` resumidos (web propia de la vivienda "con esencia propia", vídeo profesional con dron, Instagram, home staging, filtrado de visitas, acompañamiento hasta notaría; 2 meses de prueba; si vende el propietario a un comprador propio no paga). Botón: "Quiero vender →" (ancla al formulario). Fotos: chalet mediterráneo desde dron + persona en balcón valenciano.

### 1.7 Testimonios "Don't Take Our Word for It." (fondo `#F5F5F3` claro, ≈ 800 px)
- Titular 46 px mitad gris. Izquierda: foto grande (pareja con café en la calle). Derecha: paginación con círculos numerados (1–5, el activo relleno), comillas grandes en Lora, **cita en Lora 20 px**, nombre en mayúsculas pequeñas + " / " + 5 estrellas. Swiper con fade; la foto cambia con cada slide.
- Nodus: 5 reseñas reales de Google del equipo (pedirlas al usuario; mientras, placeholders marcados `TODO-RESEÑA`). Nunca inventar reseñas.

### 1.8 Servicios "How FIND Can Help You" (fondo negro, texto blanco)
- Etiqueta "Services" a la izquierda; titular "How FIND / Can Help You" (segunda línea gris `rgba(255,255,255,.4)`).
- **Tres filas a ancho completo separadas por línea `rgba(255,255,255,.15)`**: a la izquierda un número en círculo (1, 2, 3) y un párrafo de 4–5 líneas; a la derecha la palabra **Buy / Sell / Rent en 150 px (≈ 24 rem) peso 400**. Al hacer hover la fila se abre (altura) y aparece la foto correspondiente (`buy.jpg`, `sell.jpg`, `rent.jpg`) detrás de la palabra con un `clip-path` que se expande; el cursor pasa a "ver". Reveal de cada fila con scrub.
- Cierra con párrafo mitad gris y botón pill blanco "Get Started with FIND →".
- Nodus: "**Cómo te ayuda Nodus**". Filas: **Comprar** (asesor + reforma con renders y presupuesto de obra + broker financiero), **Vender** (web propia, vídeo, home staging, filtrado de visitas, notaría), **Alquilar** (gestión integral; enlaza a los 3 planes). Fotos: interior reformado, fachada modernista de València, terraza con palmeras.

### 1.9 "Support Beyond Buying and Selling" (sigue en negro)
- Titular izquierda 46 px mitad gris, párrafo derecha + botón "Discover Our Services →". Debajo **3 tarjetas-foto apaisadas** con el título encima de la imagen (sin borde ni sombra, texto blanco sobre foto oscurecida) y "Learn More" al pie.
- Nodus: "**Mucho más que comprar y vender**". Tarjetas: **Reforma y renders** (Hugo), **Financiación** (broker hipotecario), **Inversión** (fondos y family offices: dossier, LOI, due diligence). Fotos libres acordes.

### 1.10 Blog & Resources (fondo blanco)
- Titular izquierda, párrafo + botón derecha. Lista de **3 artículos** en filas: fecha mono pequeña, titular 30 px, resumen, botón "Read More →"; foto 16:9 a la derecha con reveal.
- Nodus: "**Blog y recursos**" con 3 artículos reales a redactar (precio por m² por barrios de València 2026, qué mira un comprador en Godella/Rocafort, cómo preparar un piso para vender). Marcar `TODO-ARTÍCULO`; usar MDX en `/content/blog`.

### 1.11 CTA final + barrios
- Foto a sangre (familia en sofá) oscurecida, titular 60 px blanco "Find You. We'll Help You Get There." (segunda parte gris) y botón pill blanco.
- Debajo, bloque blanco "Featured neighborhoods across the tri-state area" con **3 columnas de enlaces de barrios** + "Explore all neighborhoods →".
- Nodus: "**Encuentra tu sitio. Te acompañamos hasta la firma.**" Botón "Hablemos →". Barrios: **València ciudad** (Ruzafa, El Carme, Eixample, Benimaclet, Campanar, Patraix), **L'Horta Nord** (Godella, Rocafort, Burjassot, Paterna, Alboraia, Puçol), **L'Horta Sud y costa** (Torrent, Catarroja, Silla, El Saler, Cullera). Enlaces a `/zonas/[slug]` (páginas con texto breve + propiedades filtradas; en fase 1 pueden ser placeholders con `generateStaticParams`).

### 1.12 Footer (negro)
- Newsletter (input underline + flecha), columnas de enlaces grandes (Search, Agents, Join, About Us, Agent Portal), redes (Facebook, Instagram, YouTube, LinkedIn), bloque de contacto (Head Office / Email / Call Us) en etiquetas minúsculas, **logotipo gigante a sangre** (ocupa ~55 % del ancho) y línea legal final con enlaces pequeños y copyright.
- Nodus: newsletter opcional (si no hay backend, quitar); enlaces: Propiedades, Vender, Alquilar, Nosotros, Contacto; redes: Instagram, TikTok, LinkedIn; contacto: Godella (València), `info@nodusrealestate.com`, teléfono del contenido actual; **logotipo NODUS gigante** (usar `assets/nodus-logo-claro.svg` en blanco); legal: Aviso legal, Privacidad, Cookies, con los datos del titular (Adrián) que figuran en `contenido-web-actual.md`.

### 1.13 Microdetalles transversales
- **Botones**: pill (`border-radius: 999px`), fondo negro / texto blanco (o invertido en oscuro), 13 px, padding 14×22, flecha → que se desplaza 4 px al hover.
- **Titulares "mitad gris"**: patrón sistemático; implementar como `<Heading>` que recibe `<strong>` para la parte negra y el resto en gris, y un hook `useIgnite()` que con SplitText + ScrollTrigger scrub pasa las palabras de gris a negro según se hace scroll (en "Why", en el párrafo de agentes y en el hero del final).
- **Reveals**: imágenes aparecen con `clip-path: inset(0 0 100% 0)` → `inset(0)` y `scale 1.1 → 1`, duración 1.2 s, `power3.out`. Texto con `y: 24, opacity 0`, stagger 0.06.
- **Nav**: transparente sobre el hero, blanca con `backdrop-filter: blur` al salir; se oculta al bajar y aparece al subir.
- **Cursor**: normal (sin punto que sigue al ratón).
- **Cookies**: barra inferior blanca con "Aceptar / Rechazar / Preferencias" (obligatoria en España: Google Analytics solo tras aceptar).
- **Rendimiento**: `next/image` con `priority` solo en el hero; PNG del edificio en WebP con alpha ≤ 400 KB; vídeo `why-us` ≤ 6 MB H.264 + `poster`; `prefers-reduced-motion` → todo estático.
- **Móvil (≤ 768 px)**: hero de 300vh en vez de 500vh, edificio centrado, máscara del logo al 80 % del ancho; filas de servicios en columna; testimonios con swipe; footer apilado.

---

## 2. Arquitectura del proyecto

```
nodus-web/
├─ app/
│  ├─ layout.tsx          (fonts, Lenis provider, Header, Footer, CookieBar)
│  ├─ page.tsx            (home: todas las secciones de §1)
│  ├─ propiedades/        (listado + [slug]; datos desde /content/propiedades/*.json o Airtable en fase 2)
│  ├─ vender/  alquilar/  nosotros/  contacto/
│  ├─ zonas/[slug]/
│  ├─ blog/[slug]/        (MDX)
│  ├─ aviso-legal/ privacidad/ cookies/
│  └─ api/contacto/route.ts
├─ components/
│  ├─ Hero/  WhyNodus/  Chevrons/  Steps/  Vender/  Testimonios/  Servicios/  Extras/  Blog/  CtaFinal/  Zonas/  Footer/  Header/
│  ├─ ui/ Button, Heading (mitad gris), Reveal, PillLink
│  └─ motion/ LenisProvider.tsx, useIgnite.ts, useReveal.ts, gsap.ts (registro de plugins)
├─ content/ (propiedades.json, zonas.json, blog/*.mdx, testimonios.json)
├─ public/ (logo svgs, hero/{edificio.webp, cielo.webp, nube-1.png, nube-2.png, niebla.png}, fotos/)
└─ CLAUDE.md  (copiar el de este brief)
```

Datos de propiedades en fase 1: las 4 que aparecen en `contenido-web-actual.md` como JSON; la ficha `[slug]` reutiliza el estilo de la referencia (galería grande + datos en dos columnas + CTA). Fase 2: Airtable base "Cartera Nodus Real Estate" (`appCBXVAfhsPHShSV`) vía API con ISR.

---

## 3. Skills y herramientas a instalar en Claude Code

Instalar antes de empezar (todas con `npx skills add <repo> --skill <nombre>` o copiando la carpeta a `.claude/skills/`):

| Skill | Para qué | Dónde |
|---|---|---|
| `frontend-design` | Dirección estética, tipografía, evitar "look de plantilla". Leerla antes de maquetar cada sección. | `anthropics/skills` → `skills/frontend-design` |
| `webapp-testing` | Probar la web con Playwright en el navegador (capturas en cada tramo del scroll, móvil/desktop). Imprescindible para validar las animaciones. | `anthropics/skills` → `skills/webapp-testing` |
| `web-artifacts-builder` | No necesaria (es para artefactos de una sola página). **No instalar.** | — |
| `seo-page`, `seo-images`, `seo-local`, `seo-geo` | Metadatos, `alt`, `sitemap`, JSON-LD `RealEstateAgent` + `LocalBusiness` (Godella), imágenes. Pasarlas al final sobre cada página. | `AgriDataHub/claude-seo` (ya clonado en el otro entorno; repo público) |
| `copywriting`, `copy-editing` | Repasar los textos adaptados al tono de Nodus (usted, directo, sin humo). | `coreyhaines31/marketingskills` |
| `nodus-sala-ingenieria` (plugin propio) | Reglas de código del equipo. Ya está empaquetado como `.plugin`; instalar con `/plugin install`. | plugin de Nodus (lo tiene Hugo) |
| Skill nueva **`nodus-web`** | Contexto de marca + reglas de esta web (incluida abajo en §6). Guardarla en `.claude/skills/nodus-web/SKILL.md`. | este brief |

Paquetes npm: `next@15 react react-dom typescript gsap@^3.13 lenis swiper sharp resend` (o `nodemailer`), `@next/mdx`, `gray-matter`, `zod`. Dev: `playwright @playwright/test eslint prettier`.

MCP recomendados en Code: **Playwright MCP** (ver la web en navegador y comparar con la referencia), **Airtable** (fase 2), **Vercel** (deploy).

---

## 4. Assets a conseguir (todos libres)

Buscar en Pexels/Unsplash con estos términos y guardar en `public/`. Los ID de Pexels ya elegidos pueden usarse directamente (licencia Pexels: uso libre, sin atribución).

| Uso | Qué buscar | Notas |
|---|---|---|
| Hero · edificio | "modern mediterranean villa exterior" / "valencia modern apartment building" (**Pexels 19352361** = hotel curvo con balcones, 1400×1867, válido como arranque) | Recortar el fondo con `rembg` (`pip install rembg`) → PNG/WebP con alpha. Idealmente un edificio con terraza y vegetación, luz cálida de tarde. Alternativa de más nivel: pedir a Hugo un render de un chalet de Godella con fondo transparente. |
| Hero · cielo | "soft clouds sky pastel" | Horizontal 2400 px, tono pastel azul-rosa como la referencia. |
| Hero · nubes sueltas | "cloud png transparent" / generar con `rembg` desde una foto de nube sobre cielo plano | 2 PNG con alpha ≈ 1400×600. |
| Hero · niebla | "fog mist png transparent" | 1 PNG con alpha, ancho 2400. |
| Why · vídeo | Pexels vídeo "valencia aerial" / "ciudad de las artes y las ciencias aerial" / "albufera valencia drone" | 10–15 s, 1080p, sin audio; añadir blur radial en bordes con ffmpeg si se quiere igualar la referencia. |
| Chevrons (4) | "woman city terrace", "bright apartment interior", "valencia old town street", "couple visiting apartment" | Tratamiento: ligera desaturación cálida. |
| Vender (2) | "mediterranean house aerial drone" (chalet con piscina), "person balcony valencia" | — |
| Testimonios (5) | Retratos genéricos de personas en calle/cafetería; **o fotos del equipo de Nodus** (mejor). | Nunca fotos que parezcan stock americano. |
| Servicios (3) | "renovated apartment interior", "valencia modernist facade", "rooftop terrace palm trees" | Se ven solo al hover. |
| Extras (3) | "architect plans render", "mortgage signing keys", "investment meeting" | Oscurecer 40 %. |
| Blog (3) | Según artículo. | 16:9. |
| CTA final | "family home sofa" | Oscurecer 50 %. |

---

## 5. Criterios de aceptación (comprobar con Playwright antes de dar por terminado)

1. Lighthouse móvil ≥ 85 rendimiento, 100 accesibilidad, 100 SEO.
2. Hero: a scroll 0 se ve titular + edificio; a 30 % el nudo de Nodus dibujándose en línea blanca sobre el edificio; a 60 % el edificio solo dentro del logo sobre cielo; a 100 % entra "Por qué Nodus" por encima. Sin saltos ni parpadeos; `scrub` real (si paro el scroll, para la animación).
3. Titulares mitad gris que se encienden con el scroll en las 3 secciones indicadas.
4. Filas Comprar / Vender / Alquilar se abren al hover y muestran la foto.
5. Testimonios navegables con los círculos y con swipe.
6. Formulario envía correo real y muestra confirmación sin recargar.
7. Todas las imágenes con `alt` en español; JSON-LD válido; `sitemap.xml` y `robots.txt`.
8. `prefers-reduced-motion`: la página se ve completa sin animaciones.
9. Nada de la referencia (textos, fotos, nombre FIND) queda en el código.

---

## 6. `CLAUDE.md` del proyecto (copiar tal cual en la raíz)

```markdown
# Nodus Real Estate — web

Proyecto Next.js 15 + TS + CSS Modules + GSAP/ScrollTrigger/SplitText + Lenis.
Referencia de nivel: https://www.findrealestate.com/ (mecánicas y ritmo; nunca copiar textos ni assets).

## Reglas
- Español, trato de usted con particulares. Tono directo, sin humo, frases cortas.
- Marca siempre "Nodus Real Estate" (nunca GC Properties / Grupo Caballer).
- No publicar honorarios de compraventa. Los 3 planes de alquiler sí (ver content/).
- Logo: SVG de /public/logo, monocolor. No redibujar, no recolorear en dorado.
- Paleta: blanco, #151717, negro, grises por opacidad. Sin degradados, sin sombras, sin iconos genéricos, sin emojis.
- Tipografía fluida: html font-size en vw, todo en rem. Instrument Sans + Lora vía next/font.
- Animación: un único registro de GSAP en components/motion/gsap.ts; Lenis en LenisProvider; respetar prefers-reduced-motion.
- Imágenes: next/image, WebP, alt en español. Solo imágenes libres (Pexels/Unsplash) o propias.
- Nada de datos inventados: si falta una reseña, un artículo o una propiedad, dejar `TODO-…` visible y avisar.
- Antes de cerrar una tarea: `npm run lint && npm run build` y captura con Playwright de desktop (1440) y móvil (390) de la sección tocada.

## Skills
Leer `frontend-design` antes de maquetar; `webapp-testing` para validar; skills `seo-*` al final de cada página; `nodus-web` siempre.
```

---

## 7. Skill `nodus-web` (guardar en `.claude/skills/nodus-web/SKILL.md`)

```markdown
---
name: nodus-web
description: Contexto de marca y reglas de la web de Nodus Real Estate (València). Usar en cualquier tarea de esta web: textos, maquetación, animaciones, SEO.
---

# Nodus Real Estate
Agencia inmobiliaria de Godella (València). Equipo joven. Zona: València ciudad y área metropolitana (Puçol–Silla, Paterna/Torrent–costa), Comunitat Valenciana e inversión en España, Portugal y Andorra. Hugo hace renders y lleva reforma.

## Servicios (lo que puede decir la web)
Vendedor: web propia de la vivienda "con esencia propia", vídeo profesional (dron en chalets), difusión en Instagram, home staging, filtrado de visitas, acompañamiento hasta notaría. Sin exclusiva clásica: 2 meses de prueba; si el propietario vende a un comprador propio, no paga.
Comprador: asesor, reforma con renders y presupuesto, broker financiero.
Inversión: dossier, LOI, due diligence para fondos y family offices.
Alquiler: 3 planes con precio (en content/).

## Lo que NO puede decir
Honorarios de compraventa. Reseñas, cifras o propiedades inventadas. "Grupo Caballer".

## Voz
Usted. Directo. Frases cortas. Fórmulas fijas: "una web con esencia propia"; "ser los únicos que lo publiquemos en portales nacionales e internacionales". Datos concretos (m², orientación, año, precio/m² de la zona) o nada.

## Estética
Fotos grandes y reales, mucho aire, poco texto. Blanco / #151717 / negro. Titulares con la segunda mitad en gris. Nada que delate IA.

## Mapa de secciones (home)
Hero nudo+edificio → Por qué Nodus (vídeo València) → Esto no va solo de inmuebles (chevrons) → Inmobiliaria, reconectada (3 pasos) → Vende con Nodus → Testimonios → Cómo te ayuda Nodus (Comprar/Vender/Alquilar) → Mucho más que comprar y vender (Reforma, Financiación, Inversión) → Blog → CTA final → Zonas → Footer.
```

---

## 8. Orden de trabajo sugerido para Code

1. `npx create-next-app@latest nodus-web --ts --app --no-tailwind --src-dir=false --eslint` → instalar paquetes, fuentes, LenisProvider, registro GSAP, tipografía fluida, Header/Footer, CookieBar, CLAUDE.md y skills.
2. Conseguir y procesar assets del hero (edificio recortado, cielo, nubes, niebla). Validar con una captura.
3. Hero completo con la secuencia de §1.2. Validar con Playwright a 0 / 30 / 60 / 100 % del scroll, desktop y móvil.
4. Secciones 1.3 → 1.12 en orden, cada una con su reveal y su captura.
5. Páginas interiores (propiedades, vender, alquilar, nosotros, contacto, zonas, blog, legales) reutilizando componentes.
6. Formulario + correo. SEO (skills `seo-*`), JSON-LD, sitemap. Lighthouse.
7. Deploy en Vercel (preview) y entregar enlace.
