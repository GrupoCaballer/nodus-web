# Paso 6 del brief: formulario, SEO, JSON-LD, sitemap, Lighthouse (27-10-2026)

## Comprobado en build de producción (`NEXT_DIST_DIR=.next-prod npm run build`, `next start -p 3100`)

| Página | Rendimiento | Accesibilidad | SEO | Buenas prácticas | LCP |
|---|---|---|---|---|---|
| Home | 90–93 | 100 | 100 | 100 | 2,4–2,8 s |
| /vender | 95 | 100 | 100 | 100 | 1,8 s |
| /comprar | 98 | 100 | 100 | 100 | 1,7 s |
| /propiedades | 99 | 100 | 100 | 100 | 1,6 s |
| /zonas/godella | 93 | 100 | 100 | 100 | 2,2 s |
| /servicios | 86 | 100 | 100 | 100 | 3,9 s |

Lighthouse 12, móvil, preset perf. Criterio del brief: ≥ 85 / 100 / 100.

- `sitemap.xml`: 20 URL (fijas, 5 guías de zona, 5 propiedades); los borradores (blog, vender/[slug]) quedan fuera a propósito y llevan `noindex, follow`.
- `robots.txt`: todo permitido salvo `/api/`; enlaza el sitemap. Bots de IA permitidos.
- Redirecciones 308 de las URL de la web antigua (`/vender-piso-valencia`, `/gestion-alquiler-habitaciones-valencia`, `/zona/...`, legales) y de los slugs antiguos de zonas.
- JSON-LD válido en todas las páginas: `RealEstateAgent` (con `@id`, en layout), `FAQPage` (vender, comprar, alquilar), `Service` (alquilar), `RealEstateListing` (fichas), `Place` (zonas), `BlogPosting` (artículos), `ContactPage` (contacto). Sin duplicados.
- Títulos ≤ 70 caracteres y descripciones ≤ 160 en las páginas revisadas; canonical en todas; ninguna imagen sin `alt`.
- Formulario: acción de servidor, confirma sin recargar, honeypot y límite de envíos. Sin `RESEND_API_KEY` registra el mensaje en el log del servidor y lo avisa en pantalla.

## Pendiente de Nodus (no de código)

- `RESEND_API_KEY` (y `CONTACT_FROM` con dominio verificado) para que el formulario envíe correo real.
- `NEXT_PUBLIC_GTM_ID` (la web antigua usaba GTM-TFWMKL7Z; confirmar). GTM solo se carga tras aceptar la analítica.
- Acceso a Google Analytics y Search Console para claude.nodus@gmail.com.
- Dirección pública de la oficina (TODO-DIRECCION en el JSON-LD de `app/layout.tsx` y en /contacto).
- Revisión legal de las cuatro páginas de `/vender/[slug]` y de los tres artículos del blog antes de quitarles `borrador: true`.

## Siguiente paso del brief

7. Deploy en Vercel (preview) y entregar enlace. Requiere iniciar sesión en Vercel.
