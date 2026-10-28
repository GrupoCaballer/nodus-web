# Auditoría completa de la web (28-10-2026)

Revisión página a página con capturas de cada sección a 1440 px (script `scripts/audit-shots.mjs`). Tres ejes: **maquetación e impacto visual**, **fotos** (las que faltan, las repetidas y las descolocadas) y **afirmaciones** (solo lo genérico; nada que comprometa a una persona o prometa algo concreto). Al final, el inventario de lugares por zona con su hueco de foto y los apartados que Nodus rellena.

Leyenda: 🔴 corregir antes de publicar · 🟠 mejora clara · 🟢 detalle.

## Criterio de afirmaciones (aplicado ya)

| Quitado | Dónde estaba | Motivo |
|---|---|---|
| "0 € si vendes a un comprador propio" | Cifras de Quiénes somos (home) | Condición comercial concreta, no genérica; compromete |
| "Pocas viviendas a la vez: la tuya no será una más en un listado" | Promesas del hero de Vender | La cartera corta solo se cuenta en Propiedades (decisión 10) |
| "Dos meses de prueba", "sin exclusiva clásica", "no pagas" | Vender (promesas, condiciones, FAQ) | Modelo aparcado (decisión 9); quitado en la pasada anterior |
| "Las mejores casas no se anuncian", acceso a lo que no se publica | Comprar, Zonas, Nosotros | Off market solo en Servicios y sin presentarlo como volumen |

Se mantiene, pero conviene que lo confirméis: **"2 semanas en las que cada anuncio recibe la mayor parte de sus visitas"** (home y Vender). Sale de vuestro contexto de marca; si no lo podéis sostener con datos, se cambia por otra cifra vuestra.

Siguen visibles a propósito hasta que los rellenéis: 19 `TODO-DATO`, 10 `TODO-RESEÑA`, 9 `TODO-TEXTO`, 5 `TODO-CARGO`, 4 `TODO-ZONAS`, 3 `TODO-MEDIA`, 3 `TODO-ARTÍCULO`, 1 `TODO-APELLIDO`, 1 `TODO-DIRECCIÓN`.

## Hallazgos transversales

1. 🔴 **La misma foto en tres sitios.** La terraza de cafetería (`testimonios-terraza.webp`) aparece en Quiénes somos (home), en Lo que dicen (home) y se repite en las reseñas de Vender y Comprar. La fachada modernista aparece en Servicios, en la fila Vender de la home y en Vender. El chalet de Campolivar es a la vez la tarjeta de Godella y la foto de la urbanización. Necesitamos una foto por uso.
2. 🔴 **Secciones de solo texto demasiado largas.** Vender "Seis pasos" (1.900 px sin una imagen), Comprar "Tres pasos", "Cómo trabajamos" de la home, los FAQ, "Incluido". En escritorio, la columna izquierda queda vacía bajo el titular en todas ellas (ver `vender-03`, `comprar-02`, `home-05`). Propuesta: columna izquierda con una foto vertical pegajosa (sticky) que acompaña al scroll, o una cifra grande, o nada y pasar los pasos a dos columnas.
3. 🟠 **El gancho de la home tiene la mitad derecha vacía** (`home-02`): titular a cuatro líneas, párrafo y botón, y 700 px de negro a la derecha. Es la primera pantalla después del hero: pide un vídeo corto o una foto grande a sangre.
4. 🟠 **Botones pegados al borde de la foto o al final del texto.** En los heros de Vender, Comprar y Alquilar el botón queda a la altura del borde inferior de la foto, sin aire; en Vender el cursor personalizado se solapa con él (`vender-01`). En Servicios, el botón de cada fila queda a 30 px del párrafo. Regla a aplicar: 4 rem de aire antes de cada botón y los botones nunca alineados con el borde de una imagen.
5. 🟠 **Las guías de zona son texto en un 70 %.** Solo tienen foto el hero, las urbanizaciones y la galería. "El pueblo", "Estilo de vida", "Qué ofrece", "Distancias", "Patrimonio" y "Nodus en la zona" son bloques de texto sobre negro. Ahí va el trabajo de fotos de lugares concretos (inventario más abajo).
6. 🟠 **Palabra "propiedad".** Quedaban casa, piso, vivienda e inmueble en etiquetas, promesas, FAQ y contadores de Vender, Comprar, Propiedades y el formulario. Corregido en esta pasada. Pendiente de decisión: el H1 de Vender sigue siendo "Vender tu piso en Valencia" porque es la frase que posiciona en Google; si preferís "propiedad" también ahí, se cambia sabiendo que se pierde esa búsqueda.
7. 🟢 **Menú lateral** (home): funciona, pero en escritorio tapa un tercio del cierre "Encuentra tu sitio" cuando se abre solo. Opción: abrirlo con la pestaña y no automáticamente, o abrirlo un poco más tarde, ya sobre el pie.
8. 🟢 **Cabecera sobre fotos claras**: en el hero de Nosotros y en las tarjetas de Zonas el menú se lee peor sobre la imagen. Un degradado suave de 12 rem arriba lo arregla.

