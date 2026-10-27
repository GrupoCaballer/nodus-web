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
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
