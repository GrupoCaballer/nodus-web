import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/motion/LenisProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CookieBar from "@/components/CookieBar/CookieBar";
import Cursor from "@/components/ui/Cursor";
import { SITE } from "@/lib/site";
import "./globals.css";

// Fuentes autoalojadas (woff2 de Google Fonts, subset latin).
const instrument = localFont({
  src: "./fonts/instrument-variable.woff2",
  weight: "500 700",
  variable: "--font-instrument",
  display: "swap",
});

const lora = localFont({
  src: [
    { path: "./fonts/lora-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lora-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Nodus Real Estate · Inmobiliaria en València",
    template: "%s · Nodus Real Estate",
  },
  description:
    "Asesoramiento inmobiliario integral en València. Compra, venta, alquiler e inversión, desde la primera visita hasta la firma.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${lora.variable}`}>
      <body>
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBar />
          <Cursor />
        </LenisProvider>
      </body>
    </html>
  );
}