## Página a página

### Home
| Sección | Hallazgo | Propuesta |
|---|---|---|
| Hero | 🔴 El subtítulo (cinco líneas en escritorio) cae sobre el edificio y se pierde el contraste (`home-01`). | Subtítulo de dos líneas máximo ("Inmobiliaria en Valencia. Donde se encuentran quien vende y quien compra.") y que el texto termine por encima del edificio. El resto de la frase va al gancho. |
| Gancho | 🟠 Mitad derecha vacía; titular a cuatro líneas. | Titular en dos líneas; a la derecha, vídeo corto en bucle (dron de Valencia o de una propiedad) o foto a sangre. |
| Quiénes somos | 🔴 Foto repetida con las reseñas. 🟠 Cuatro cifras con tres TODO. | Foto del equipo o de la oficina de Godella. Cifras: las que podáis sostener; si solo tenéis dos, mejor dos grandes que cuatro con huecos. |
| Cómo trabajamos | 🟢 Vídeo de la Ciudad de las Artes muy bien. 🟠 La lista de tres pasos deja el 20 % derecho vacío. | Mantener; si entra una foto vertical a la derecha de la lista, mejor. |
| Por qué elegirnos | 🟢 Las filas funcionan; las fotos solo aparecen al pasar el ratón. | Mantener. En móvil mostrar la foto fija debajo de cada palabra. |
| Lo que dicen | 🔴 Reseñas TODO; foto repetida; el bloque de cita queda pequeño frente a la foto. | Con reseñas reales: foto del cliente o de la propiedad vendida en lugar de una foto genérica; cita más grande. |
| Cierre | 🟢 Correcto. | Nada. |

### Vender
| Sección | Hallazgo | Propuesta |
|---|---|---|
| Hero | 🟠 Botón pegado al borde inferior de la foto; cuatro promesas en lista con guiones poco visibles. | Más aire bajo las promesas; foto de una propiedad vendida por Nodus (con permiso) en vez de la fachada modernista. |
| Barra de cifras | 🟠 Tres de cuatro cifras en TODO. | Rellenar o reducir a dos. |
| Cómo funciona | 🔴 Seis pasos, 1.900 px solo texto, columna izquierda vacía. | Foto vertical sticky a la izquierda (rodaje de una vivienda, home staging, una firma en notaría) o pasos en dos columnas de tres. |
| El barrio | 🟢 Chips de zonas y situaciones, bien. | Una foto apaisada a la izquierda bajo el titular. |
| La web de tu casa | 🟠 Foto repetida con Servicios. | Captura real de una web de vivienda de Nodus (dúplex, chalet) en un portátil o móvil. Es vuestro producto y no se ve en ningún sitio. |
| Incluido | 🟠 Cuatro columnas de texto. | Un icono no (regla de la marca); una foto pequeña por columna sí: web, dron, home staging, visita. |
| Reseñas, Preguntas, Hablemos | 🟢 Correctos. | Nada. |

