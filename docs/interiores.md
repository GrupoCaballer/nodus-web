# Páginas interiores — análisis y plan

Fecha: 25-10-2026. Fuentes: findrealestate.com (inspeccionado en vivo, 14 páginas), nodusrealestate.com (sitemap + 7 páginas leídas) y `docs/contexto/contenido-web-actual.md`.

---

## 1. Qué tiene findrealestate.com (inventario de interiores)

| Ruta | Para qué sirve | Estructura (en orden) | Mecánicas |
|---|---|---|---|
| `/search` | Buscador de inmuebles | Barra de filtros (dirección o agente, filtros, Mapa / Lista), botón "Try AI search", resultados en tarjetas, mapa | Mapa + lista conmutable; búsqueda conversacional por IA |
| `/properties/[id]` | Ficha de inmueble | Dirección como H1, estado (Active / For Sale), botón "Schedule Viewing", precio, camas/baños, galería (18 fotos), "About this home" (texto + amenities), "Other details" (tipo, m², año, planta, parking, terraza), fuente MLS | Galería grande, datos en dos columnas, CTA fijo |
| `/neighborhoods` | Índice de barrios | H1 "Places we love to call home", "Where our agents are busiest" (cerrados recientes), bloques por ciudad → distrito con tarjetas-foto (26 imágenes) | Tarjetas-foto con reveal |
| `/neighborhoods/[ciudad]/[barrio]` | Guía de barrio | Migas, etiqueta "MANHATTAN, NEW YORK", H1 "Living in Chelsea", foto grande con crédito, texto editorial, "Homes in Chelsea" (fila de 4 fichas + "See all"), "Recently closed by FIND", "Agents who close deals in Chelsea" | Filas de fichas horizontales; agentes vinculados al barrio |
| `/buyers` | Landing para compradores | Hero con 4 promesas + CTA, barra de prueba (4 datos), "How it works" en 4 pasos numerados, testimonios con estrellas, bloque partido "El buscador encuentra, el agente te da las llaves", "Incluido": 4 servicios (presupuesto de reforma gratis, hipoteca, abogados/tasación, mudanza), CTA repetida, FAQ (4 preguntas) | Página de conversión clásica, un solo CTA repetido tres veces |
| `/services` | Inmobiliario comercial | Hero con foto, 4 servicios, "Why FIND" (4 razones con 2 fotos), inmuebles destacados (6 fotos), testimonios con paginación 1-2-3, CTA doble | Mismo carrusel de testimonios de la home |
| `/about` | Quiénes somos | Banner con vídeo, "Who we are" (2 fotos), "What sets us apart" (4), equipo (20 retratos con cargo), bloque "Join" con vídeo, valores (5 con icono) | Vídeo de fondo en banner; cuadrícula de retratos |
| `/agents` | Directorio de agentes | Hero, "Why work with a FIND agent" (5), "Certified agents" con filtros (zona, especialidad), tarjetas con licencia y nº de reseñas, "More agents" | Filtros; tarjetas con foto, cargo, nº de reseñas |
| `/join` | Captación de agentes (17 600 px) | Vídeo, planes con precio, amenities, historias, oficinas, FAQ, "How to join" en 4 pasos | Tabla de precios; acordeón de FAQ |
| `/blog` | Blog | Filtros por categoría (All, Buying, Investments, Lifestyle, News, Real Estate), tarjetas con fecha, título, resumen | Filtro por categoría |
| `/blog/[slug]` | Artículo | Fecha, H1, cuerpo con H2 por mercado, "Download the full reports", "More articles" | Informes descargables |
| `/rent-vs-buy-calculator` | Calculadora | Periodo (3–30 años), inputs de alquiler y compra, "Advanced assumptions", comparativa mensual, resultado a 30 años, gráfico "dónde fue el dinero", posición neta en el tiempo, explicación | Herramienta interactiva |
| `/helpful-partnerships` | Colaboradores | Hero, 7 categorías (hipoteca, seguro, mudanza, interiorismo/reforma, mantenimiento, legal, otros), beneficios | Tarjetas |
| `/press-and-media` | Prensa | Lista de menciones | — |
| Legales | Terms, Privacy, Fair Housing, Accommodation, Operating procedure | Texto | — |

