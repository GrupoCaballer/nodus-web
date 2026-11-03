import type { Metadata } from "next";
import { og } from "@/lib/og";
import { Cormorant_Garamond, Instrument_Sans, Lora } from "next/font/google";
import LenisProvider from "@/components/motion/LenisProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CookieBar from "@/components/CookieBar/CookieBar";
import Analytics from "@/components/Analytics/Analytics";
import { SITE } from "@/lib/site";
import "./globals.css";

// Fuentes de Google Fonts autoalojadas por next/font (se descargan al compilar y se sirven desde la propia web).
// Antes eran woff2 locales incompletos (sin las letras normales) y la web caía en la letra de reserva (3-11-2026).
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// Etiquetas doradas ("Quiénes somos", "Cómo trabajamos"…): Cormorant Garamond cursiva, elegida por Hugo el 3-11-2026.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Inmobiliaria en Godella y el norte de Valencia · Nodus",
    template: "%s · Nodus Real Estate",
  },
  description:
    "Inmobiliaria en Godella. Vendemos y buscamos casas en Godella, Rocafort, Bétera y Paterna, con web propia de cada vivienda y anuncio de calidad.",
  openGraph: {
    siteName: SITE.name,
    locale: "es_ES",
    type: "website",
    images: [og("/fotos/vender-aereo.webp")],
  },
};

// Ficha de la agencia en todas las páginas. TODO-DIRECCION: calle y CP cuando Dirección confirme la dirección pública (Godella o Quart de Poblet).
const agenciaLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE.url}/#agencia`,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  logo: `${SITE.url}/logo/nodus-logo-negro.svg`,
  address: { "@type": "PostalAddress", addressLocality: "Godella", addressRegion: "Valencia", addressCountry: "ES" },
  areaServed: ["Valencia", "Godella", "Rocafort", "Bétera", "Paterna", "Burjassot", "Provincia de Valencia"],
  sameAs: [SITE.instagram, SITE.tiktok, SITE.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${lora.variable} ${cormorant.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agenciaLd) }} />
        <Analytics />
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBar />
        </LenisProvider>
      </body>
    </html>
  );
}