### Comprar
| Sección | Hallazgo | Propuesta |
|---|---|---|
| Hero | 🟢 La foto de la calle del Carme funciona. 🟠 Botón pegado a la foto. | Aire. |
| Cómo funciona | 🔴 Columna izquierda vacía bajo "Tres pasos". | Igual que Vender. |
| Dónde buscar | 🟠 Solo texto y chips. | Mosaico de cuatro fotos de zonas (Campolivar, Santa Bárbara, Torre en Conill, Mas Camarena). |
| Incluido | 🟠 Cuatro columnas de texto. | Igual que Vender. |
| En venta ahora | 🔴 Tarjetas apiladas en una sola columna con fotos enormes (`comprar-05`, 2.400 px). | Rejilla de tres, como en Propiedades. |
| Preguntas | 🟠 Respuestas en TODO-TEXTO. | Redactar (os dejo las cuatro preguntas). |

### Servicios
🟢 Es la página mejor resuelta: foto + texto en filas alternas. Pendientes: botón con más aire bajo el párrafo; la foto de "Valoración y venta" se repite con Vender; "Renders y reforma" pide un render real vuestro (antes/después) y "Off market" una foto discreta (un portal cerrado, una verja) en vez de la plaza del Ayuntamiento.

### Nosotros
| Sección | Hallazgo | Propuesta |
|---|---|---|
| Banner | 🟢 Vídeo bien. 🟢 Menú poco legible sobre el cielo. | Degradado arriba. |
| Quiénes somos | 🟠 Solo texto, columna izquierda vacía. | Foto del equipo. |
| El equipo | 🔴 Cinco recuadros grises con iniciales (`nosotros-05`). | Retratos reales, mismo encuadre y fondo; sin foto no se publica el bloque. Hugo sin apellido ni cargo. |
| Lo que hacemos | 🟠 Mitad derecha vacía. | Foto o quitar el bloque y dejar solo el botón al final de Quiénes somos. |

### Alquiler por habitaciones
🟢 Correcta. 🟠 La foto del hero (paseo con palmeras) no habla de habitaciones: mejor una habitación preparada, luminosa, de un piso real. Los planes con precio están bien resueltos.

### Zonas (índice)
🟢 Tarjetas con foto, bien. 🟠 Las fotos de Bétera (golf al atardecer) y Paterna (plato de cerámica) no identifican el municipio; La Virgen de la Vega sale nevada, que no es su imagen principal. 🟠 La tarjeta de Godella tiene dos líneas de texto y la de Paterna seis: igualar a dos.

### Guía de zona (Godella como ejemplo; las cinco comparten plantilla)
| Sección | Hallazgo | Propuesta |
|---|---|---|
| Hero | 🔴 Foto provisional de banco con aviso TODO-MEDIA visible. | Vídeo aéreo propio de 10-15 s en bucle. |
| El pueblo | 🟠 Texto + seis datos, sin foto. | Una foto apaisada del lugar más reconocible (plaza, estación) bajo los datos. |
| Urbanizaciones | 🟢 Foto por urbanización. 🔴 La foto de Campolivar es la del chalet genérico; "Junto a la huerta" lleva una foto del Parque de Cabecera, que no es Godella. | Foto propia de cada urbanización: entrada, calle típica, una casa. |
| Estilo de vida | 🟠 Tres columnas de texto. | Tres fotos pequeñas (jardín, colegio, huerta). |
| Qué ofrece | 🔴 Seis ítems que nombran lugares concretos (British School, Casa Museo Pinazo, metro, barranco) sin ninguna foto. | Aquí está el mayor salto: **una foto por ítem**. |
| Distancias | 🟢 Bien como tabla. | Opcional: mapa esquemático. |
| Patrimonio | 🟠 Cuatro ítems sin foto. | Una foto por ítem. |
| La zona en imágenes | 🔴 Dos fotos de Commons y un aviso TODO enorme en un recuadro. | Galería de 6-8 fotos propias y el vídeo aéreo; el aviso se quita al publicar. |
| Propiedades | 🟢 Bien. | Nada. |
| Nodus en la zona | 🟠 Solo texto. | Foto de la oficina o del equipo en la zona. |

