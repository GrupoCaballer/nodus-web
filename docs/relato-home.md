# El relato de la home — mapa de capítulos

Cada sección es un capítulo con un solo trabajo. La etiqueta pequeña (dorada) arriba de cada capítulo dice en qué parte del relato estás. Ninguna sección repite lo que ya ha dicho otra: lo que se amplía está en su página interior.

La home tiene dos partes (decisión del equipo, 27-10-2026):

- **Recorrido principal (capítulos 0–5)**: obligatorio para todo visitante. Claro, conciso y ligero: lo valioso, resumido.
- **Menú lateral (a partir del 6)**: se abre solo cuando el scroll termina el recorrido (al salir de las reseñas) y queda una pestaña "Explorar" en el borde derecho (en móvil, una píldora abajo) para reabrirlo. Ahí viven propiedades, zonas, blog, servicios y contacto.

### Recorrido principal

| # | Capítulo (etiqueta) | Qué siente / entiende quien baja | Componente | CTA |
|---|---|---|---|---|
| 0 | — | **Intro**: el nudo, el cielo, el logotipo. Pantalla limpia. "El punto donde todo converge." | `Hero` | ninguno (la intro se come entera) |
| 1 | — | **Gancho**: "¿Quieres comprar o vender una propiedad?" Dos caminos: imaginarte viviendo allí / imaginarte la visita con tu comprador ideal. | `Gancho` | Quiero comprar → /comprar · Quiero vender → /vender |
| 2 | Quiénes somos | "No somos la agencia más grande. Somos la más fiable." Un párrafo, la frase "Ser la primera llamada" y cuatro cifras. Los valores completos viven en /nosotros. | `QuienesSomos` | Conocer al equipo → /nosotros |
| 3 | Cómo trabajamos | "Tu vida cambia" con el vídeo de València y la experiencia a dos caras: **si compras** (habla con una persona → gana claridad → avanza) y **si vendes** (valoramos → presentamos y filtramos → cerramos). | `WhyNodus` + `Steps` | Empezar a buscar · Hablemos de la venta |
| 4 | Por qué elegirnos | Comprar / Vender / Alquilar, una frase cada uno (filas que se abren), y una línea con lo que va más allá: reforma, financiación, inversión. | `Servicios` | Ver todos los servicios → /servicios |
| 5 | Lo que dicen | Reseñas reales (`TODO-RESEÑA`). Aquí termina el recorrido (`data-story-end`). | `Testimonios` | — |
| — | — | **Cierre**: "Encuentra tu sitio. Te acompañamos hasta la firma." | `CtaFinal` | Hablemos → /contacto |

### Menú lateral (`SideMenu`)

| Bloque | Contenido | Enlaces |
|---|---|---|
| Propiedades | Las disponibles (título, zona, precio), con el número en dorado. | cada ficha · Ver todas → /propiedades |
| Zonas | Las cinco guías destacadas como chips. | cada guía · Ver todas → /zonas |
| Blog | Los tres últimos artículos con su categoría. | cada artículo |
| Pie del panel | Servicios · Nosotros · Hablemos · WhatsApp | |

Fuera de la home: `Chevrons`, `Extras`, `PropiedadesHome`, `Zonas` (sección) y `BlogList` siguen en el repo por si se reutilizan en interiores.

Quitado de la home: el bloque "Vende con Nodus" (repetía Servicios/Vender; su contenido vive en /vender).

## Menú

Propiedades · Vender · Comprar · Zonas · Servicios · Blog · **Hablemos** (botón). En móvil, lo mismo más Contacto, teléfono y WhatsApp.

## Pie, en tres columnas

- **Inmuebles**: Propiedades · Zonas · Vender · Comprar
- **Nodus**: Servicios · Alquiler por habitaciones · Nosotros · Blog
- **Contacto**: oficina, correo, teléfono, WhatsApp, redes

## Páginas interiores (misma lógica de capítulos)

Vender y Comprar: hero con promesas → cómo funciona → el barrio / dónde → incluido → reseñas → FAQ → formulario. Zonas: hero → el pueblo → urbanizaciones → estilo de vida → qué ofrece → distancias → patrimonio → imágenes → inmuebles → Nodus en la zona → formulario. Servicios: índice → seis servicios en filas alternas → formulario.
