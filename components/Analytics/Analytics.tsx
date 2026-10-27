"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { readConsent, type Consent } from "@/components/CookieBar/CookieBar";
import { guardarEntrada, track } from "@/lib/track";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function cargarGTM() {
  if (!GTM_ID || document.getElementById("gtm")) return;
  track("gtm.js", { "gtm.start": Date.now() });
  const s = document.createElement("script");
  s.id = "gtm";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/**
 * Google Tag Manager solo tras aceptar la analítica en la barra de cookies.
 * Eventos: page_view en cada cambio de ruta, clics en WhatsApp, teléfono y correo.
 * Los formularios envían generate_lead y newsletter_signup desde su propio componente.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (readConsent()?.analytics) cargarGTM();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<Consent>).detail?.analytics) cargarGTM();
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me")) track("whatsapp_click", { pagina: location.pathname });
      else if (href.startsWith("tel:")) track("phone_click", { pagina: location.pathname });
      else if (href.startsWith("mailto:")) track("email_click", { pagina: location.pathname });
    };
    window.addEventListener("nodus:consent", onConsent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("nodus:consent", onConsent);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Navegación interna de Next: GTM no ve recargas, así que avisamos de cada página.
  useEffect(() => {
    guardarEntrada(pathname);
    track("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