### Propiedades y ficha
🟢 Listado correcto. 🟠 La primera propiedad (Avda. de Baleares) tiene como portada un aula de oficina: elegir otra foto de portada. 🟠 En la ficha, la galería no se amplía al pulsar (ya apuntado en la auditoría anterior). 🟢 "Sobre esta propiedad" corregido.

### Blog y Contacto
🟢 Blog bien, artículos en TODO. 🟢 Contacto bien resuelto; dirección pendiente.

## Inventario de lugares por zona (hueco de foto)

Formato: lugar · dónde se menciona · tipo de pieza · fuente sugerida. Las fotos de Google Maps y Street View **no se pueden reutilizar** en una web comercial (son de Google o de quien las subió); sirven para localizar el encuadre, no como imagen final. Fuentes válidas: fotos propias (móvil o dron), Wikimedia Commons con crédito, o fotos cedidas por el lugar (colegio, club) con permiso por escrito.

### Godella
| Lugar | Se menciona en | Pieza | Fuente |
|---|---|---|---|
| Castillo-Masía de San Fernando | Urbanizaciones, Patrimonio, galería | Foto apaisada + plano aéreo | Propia (dron) |
| Entrada de Campolivar | Urbanizaciones, galería | Foto | Propia |
| British School Los Olivos | Qué ofrece, Estilo de vida, galería | Foto exterior | Propia desde la calle, o cedida por el colegio |
| Plaza e iglesia de San Bartolomé | Urbanizaciones, Patrimonio | Foto | Propia (hay una de Commons) |
| Subida a la Ermita del Salvador y villas | Urbanizaciones, Patrimonio | Foto | Propia (hay una de Commons) |
| Casa Museo Pinazo | Qué ofrece, Patrimonio | Foto | Propia o cedida por el museo |
| Molino de la Real Acequia de Moncada | Urbanizaciones (huerta) | Foto | Propia |
| Barranco del Carraixet | Qué ofrece, Estilo de vida | Foto | Propia |
| Estación de metro de Godella | Qué ofrece, Datos | Foto | Propia |
| Palacio de Serdañola | Patrimonio | Foto | Propia o Commons |
| Godella desde el aire | Hero | Vídeo 10-15 s | Propia (dron) |

### Rocafort
| Lugar | Se menciona en | Pieza | Fuente |
|---|---|---|---|
| Entrada de Santa Bárbara | Urbanizaciones | Foto | Propia |
| Cambridge House Community College | Qué ofrece, galería | Foto exterior | Propia desde la calle, o cedida por el colegio |
| Club de Campo | Qué ofrece | Foto | Propia o cedida por el club |
| Club Español de Tenis | Qué ofrece | Foto | Propia o cedida |
| Piscina de La Charca | Lugares | Foto | Propia |
| Ermita de Santa Bárbara | Patrimonio | Foto | Propia o Commons |
| Villa Amparo | Qué ofrece, Patrimonio, galería | Foto | Commons (hay) o propia |
| Plaza e iglesia de San Sebastián | Patrimonio, galería | Foto | Commons (hay) o propia |
| Jardín del barón de Terrateig | Patrimonio | Foto | Propia |
| Estación de metro de Rocafort | Qué ofrece | Foto | Propia |
| Santa Bárbara desde el aire | Hero | Vídeo | Propia (dron) |

### Bétera
| Lugar | Se menciona en | Pieza | Fuente |
|---|---|---|---|
| Club de Golf Escorpión | Qué ofrece, Patrimonio | Foto | Propia o cedida por el club |
| Calles de Torre en Conill | Urbanizaciones | Foto | Propia |
| Entrada con control de acceso | Qué ofrece | Foto | Propia (sin personal ni matrículas) |
| Sierra Calderona desde la urbanización | Qué ofrece, Patrimonio | Foto | Propia |
| Castillo y plaza de Bétera | Patrimonio, galería | Foto | Commons (hay) o propia |
| Estación de metro de Bétera | Datos | Foto | Propia |
| Cartuja de Portaceli | Patrimonio, galería | Foto | Commons (hay) |
| Parque Tecnológico | Qué ofrece | Foto | Propia |
| Torre en Conill desde el aire | Hero | Vídeo | Propia (dron; comprobar normativa de vuelo) |

