// Eventos de analítica vía dataLayer (Google Tag Manager). Sin consentimiento GTM no se carga
// y los eventos se quedan en el navegador: no sale nada.
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const ENTRADA = "nodus-entrada";

/** Guarda la primera página de la visita y de dónde venía (buscador, Instagram…), una vez por sesión. */
export function guardarEntrada(pathname: string) {
  try {
    if (sessionStorage.getItem(ENTRADA)) return;
    const ref = document.referrer && !document.referrer.startsWith(location.origin) ? new URL(document.referrer).hostname : "directo";
    sessionStorage.setItem(ENTRADA, `${pathname} (desde ${ref})`);
  } catch {}
}

export function leerEntrada() {
  try {
    return sessionStorage.getItem(ENTRADA) ?? "";
  } catch {
    return "";
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
