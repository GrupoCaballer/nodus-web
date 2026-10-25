"use client";

/** Reabre la barra de cookies en modo preferencias (escucha en CookieBar). */
export default function CookiesButton({ className, children = "Configurar cookies" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("nodus:cookies"))}>
      {children}
    </button>
  );
}
