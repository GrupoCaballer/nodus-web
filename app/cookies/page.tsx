import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal/Legal";
import CookiesButton from "@/components/CookieBar/CookiesButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies y almacenamiento usa la web de Nodus Real Estate y cómo cambiar tu elección.",
  alternates: { canonical: "/cookies" },
  robots: { index: false },
};

export default function Page() {
  return (
    <Legal titulo="Política de cookies" actualizado="noviembre de 2026">
      <h2>1. Cookies y almacenamiento local</h2>
      <p>
        Las cookies son pequeños archivos que un sitio guarda en tu navegador. El almacenamiento local permite guardar
        información en ese navegador. En esta web utilizamos almacenamiento local para recordar tu elección sobre cookies.
      </p>

      <h2>2. Qué puedes elegir</h2>
      <ul>
        <li>Necesarias: permiten recordar tu elección y el funcionamiento básico de la web. Siempre activas.</li>
        <li>
          Analítica: permite medir las visitas y entender cómo se usa la web. Solo se carga si la aceptas. Está desactivada por
          defecto.
        </li>
      </ul>
      <p>
        Si aceptas la analítica, cargamos Google Tag Manager, que a su vez activa Google Analytics 4. Los dos son servicios de
        Google Ireland Limited. Tag Manager no guarda cookies propias; Google Analytics guarda estas:
      </p>
      <ul>
        <li>
          <code>_ga</code>: distingue a un visitante de otro de forma anónima. Dura 2 años.
        </li>
        <li>
          <code>_ga_VR2Q2Y7EPY</code>: guarda el estado de la visita (cuándo empezó y cuántas páginas has visto). Dura 2 años.
        </li>
      </ul>
      <p>
        Con ellas medimos qué páginas se visitan, desde dónde llegan las visitas y qué botones se pulsan (WhatsApp, teléfono,
        correo y formularios). No usamos esta información para publicidad ni para identificarte. No usamos cookies de
        publicidad.
      </p>
      <p>
        Los vídeos de YouTube y las visitas virtuales de Matterport de las fichas de inmuebles no se cargan hasta que pulsas para
        verlos. Al cargarlos, esos proveedores pueden recibir datos de navegación y usar sus propias cookies.
      </p>

      <h2>3. Cómo recordamos tu decisión</h2>
      <p>
        Guardamos tu preferencia con el nombre <code>nodus-consent</code> en el almacenamiento local del navegador. Incluye la
        categoría elegida y la fecha. Se guarda tanto si aceptas como si rechazas la analítica. Si tu navegador bloquea el
        almacenamiento, la decisión se aplica durante la visita y puede volver a solicitarse al recargar.
      </p>

      <h2>4. Cambiar o retirar tu consentimiento</h2>
      <p>
        Puedes cambiar tu elección en cualquier momento desde <CookiesButton />, también disponible en el pie de página. Al
        retirar la analítica, dejará de cargarse en tu próxima visita. También puedes borrar cookies y datos de sitios desde los
        ajustes del navegador. Desde esta web no podemos eliminar las cookies guardadas en dominios de terceros.
      </p>

      <h2>5. Servicios externos</h2>
      <p>
        Puedes consultar la política de privacidad de{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google (Analytics, Tag Manager y YouTube)
        </a>{" "}
        y la de{" "}
        <a href="https://matterport.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Matterport
        </a>
        . Las tipografías se sirven desde esta misma web.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para consultas sobre privacidad, escribe a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Encontrarás la información
        del responsable y cómo ejercer tus derechos en la <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </Legal>
  );
}
