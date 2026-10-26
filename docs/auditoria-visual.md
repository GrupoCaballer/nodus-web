# Auditoría de lo que ve la gente — 26-10-2026

Orden: primero lo que un visitante nota en los primeros segundos, después lo que decide si se queda. El SEO va aparte (paso 6).

## 0. Lo medido hoy (Lighthouse móvil, build de producción)

| Página | Antes | Después | Qué se cambió |
|---|---|---|---|
| Home | Rendimiento 36 · 3,9 MB · bloqueo 5,5 s | **82** · 0,6 MB · 0,1 s | El vídeo de "Por qué Nodus" (3 MB) se descargaba y decodificaba en la carga. Ahora no se descarga hasta que está cerca de la pantalla. Imágenes del hero con tamaños ajustados. |
| Nosotros | — | 71 · 2 MB | El vídeo del banner está en la primera pantalla y carga al instante (1,5 MB). Candidato a bajar a 720p. |
| Zona / Ficha | 87 | 87 | LCP 4 s por la foto de cabecera a 2400 px. |
| Accesibilidad | 93–97 | **100** | Gris de texto subido de 50 % a 60 % de opacidad (contraste); SplitText sin `aria-label` en `<span>`. |

Lo que se notaba como "lento" en el navegador de desarrollo es en parte el propio modo desarrollo (compila al vuelo). Lo real es lo de arriba.

**Cursor**: en las filas Comprar / Vender / Alquilar el puntero desaparecía (`cursor: none`) y solo se veía el círculo "ver" siguiendo al ratón. Ahora el puntero se mantiene y el círculo lo acompaña.

## 1. Primeros segundos

| # | Qué ve la gente | Problema | Qué haría |
|---|---|---|---|
| 1 | **Hero**: chalet de Dénia de banco | No es vuestro; el contorno del nudo se ve oscuro sobre fachada blanca | Vuestro render de la mansión sin fondo, con la base en sombra para que el nudo blanco se lea. Es el cambio que más se nota. |
| 2 | **Favicon** de Next.js en la pestaña | Delata plantilla | Hecho hoy: nudo de Nodus en negro. |
| 3 | **Niebla y nubes** generadas | Correctas pero genéricas | Si Hugo o quien haga el render puede entregar también 2 nubes y una niebla con alfa, mejor. |
| 4 | **Gris de texto** | Era demasiado claro en móvil al sol | Subido hoy a 60 %. |

## 2. Zonas (lo que más pedís)

| # | Problema | Qué haría |
|---|---|---|
| 5 | **No hay fotos de los sitios**: Cambridge House, Club de Tenis, castillo-masía, Santuario… Las fotos de cabecera son de banco | Lista de rodaje ya escrita en cada guía (`TODO-MEDIA`). Formato: 1 vídeo aéreo de 10–15 s por zona + 6–8 fotos horizontales de lugares concretos, con pie ("Cambridge House, a 300 m de la entrada"). Hasta entonces, se puede usar Wikimedia Commons con atribución para monumentos (castillo de Bétera, Cartuja de Portaceli, Santuario); no para colegios ni clubes privados. |
| 6 | **Santa Bárbara no es la única urbanización de Rocafort**, ni Campolivar la única de Godella, ni Torre en Conill la única de Bétera | Convertir cada guía en **guía de municipio con apartados por urbanización**: Rocafort → Santa Bárbara, casco, [otras: me faltan los nombres]; Godella → Campolivar, casco, [otras]; Bétera → Torre en Conill, [Mas Camarena, Lloma Llarga… a confirmar]. Cada apartado con 2–3 líneas, foto propia y "qué tipo de casa hay y qué precio por m² se mueve". Necesito de vosotros la lista de urbanizaciones y una frase de cada una. |
| 7 | Mapa | No hay | Un mapa sencillo por zona (OpenStreetMap, sin cookies) con los puntos de la lista de rodaje: colegio, metro, club, piscina. |
| 8 | Guías de Torre en Conill y Santa Bárbara | Redactadas por mí con datos públicos; llevan aviso de borrador | Que alguien de Nodus que conozca la zona las corrija en `content/zonas/*.json`. |

## 3. Confianza

| # | Problema | Qué haría |
|---|---|---|
| 9 | **Reseñas** `TODO-RESEÑA` ×5 | Las 5 de Google, con nombre y fecha. Si hay menos de 5, mejor 3 reales que 5 huecos. |
| 10 | **Equipo** sin fotos ni cargos | Retrato de cada uno con la misma luz y fondo (una tarde, una pared). Cargo y zona que lleva. |
| 11 | **Barra de prueba** de Vender con `TODO-DATO` | Número de operaciones cerradas y lista de portales. Si no queréis dar cifras, quitamos la barra. |
| 12 | Propiedades: 4 publicadas + 1 vendida | Coherente con "pocas y bien llevadas", pero conviene dejar siempre visible la vendida (prueba de que se vende) y marcar la fecha de venta. |

## 4. Uso

| # | Problema | Qué haría |
|---|---|---|
| 13 | Contacto: no hay WhatsApp | En València casi todo entra por WhatsApp. Botón "Escríbenos por WhatsApp" en Contacto, en las fichas y en el pie, con el número que decidáis. |
| 14 | Ficha: galería sin ampliar | Al tocar una foto debería abrirse a pantalla completa con deslizar. |
| 15 | Listado: sin orden | Ordenar por precio y por fecha; mostrar precio/m². |
| 16 | Menú móvil | Funciona, pero sin el teléfono ni WhatsApp. Añadirlos abajo del menú. |
| 17 | Formulario | Pide teléfono y correo obligatorios; para un primer contacto con uno basta. Dejar correo opcional. |

## 5. Pendientes vuestros (marcados en la web)

`TODO-RESEÑA` ×5 · `TODO-ARTÍCULO` ×3 · `TODO-TEXTO` (FAQ de Comprar, reforma en Nosotros, 2 guías) · `TODO-MEDIA` ×4 zonas · `TODO-DATO` (barra de Vender, datos de 2 guías) · `TODO-CARGO/FOTO` (equipo) · `TODO-DIRECCIÓN` (oficina) · render del hero.
