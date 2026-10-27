# El relato de la home — mapa de capítulos

Cada sección es un capítulo con un solo trabajo. La etiqueta pequeña (dorada) arriba de cada capítulo dice en qué parte del relato estás. Ninguna sección repite lo que ya ha dicho otra: lo que se amplía está en su página interior.

La home tiene dos partes (decisión del equipo, 27-10-2026):

- **Recorrido principal (capítulos 0–5)**: obligatorio para todo visitante. Claro, conciso y ligero: lo valioso, resumido.
- **Menú lateral (a partir del 6)**: se abre solo cuando el scroll termina el recorrido (al salir de las reseñas) y queda una pestaña "Explorar" en el borde derecho (en móvil, una píldora abajo) para reabrirlo. Ahí viven propiedades, zonas, blog, servicios y contacto.

### Recorrido principal

| # | Capítulo (etiqueta) | Qué siente / entiende quien baja | Componente | CTA |
|---|---|---|---|---|
| 0 | — | **Intro**: el nudo, el cielo, el logotipo. Pantalla limpia. "El punto donde todo converge." | `Hero` | ninguno (la intro se come entera) |
| 1 | — | **Gancho**, para cualquiera con una propiedad en mente, sin separar aún comprador y vendedor: "Imagínate ya en el siguiente paso. Del camino nos ocupamos nosotros." Una propiedad es una mudanza, una inversión, un cambio de etapa. | `Gancho` | Cuéntanos tu caso → /contacto |
| 2 | Quiénes somos | "No somos la agencia más grande. Somos la más fiable." Un párrafo, la frase "Ser la primera llamada" y cuatro cifras. Los valores completos viven en /nosotros. | `QuienesSomos` | Conocer al equipo → /nosotros |
| 3 | Cómo trabajamos | "Tu vida cambia" con el vídeo de Valencia y nuestra forma de trabajar contada desde la experiencia: escuchamos antes de buscar → traducimos sensaciones en criterios → avanzamos contigo. Sin distinguir comprador y vendedor. | `WhyNodus` + `Experiencia` | — |
| 4 | Por qué elegirnos | Aquí sí se separan los caminos, en tres filas que se abren: **Vender** (valoramos, web con esencia propia, vídeo, home staging, visitas filtradas, negociación hasta notaría), **Comprar** (asesor que escucha, hipoteca estudiada antes de visitar, renders y presupuesto si hay reforma) y **Alquilar** (preparar, seleccionar inquilinos, gestionar el día a día). Línea final con reforma, financiación y off market. | `Servicios` | Ver todos los servicios |
| 5 | Lo que dicen | Reseñas reales (`TODO-RESEÑA`). Aquí termina el recorrido (`data-story-end`). | `Testimonios` | — |
| — | — | **Cierre**: "Encuentra tu sitio. Te acompañamos hasta la firma." | `CtaFinal` | Hablemos → /contacto |

### Menú lateral (`SideMenu`)

| Bloque | Contenido | Enlaces |
|---|---|---|
| Propiedades | Las disponibles (título, zona, precio), con el número en dorado. | cada ficha · Ver todas → /propiedades |
| Zonas | Las cinco guías destacadas como chips. | cada guía · Ver todas → /zonas |
| Blog | Los tres últimos artículos con su categoría. | cada artículo |
| Pie del panel | Servicios · Nosotros · Hablemos · WhatsApp | |

Fuera de la home: `Steps` (vendes/compras a dos caras), `Chevrons`, `Extras`, `PropiedadesHome`, `Zonas` (sección) y `BlogList` siguen en el repo por si se reutilizan en interiores.

Quitado de la home: el bloque "Vende con Nodus" (repetía Servicios/Vender; su contenido vive en /vender).

## Menú

Propiedades · Vender · Comprar · Zonas · Servicios · Blog · **Hablemos** (botón). En móvil, lo mismo más Contacto, teléfono y WhatsApp.

## Pie, en tres columnas

- **Inmuebles**: Propiedades · Zonas · Vender · Comprar
- **Nodus**: Servicios · Alquiler por habitaciones · Nosotros · Blog
- **Contacto**: oficina, correo, teléfono, WhatsApp, redes

## Páginas interiores (misma lógica de capítulos)

Cada capítulo con su etiqueta dorada; textos en tú, hasta 35–40 palabras por punto; "Valencia" sin acento; se habla de **propiedades**, no de casas, pisos ni activos (salvo en los títulos de cada anuncio).

**Vender** (prioridad de Nodus): hero con cuatro promesas → barra de prueba (cifras, TODO-DATO) → *Cómo funciona* (seis pasos de la web antigua, ampliados) → *El barrio* (zonas + situaciones particulares) → *La web de tu casa* → *Incluido* (web con esencia propia, vídeo y dron, home staging, visitas filtradas) + condiciones (alcance y honorarios por escrito antes de empezar; el modelo sin exclusiva / 2 meses / 0 € queda aparcado hasta que se decida) → reseñas → *Preguntas* → *Hablemos* (formulario).

**Comprar**: hero con cuatro promesas → *Cómo funciona* ("Tres pasos. Una persona al lado.") → *Dónde buscar* (el barrio importa, con las cinco guías) → *Incluido* (compra y venta, asesoramiento integral, reforma y renders, financiación) → *En venta ahora* (pocas viviendas, toda la atención; aquí vive el argumento de la cartera corta) → reseñas → *Preguntas* (TODO-TEXTO) → *Hablemos*. El off market ya no se menciona en Comprar: va al apartado de Servicios.

**Nosotros**: banner con vídeo ("No somos la agencia más grande. Somos la más fiable.") → *Quiénes somos* (convicción, equipo joven y vanguardista, el punto donde se encuentran quien vende y quien compra) → frase que se enciende → *Lo que no negociamos* (cuatro valores de la web antigua) → *El equipo* (TODO-CARGO, TODO-ZONAS, fotos) → *Lo que hacemos* (un párrafo y botón a Servicios; ya no repite reforma / financiación / inversión) → *Hablemos*. La cartera corta ya no se cuenta aquí.

**Alquiler por habitaciones**: hero → *El punto de partida* (propiedad sin alquilar / ya alquilas y quieres delegar) → *Servicios y honorarios* (tres planes con precio, de la web antigua) → *Cómo trabajamos* (tres pasos) → *Preguntas* → *Hablemos*. Todo en "propiedad".

**Zonas** (una guía por municipio, con sus urbanizaciones, contada como la contaría un residente de toda la vida): hero (vídeo aéreo o foto, botón Hablemos y enlace a Propiedades) → *El pueblo* (párrafos + datos) → *Urbanizaciones y barrios* → *Estilo de vida* → *Qué ofrece la zona* → *Distancias* → *Patrimonio y entorno* → *La zona en imágenes* (TODO-MEDIA) → *Propiedades* en la zona (las que hay ahora) → *Nodus en la zona* (lo conocemos como vecinos: comprar, vender, reforma, asesoramiento; sin off market ni "las mejores casas no se anuncian") → *Hablemos*. El índice habla de cómo se vive, qué hay cerca y qué propiedades tenemos, no de "lo que no se publica". **Servicios**: "Lo que hace Nodus además de enseñar propiedades" → índice → cinco capítulos en filas alternas, en este orden: Valoración y venta · Renders y reforma · Broker hipotecario · Alquiler por habitaciones · **Off market e inversión** (el inversor va aparte: ventas discretas, encargos de compra, operaciones para fondos y family offices; sin presentarlo como mucho producto) → formulario.