Lo que no aplica a Nodus: `/join` (captación de agentes con planes de membresía), `/agents` como directorio de 1 000 agentes, `/services` comercial, aviso de Fair Housing (legislación de EE. UU.).

---

## 2. Qué tiene hoy nodusrealestate.com

**Páginas**: inicio, `/propiedades` (4 publicadas + 1 vendida en Chiva), `/propiedades/[slug]`, `/vender-piso-valencia`, `/gestion-alquiler-habitaciones-valencia`, `/bio` (contacto del equipo), `/zona`, `/zona/campolivar-godella`, `/zona/la-virgen-de-la-vega`, aviso legal, privacidad, cookies.

**Lo que ya está bien y hay que conservar**
- La página **Vender** tiene un guion sólido: valoración con criterio, 6 pasos (conocemos tu vivienda → valoramos → acordamos estrategia → presentamos y gestionamos visitas → negociamos → coordinamos el cierre), 5 FAQ honestas (no garantiza plazos, honorarios se acuerdan antes de firmar, exclusiva "se habla").
- Las **guías de zona** (Campolivar y La Virgen de la Vega) son el mejor contenido de la web: datos (población, metro, accesos), estilo de vida en 3 bloques, 6 puntos de "qué ofrece la zona", distancias, patrimonio con 4 piezas, "Las mejores casas no se anuncian" (off market), 4 servicios en la zona, formulario. Esto ya es el equivalente de las *neighborhood guides* de FIND, con más fondo.
- **Alquiler por habitaciones**: 3 planes con precio (desde 500 €; 1 mes + IVA por habitación; 10 % + IVA), 3 pasos, 5 FAQ.
- **Fichas de propiedad**: descripción larga y bien escrita (la de Chiva es un ejemplo), características, formulario corto (nombre + teléfono), estado "Vendido" cuando toca.
- **Equipo** (en `/bio`): Pablo Rapaport, Ramón Giménez, Lucía Alessi, Adrián Pajares (+ Hugo; la reforma no se le atribuye públicamente). Faltan fotos, cargos y zonas de cada uno.
- Textos legales y RGPD completos (titular Adrián Carlos Pajares Crespo).

**Lo que le falta frente a FIND**
1. No hay página **Comprar**: el comprador solo tiene el listado.
2. Las **fichas** no tienen galería grande ni vídeo/tour integrados en la primera pantalla, ni "inmuebles similares", ni enlace a la guía de zona.
3. El **listado** no filtra (operación, tipo, zona, precio, m²).
4. **Nosotros** es solo un directorio de emails.
5. No hay **blog** ni recursos (ni informes de mercado).
6. No hay **herramientas**: calculadora, simulador de gastos de compra.
7. No hay **prueba social** (reseñas, operaciones cerradas por zona).
8. Solo 2 guías de zona; faltan Torre en Conill, Santa Bárbara, València ciudad y el resto.
9. Nada de **inversión** (fondos, family offices) ni de **reforma con renders**, que son los diferenciales del brief.

---

## 3. Qué implementar además de lo que ya hay (basado en FIND)

