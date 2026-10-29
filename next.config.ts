import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Cabeceras de seguridad. La CSP permite solo lo que la web usa: GTM/GA4 (tras consentimiento),
// visitas Matterport y vídeos de YouTube en las fichas. En desarrollo Next necesita 'unsafe-eval'.
const dev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com https://*.google-analytics.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vercel.live wss://*.pusher.com",
  "frame-src https://my.matterport.com https://www.youtube-nocookie.com https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  // NEXT_DIST_DIR permite un build de producción (Lighthouse) sin pisar el .next del servidor de desarrollo.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
