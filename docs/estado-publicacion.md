# Estado de la web para publicar en nodusrealestate.com

Fecha: 29-10-2026. Commit: c1665d0. Producción provisional: https://nodus-web-umber.vercel.app

## Porcentaje

| Bloque | Estado | Peso en el total |
|---|---|---|
| Desarrollo (páginas, animación, rendimiento, accesibilidad) | 90 % | 40 % |
| Contenido (textos, cifras, reseñas, equipo, fotos, blog) | 55 % | 30 % |
| Publicación (dominio, correo, variables, analítica, repositorio) | 35 % | 20 % |
| Seguridad y legal | 65 % | 10 % |
| **Total ponderado** | **≈ 68 %** | |

Lo que falta no es mucho trabajo de desarrollo: son decisiones y datos de Nodus, y media jornada de configuración. Con los bloqueantes resueltos se puede publicar en una semana.

## Bloqueantes: sin esto no se publica

1. **El formulario no envía correos en producción.** En Vercel no hay ninguna variable de entorno. Sin `RESEND_API_KEY`, el servidor registra el mensaje en el log y responde "enviado" al visitante. Un lead escribiría y nadie lo recibiría. Hace falta: cuenta en Resend, verificar el dominio nodusrealestate.com (registros SPF y DKIM en el DNS), crear la clave y añadir `RESEND_API_KEY`, `CONTACT_TO` y `CONTACT_FROM` en Vercel.
2. **Dominio.** La web vive en una URL de Vercel. Todas las canónicas, el sitemap y el robots apuntan ya a nodusrealestate.com, que hoy sirve la web antigua. Hay que añadir el dominio en Vercel y cambiar los registros DNS (A o CNAME) donde esté registrado. Las redirecciones de las URL antiguas ya están preparadas en `next.config.ts`.
3. **Reseñas y cifras.** Las cinco reseñas y las cifras de la home y de Vender son provisionales, redactadas por indicación del cliente. Publicar reseñas que no existen es publicidad engañosa (Ley 3/1991 de Competencia Desleal y Ley General de Consumidores) y, si se presentan como reseñas de Google, va contra sus normas. Antes del lanzamiento: sustituirlas por reseñas reales (copiadas de Google con nombre y fecha) o dejar la sección oculta.
4. **Repositorio remoto.** El código solo existe en este Mac (30 commits, sin remoto). Un disco roto y se pierde la web. Hace falta un repositorio en GitHub, conectado a Vercel para que cada push despliegue solo.
5. **Dirección pública y datos legales.** El aviso legal usa el titular, NIF y dirección de Quart de Poblet de la web antigua. Dirección debe confirmar que siguen siendo correctos y cuál es la dirección pública (Godella o Quart). Afecta al aviso legal, a la ficha de agencia en Google y a los datos estructurados.

## Seguridad y ciberseguridad

Lo que ya está bien:
- HTTPS con HSTS de dos años y preload (lo pone Vercel).
- Formulario con validación en servidor (zod), honeypot contra bots, límite de 5 envíos por IP cada 10 minutos y sin inyección de HTML (correo en texto plano).
- Sin base de datos, sin panel de administración, sin usuarios: la superficie de ataque es mínima. El contenido vive en ficheros del repositorio.
- Sin cookies hasta que el visitante acepta; la analítica solo carga tras el consentimiento.
- Dependencias: Next 15.5, React 19, sin secretos en el código (`.env.local` y `.vercel/` ignorados por git).

Lo que falta:
- **Cabeceras de seguridad.** Producción solo envía HSTS. Faltan `Content-Security-Policy`, `X-Frame-Options` (o `frame-ancestors`), `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`. Se añaden en `next.config.ts` en una hora; la CSP hay que ajustarla a GTM, Resend y los vídeos.
- **Límite de envíos real.** El límite por IP vive en memoria y en Vercel cada instancia tiene la suya. Para un sitio de este tamaño basta, pero si llega spam conviene pasar a Vercel KV o a Cloudflare Turnstile (sin fricción para el usuario).
- **Vulnerabilidades conocidas.** `npm audit` marca postcss (alta) y next (moderada). Las de postcss afectan al proceso de build, no al visitante, y la corrección pasa por Next 16, que es un cambio mayor. Planificar la actualización después del lanzamiento, no antes.
- **Protección de la cuenta de Vercel.** Activar la verificación en dos pasos en la cuenta claudenodus y en GitHub cuando exista. Guardar las claves (Resend, GTM) en un gestor de contraseñas, no en chats.
- **Copia de seguridad y monitorización.** Sin remoto no hay copia. Sin monitorización nadie se entera si la web cae: activar Vercel Monitoring o un chequeo gratuito de disponibilidad (UptimeRobot) y avisos por correo.
- **Privacidad del formulario.** Los datos van a Resend (servidor en EE. UU.). La política de privacidad debe nombrar a Resend como encargado del tratamiento y la base legal (consentimiento). Revisar también si se guarda el campo "entró por" (URL de entrada), que puede contener parámetros de campaña.