### Paterna
| Lugar | Se menciona en | Pieza | Fuente |
|---|---|---|---|
| Entrada de Mas Camarena | Urbanizaciones | Foto | Propia |
| Calles de La Cañada y sus pinos | Urbanizaciones | Foto | Propia |
| Estación de metro de La Canyada | Qué ofrece | Foto | Propia |
| Parque Tecnológico | Qué ofrece | Foto | Propia |
| Torre de Paterna y coves | Patrimonio, galería | Foto | Commons (hay) o propia |
| La Cordà | Patrimonio, galería | Foto | Commons (hay) |
| Pinar de la Vallesa | Qué ofrece, Patrimonio | Foto | Propia |
| Valterna / Terramelar | Urbanizaciones | Foto | Propia |
| Colegios de las urbanizaciones | Qué ofrece | Foto | TODO-DATO: cuáles; propia o cedida |
| Mas Camarena desde el aire | Hero | Vídeo | Propia (dron) |

### La Virgen de la Vega
| Lugar | Se menciona en | Pieza | Fuente |
|---|---|---|---|
| Santuario y Fuente de La Riscla | Qué ofrece, galería | Foto | Commons (hay) o propia |
| Pista de esquí artificial | Qué ofrece | Foto | Propia |
| Golf El Castillejo | Qué ofrece | Foto | Propia o cedida |
| Senda fluvial del río Alcalá | Lugares | Foto | Propia |
| Alcalá de la Selva (casco y castillo) | Urbanizaciones, galería | Foto | Commons (hay) |
| Valdelinares | Qué ofrece, galería | Foto | Commons (hay) |
| La urbanización en verano | Hero | Vídeo | Propia (dron) |

Para cada zona faltan además **dos o tres urbanizaciones más** que solo vosotros conocéis (TODO-DATO en Godella "Junto a la huerta" y en Rocafort "Otras urbanizaciones").

## Apartados que rellena Nodus

Para que podáis volcar la información sin tocar código, cada bloque tiene su campo. Lo recojo aquí como plantilla; si preferís, lo paso a una hoja de cálculo.

**Cifras (home y Vender)**: operaciones cerradas · años en activo o año de inicio · propiedades vendidas en los últimos doce meses · portales en los que publicáis · cualquier otra que podáis sostener. Nada de promesas de plazo ni de precio.

**Reseñas**: nombre (o nombre e inicial), operación (venta / compra / alquiler), zona, texto literal de Google, fecha, y si tenéis permiso para publicarla con nombre.

**Equipo**: nombre completo, cargo, zonas que lleva, correo, teléfono (opcional), retrato.

**FAQ de Comprar**: ¿Cuesta algo buscar con Nodus? · ¿Cómo se filtran las propiedades que me proponéis? · ¿Podéis ayudarme con la reforma y la hipoteca? · ¿Y si también vendo mi propiedad?

**Servicios**: proceso de reforma con un caso real (antes, render, después) · qué entendéis por grandes activos en off market.

**Zonas, por municipio**: urbanizaciones que queréis destacar y una frase de cada una · colegios que recomendáis · tres cosas que solo sabe un vecino · fotos y vídeo del inventario de arriba.

**Contacto**: dirección pública de la oficina y horario.

## Orden propuesto

1. **Maquetación sin fotos nuevas** (lo que no depende de vosotros): hero con subtítulo corto, gancho con hueco para vídeo, aire en los botones, columna izquierda de los pasos, rejilla de "En venta ahora", degradado bajo el menú, menú lateral que no tape el cierre, tarjetas de Zonas igualadas.
2. **Fotos que ya existen**: quitar repeticiones usando lo que hay (Commons y Pexels) y sustituir las que no identifican el sitio.
3. **Rodaje por zonas** con el inventario de arriba, en un día por municipio: dron y lugares concretos.
4. **Contenido vuestro**: cifras, reseñas, equipo, FAQ, urbanizaciones.
5. Repaso final y publicación con el dominio.