| Prioridad | Página / bloque | De dónde viene | Qué aporta a Nodus |
|---|---|---|---|
| **P1** | `/vender` reconstruida con la estructura de `/buyers` de FIND (hero con promesas + CTA, barra de prueba, cómo funciona, diferenciales, incluido, testimonios, FAQ, CTA + formulario) | FIND `/buyers` + Nodus actual | La página de conversión principal. Conserva los 6 pasos y las FAQ actuales |
| **P1** | `/comprar` con el mismo esqueleto: cómo funciona (3 pasos), "incluido para quien compra con Nodus" (reforma con renders y presupuesto, broker hipotecario, abogado/notaría, mudanza), FAQ | FIND `/buyers` | Hoy no existe. Es el espejo de Vender |
| **P1** | `/propiedades` con filtros (operación, tipo, zona, precio, habitaciones) y conmutador lista / mapa; tarjetas con precio, m², hab., baños, zona | FIND `/search` | Base para la fase 2 con Airtable |
| **P1** | `/propiedades/[slug]` al estilo FIND: galería grande, precio y datos clave arriba, botón "Pedir visita" fijo, descripción, características en dos columnas, vídeo y tour (tras cookies), **guía de zona enlazada**, **inmuebles similares**, formulario corto | FIND `/properties/[id]` + ficha actual | Mantiene los textos actuales |
| **P1** | `/zonas` (índice) + `/zonas/[slug]` con la plantilla actual de Campolivar ampliada con "Inmuebles en [zona]" y "Operaciones cerradas en [zona]" (si hay datos reales) | Nodus actual + FIND neighborhood guide | Empezar por las 4 zonas con valor emocional: **Campolivar, Torre en Conill, Santa Bárbara, La Virgen de la Vega**; después València ciudad y resto |
| **P2** | `/nosotros`: banner con vídeo, "Quiénes somos" (texto actual: "No somos la agencia más grande…"), valores (integridad, rigor, cercanía, eficiencia — ya existen), equipo con foto, cargo y zonas, bloque Reforma / Financiación / Inversión | FIND `/about` | Convierte `/bio` en una página de verdad |
| **P2** | `/alquilar`: estructura de servicio con 3 planes (contenido actual íntegro), 3 pasos, FAQ | Nodus actual | Ya existe; se remaqueta |
| **P2** | `/blog` con categorías (Mercado, Comprar, Vender, Zonas, Inversión) y `/blog/[slug]` con "informe descargable" cuando lo haya | FIND `/blog` | Contenido para SEO local |
| **P2** | `/contacto`: formulario + datos + mapa de Godella + equipo | — | Hoy es un ancla en la home |
| **P3** | `/herramientas/gastos-de-compra`: calculadora de gastos de compraventa en la Comunitat Valenciana (ITP 10 % general / reducido, AJD en obra nueva, notaría, registro, gestoría) y cuota hipotecaria estimada | FIND rent-vs-buy | Diferenciador local, útil para SEO. Datos verificables, sin inventar |
| **P3** | `/inversion`: dossier, LOI, due diligence, para fondos y family offices; formulario específico | Brief | Diferencial de Nodus |
| **P3** | Colaboradores dentro de Nosotros (broker, abogados, mudanzas, home staging) | FIND partnerships | Solo con nombres reales (p. ej. Bayteca aparece ya en una ficha) |
| — | Legales: aviso legal, privacidad, cookies | Nodus actual | Copiar tal cual |

**No hacer**: página de captación de agentes, directorio de agentes, inmobiliario comercial, buscador por IA (fase 2 si acaso).

---

## 4. Mapa del sitio nuevo

```
/                         home (hecha)
/vender                   P1
/comprar                  P1
/propiedades              P1  listado con filtros
/propiedades/[slug]       P1  ficha
/zonas                    P1  índice
/zonas/[slug]             P1  guía (4 destacadas primero)
/alquilar                 P2  alquiler por habitaciones (3 planes)
/nosotros                 P2  equipo, valores, reforma, financiación, inversión
/contacto                 P2
/blog, /blog/[slug]       P2
/inversion                P3
/herramientas/gastos-de-compra  P3
/aviso-legal, /privacidad, /cookies
```

Navegación: Propiedades · Vender · Comprar · Zonas · Nosotros · Blog · **Hablemos** (pill). Alquilar e Inversión cuelgan de Nosotros y del pie.

---

## 5. Página **Vender** — contenido completo