## Posicionamiento (SEO)

Lo que ya está bien:
- Lighthouse móvil en producción: rendimiento 90–99, accesibilidad 100, buenas prácticas 100, SEO 100 en todas las páginas medidas.
- Títulos y descripciones únicos por página, canónicas, Open Graph, sitemap con 20 URL, robots que bloquea solo `/api/`.
- Datos estructurados: RealEstateAgent en todas las páginas, ContactPage, artículos del blog, propiedades.
- Redirecciones 301 de todas las URL de la web antigua, para no perder lo que ya posiciona.
- Páginas de zona (Godella, Rocafort, Bétera, Paterna) y páginas por situación de venta, que son las búsquedas con intención real.
- Borradores en noindex hasta que estén escritos.

Lo que falta:
- **Google Search Console.** Verificar la propiedad (cuando esté el dominio) y enviar el sitemap. Sin esto no sabemos qué indexa Google ni qué busca la gente.
- **Google Analytics 4 vía GTM.** Confirmar si se reutiliza el contenedor antiguo GTM-TFWMKL7Z y poner `NEXT_PUBLIC_GTM_ID` en Vercel. Configurar como conversiones el envío del formulario y el clic en WhatsApp.
- **Perfil de Empresa de Google.** Es el factor número uno para "inmobiliaria en Godella". Reclamar o actualizar el perfil con la dirección pública, horario, fotos y enlace a la web nueva, y pedir reseñas reales ahí.
- **Contenido que posiciona.** Los tres artículos del blog están en borrador; las guías de zona tienen 14 datos pendientes (población, metro, colegios); Servicios tiene 9 textos pendientes. Las páginas de zona sin fotos propias de los lugares que nombran (Cambridge House, British School, Club de Campo, golf Escorpión) convencen menos y comparten menos.
- **Enlaces entrantes.** Portales, colegios, asociaciones de vecinos, prensa local. Sin ningún enlace externo la web tardará meses en salir.
- **Página de cada propiedad.** Las fichas existen, pero hay cinco propiedades de muestra. La cartera real, con fotos y vídeo propios, es lo que Google y los compradores valoran.
- **Decisión pendiente**: el titular de Vender sigue siendo "Vender tu piso en Valencia" por la búsqueda. Mantenerlo o cambiarlo a "propiedad" cuesta posicionamiento.

## Contenido pendiente de Nodus

| Qué | Dónde | Estado |
|---|---|---|
| Cifras reales (operaciones, años, ventas en 12 meses, portales) | home, Vender | provisionales |
| Reseñas reales | home, Vender, Comprar | provisionales |
| Cargos y zonas de las cuatro personas, fotos | Nosotros | TODO-CARGO, TODO-ZONAS |
| Dirección pública y redes (TikTok, LinkedIn) | pie, aviso legal, JSON-LD | TODO-DIRECCION, TODO-REDES |
| Servicios: caso real de reforma con renders, grandes activos, off market | Servicios | 9 TODO-TEXTO |
| Zonas: población, metro, colegios, urbanizaciones que trabajáis | guías | 14 TODO-DATO |
| Vídeo aéreo y fotos propias por zona | guías | 4 TODO-MEDIA |
| Tres artículos del blog | blog | borrador, noindex |
| Cuatro páginas de situaciones de venta | vender/[slug] | revisión legal pendiente |
| Cartera real de propiedades | propiedades | 5 de muestra |

## Orden recomendado

1. Hoy: repositorio en GitHub + conexión con Vercel; variables de Resend y GTM; cabeceras de seguridad.
2. Esta semana: dominio y DNS; verificar Resend (SPF/DKIM); Search Console y sitemap; Perfil de Empresa de Google.
3. Antes de anunciar la web: reseñas y cifras reales, dirección y datos legales confirmados, equipo con cargos y fotos, cartera real.
4. Después: artículos del blog, datos de las guías, rodaje de zonas, Next 16, Turnstile si llega spam.
