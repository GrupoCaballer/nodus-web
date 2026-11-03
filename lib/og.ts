/**
 * Imagen para compartir (WhatsApp, LinkedIn) de una foto de la web: 1200x630 en JPG de menos de 200 KB.
 * Las genera `python3 scripts/og.py` en public/og. "/fotos/zonas/godella-ermita.webp" → "/og/fotos-zonas-godella-ermita.jpg".
 */
export const og = (src: string) => ({
  url: `/og/${src.replace(/^\//, "").replace(/\.[a-z]+$/i, "").replace(/\//g, "-")}.jpg`,
  width: 1200,
  height: 630,
});