Estructura tomada de FIND `/buyers` (hero → prueba → cómo funciona → voces → bloque partido → incluido → CTA → FAQ) con los textos de Nodus. Trato: tú (como en la home y en la web actual).

### 5.1 Hero
- Etiqueta: `Vender tu vivienda · València y área metropolitana`
- H1: **Vender tu piso en València. Cada paso, conectado.**
- Subtítulo: Una valoración con criterio. Una estrategia acordada contigo. Un equipo que coordina la venta desde la primera conversación hasta la firma.
- Cuatro promesas (lista corta, como las 4 de FIND):
  1. Una web con esencia propia para tu vivienda
  2. Vídeo profesional, con dron si es un chalet
  3. Visitas filtradas: solo compradores con capacidad real
  4. Dos meses de prueba. Si vendes a un comprador tuyo, no pagas
- Botón: **Hablemos de la venta →** (ancla al formulario)
- Visual: foto vertical de una fachada de València a la derecha (o vídeo corto de una vivienda publicada por Nodus cuando exista).

### 5.2 Barra de prueba (4 datos)
Solo datos reales. Propuesta a confirmar con el usuario:
- `TODO-DATO` operaciones cerradas (contar las reales)
- Anuncios con muchas visitas en las dos primeras semanas (hecho confirmado en el contexto; cuantificar si es posible)
- Portales nacionales e internacionales en los que publicamos (listar los reales)
- Sin honorarios si vendes a un comprador propio

### 5.3 Cómo funciona — 6 pasos (texto actual, íntegro)
Título: **Seis pasos. Un mismo equipo.**
1. **Conocemos tu vivienda.** Visitamos el inmueble, escuchamos tu situación y tus plazos.
2. **Valoramos con criterio.** Combinamos la visita con el análisis de ubicación, estado, características y comparables. Te explicamos la propuesta de precio y sus límites.
3. **Acordamos la estrategia.** Definimos contigo el precio de salida, la presentación y los canales. El alcance del servicio y los honorarios quedan acordados antes de empezar.
4. **Presentamos y gestionamos las visitas.** Web propia, vídeo, fotos, home staging, publicación y consultas. Organizamos las visitas y conocemos la capacidad de compra de cada interesado.
5. **Negociamos con criterio.** Te presentamos las ofertas con sus condiciones y plazos y te ayudamos a valorarlas.
6. **Coordinamos el cierre.** Preparación del acuerdo, trámites previos y notaría hasta la firma y la entrega de llaves.

(Los pasos 1 y 4 se completan con el brief; el resto es texto literal de la web actual.)

### 5.4 El barrio importa (texto actual)
H2: **El barrio importa. Tu situación, también.**
Un piso en Benimaclet, una vivienda en el Eixample o un chalet en Campolivar necesitan enfoques distintos. La ubicación, la distribución, el estado del edificio y el perfil de comprador orientan la forma de presentar cada vivienda. También cuenta lo que viene después para ti: una mudanza, otra compra o la reorganización de tu patrimonio. Por eso empezamos escuchando.
Enlaces a las guías de zona destacadas.

### 5.5 Bloque partido (como "The search finds the homes…")
H2: **La web vende la casa. Nosotros cerramos la venta.**
Cada vivienda sale con su propia web, su vídeo y su difusión en Instagram. Pero una venta se cierra en las visitas, en la negociación y en la notaría. Ahí está el equipo.
Foto: interior o fachada real de València.

### 5.6 Incluido cuando vendes con Nodus (4 tarjetas, como "Included for FIND buyers")
1. **Web con esencia propia** — Un dominio para tu vivienda, con fotos, vídeo, plano y la historia de la casa.
2. **Vídeo y dron** — Rodaje profesional; dron en chalets y parcelas.
3. **Home staging** — Preparamos la vivienda para que se entienda a la primera.
4. **Visitas filtradas** — Antes de enseñar, sabemos quién viene y con qué capacidad.

