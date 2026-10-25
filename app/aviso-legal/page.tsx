import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Titular, objeto y condiciones de uso de la web de Nodus Real Estate.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false },
};

export default function Page() {
  return (
    <Legal titulo="Aviso legal" actualizado="octubre de 2026">
      <h2>1. Titular de la web</h2>
      <ul>
        <li>Titular: {SITE.legal.holder}.</li>
        <li>Nombre comercial: Nodus Real Estate.</li>
        <li>NIF: {SITE.legal.nif}.</li>
        <li>Domicilio: {SITE.legal.address}, España.</li>
        <li>
          Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </li>
        <li>
          Teléfono: <a href={SITE.phoneHref}>{SITE.phone}</a>.
        </li>
        <li>Sitio web: nodusrealestate.com.</li>
      </ul>

      <h2>2. Objeto y uso de la web</h2>
      <p>
        Esta web ofrece información sobre inmuebles y servicios inmobiliarios de Nodus Real Estate. El acceso es gratuito. El
        usuario debe utilizarla de forma lícita, sin perjudicar su funcionamiento ni los derechos de otras personas.
      </p>
      <p>
        La información de los inmuebles es orientativa y puede actualizarse. La disponibilidad, el precio y las condiciones de
        cada operación se confirmarán de forma individual antes de contratar. El envío de una consulta no supone una reserva ni
        la formalización de un contrato.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, logotipos y demás contenidos pertenecen a su titular o se utilizan con la autorización
        correspondiente. Su reproducción, distribución o uso comercial requiere autorización, salvo los usos permitidos por la
        ley. Las fotografías de entorno procedentes de bancos de imágenes libres se usan bajo su licencia correspondiente.
      </p>

      <h2>4. Funcionamiento y enlaces</h2>
      <p>
        Procuramos mantener la información actualizada y la web disponible. Si detectas un error, puedes comunicarlo al email
        indicado. Los enlaces a sitios de terceros conducen a servicios con sus propias condiciones. Las responsabilidades se
        determinarán conforme a la legislación aplicable.
      </p>

      <h2>5. Privacidad y legislación</h2>
      <p>
        El tratamiento de datos personales se explica en la <Link href="/privacidad">política de privacidad</Link>. Este aviso
        se rige por la legislación española, sin perjuicio de los derechos y garantías que correspondan al usuario como
        consumidor.
      </p>
    </Legal>
  );
}
