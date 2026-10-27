import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  // NEXT_DIST_DIR permite un build de producción (Lighthouse) sin pisar el .next del servidor de desarrollo.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      { source: "/zonas/campolivar", destination: "/zonas/godella", permanent: true },
      { source: "/zonas/santa-barbara", destination: "/zonas/rocafort", permanent: true },
      { source: "/zonas/torre-en-conill", destination: "/zonas/betera", permanent: true },
      { source: "/zonas/mas-camarena", destination: "/zonas/paterna", permanent: true },
      { source: "/zonas/la-canada", destination: "/zonas/paterna", permanent: true },
      // URLs de la web anterior (sitemap de nodusrealestate.com a 27-10-2026)
      { source: "/vender-piso-valencia", destination: "/vender", permanent: true },
      { source: "/gestion-alquiler-habitaciones-valencia", destination: "/alquilar", permanent: true },
      { source: "/bio", destination: "/nosotros", permanent: true },
      { source: "/zona", destination: "/zonas", permanent: true },
      { source: "/zona/campolivar-godella", destination: "/zonas/godella", permanent: true },
      { source: "/zona/:slug", destination: "/zonas/:slug", permanent: true },
      { source: "/politica-de-privacidad", destination: "/privacidad", permanent: true },
      { source: "/politica-de-cookies", destination: "/cookies", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