### 5.7 Condiciones claras (sustituye a "precios")
- Sin exclusiva clásica: pedimos ser los únicos que lo publiquemos en portales nacionales e internacionales.
- Dos meses de prueba: si no te convence, nos vamos.
- Si vendes a un comprador tuyo, no pagas.
- Los honorarios se acuerdan por escrito antes de empezar. (**No se publica la cifra.**)

### 5.8 Testimonios
Mismo carrusel que la home (`TODO-RESEÑA` hasta tener las de Google).

### 5.9 FAQ (texto actual, íntegro)
H2: **Decidir con información.**
- ¿Cómo valoráis mi piso en València?
- ¿Cuánto tiempo puede tardar en venderse?
- ¿Qué incluyen los honorarios?
- ¿Puedo consultaros si todavía no he decidido vender?
- ¿Trabajáis en exclusiva? (respuesta actualizada con el modelo del brief: dos meses de prueba, sin exclusiva clásica)

### 5.10 CTA + formulario
H2: **¿Estás pensando en vender?** Cuéntanos dónde está, cómo es y cuáles son tus planes. Empecemos por una conversación sin compromiso.
Campos: nombre, teléfono, email, dirección o zona de la vivienda, mensaje. Texto RGPD actual. Botón **Hablar con Nodus →**.

### 5.11 SEO
- `title`: Vender piso en València | Nodus Real Estate
- `description`: Valoración con criterio, web propia de tu vivienda, vídeo profesional y visitas filtradas. Dos meses de prueba y sin exclusiva clásica. Godella y València.
- JSON-LD `RealEstateAgent` + `FAQPage` con las 5 preguntas.

---

## 6. Esqueleto de contenido del resto (para arrancar)

**/comprar** — Hero: *Encuentra lo que encaja. Con alguien al lado.* Promesas: asesor asignado, acceso a off market, reforma con renders y presupuesto antes de ofertar, broker para llegar con la hipoteca estudiada. Cómo funciona: 3 pasos (los de la home). Incluido: reforma y renders, financiación (broker; Bayteca aparece en una ficha), legal y notaría, mudanza. FAQ: ¿cuesta algo?, ¿qué es off market?, ¿cómo se filtran las viviendas?, ¿y si también vendo?

**/propiedades** — Intro actual ("Lo que ves aquí es solo una parte…"). Filtros: operación (venta/alquiler), tipo, zona, precio, habitaciones. Datos de las 5 fichas actuales en `content/propiedades.json`.

**/zonas** — Intro actual ("Guías locales…"). Destacadas: Campolivar, Torre en Conill, Santa Bárbara, La Virgen de la Vega. Plantilla de guía: la de Campolivar (hero, la zona con 6 datos, estilo de vida ×3, qué ofrece ×6, distancias ×5, patrimonio ×4, Nodus en la zona ×4, inmuebles en la zona, contacto). **Torre en Conill y Santa Bárbara** necesitan redacción nueva con datos verificados (población, metro, colegios, accesos); marcar `TODO-DATO` donde no se confirme.

**/nosotros** — "No somos la agencia más grande. Somos la más fiable." + párrafos actuales + "Ser la primera llamada. No la última opción." Valores ×4. Equipo: `TODO-FOTO` y cargo de Pablo Rapaport, Ramón Giménez, Lucía Alessi, Adrián Pajares, Hugo (`TODO-APELLIDO`). Bloques: Reforma y renders, Financiación, Inversión.

**/alquilar** — Contenido literal de la página actual de alquiler por habitaciones (hero, punto de partida ×2, 3 planes con precio, cómo trabajamos ×3, FAQ ×5).

**/contacto** — "Cuéntanos qué necesitas." + formulario actual + datos + equipo con emails.

**/blog** — Categorías: Mercado, Comprar, Vender, Zonas, Inversión. Tres artículos `TODO-ARTÍCULO`.

**Legales** — texto actual íntegro.
