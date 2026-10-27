// Datos de contacto y navegación (fuente: docs/contexto/contenido-web-actual.md)
export const SITE = {
  name: "Nodus Real Estate",
  url: "https://nodusrealestate.com",
  email: "info@nodusrealestate.com",
  phone: "+34 960 628 296",
  phoneHref: "tel:+34960628296",
  whatsapp: "682 291 051",
  whatsappHref: "https://wa.me/34682291051?text=" + encodeURIComponent("Hola, Nodus. Os escribo desde la web."),
  place: "Godella, València",
  instagram: "https://www.instagram.com/nodusrealestate",
  // TODO-REDES: confirmar URLs de TikTok y LinkedIn
  tiktok: "",
  linkedin: "",
  legal: {
    holder: "Adrián Carlos Pajares Crespo",
    nif: "48604234J",
    address: "Plaza Cortes Valencianas 2 A29, 46930 Quart de Poblet (Valencia)",
  },
};

export const NAV = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/vender", label: "Vender" },
  { href: "/comprar", label: "Comprar" },
  { href: "/zonas", label: "Zonas" },
  { href: "/servicios", label: "Servicios" },
  { href: "/blog", label: "Blog" },
];
