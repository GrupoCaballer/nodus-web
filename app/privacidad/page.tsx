import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Nodus Real Estate los datos que facilitas en los formularios de la web.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

export default function Page() {
  return (
    <Legal titulo="Política de privacidad" actualizado="octubre de 2026">
      <h2>1. Responsable</h2>
      <p>
        {SITE.legal.holder}, con nombre comercial Nodus Real Estate y NIF {SITE.legal.nif}, es el responsable del tratamiento.
        Domicilio: {SITE.legal.address}, España. Para cualquier cuestión de privacidad, escribe a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. Datos, finalidad y base jurídica</h2>
      <p>
        Tratamos los datos que facilitas al contactar: nombre, email, teléfono, la dirección o zona de la vivienda si la indicas
        y el contenido del mensaje. Los utilizamos para responder consultas y atender solicitudes inmobiliarias. No los usamos
        para enviar newsletters ni publicidad.
      </p>
      <p>
        Cuando solicitas información para contratar nuestros servicios, la base jurídica es la aplicación de medidas
        precontractuales a petición tuya (artículo 6.1.b del RGPD). Para otras consultas, es nuestro interés legítimo en atender
        las comunicaciones que nos diriges (artículo 6.1.f del RGPD).
      </p>
      <p>
        En los formularios necesitamos nombre, teléfono y email para tramitar la consulta; el resto de campos son opcionales. En
        la solicitud de información de un inmueble recibimos también la referencia del inmueble consultado. No envíes datos
        sensibles ni información de terceros que no sea necesaria. No adoptamos decisiones automatizadas ni elaboramos perfiles
        a partir de tus consultas.
      </p>

      <h2>3. Conservación</h2>
      <p>
        Conservamos los datos mientras sea necesario para atender y dar seguimiento a tu solicitud. Una vez finalizada, se
        suprimirán o quedarán bloqueados durante los plazos legales necesarios para atender posibles responsabilidades. Si
        contratas un servicio, se conservarán los datos necesarios durante la relación contractual y los plazos legales
        aplicables.
      </p>

      <h2>4. Proveedores y destinatarios</h2>
      <p>
        La web se aloja en Vercel. Los formularios utilizan Resend para enviar tu consulta al correo de Nodus. Estos proveedores
        intervienen en la prestación del servicio. No vendemos tus datos ni los cedemos para publicidad. También podrán
        comunicarse a las autoridades cuando exista una obligación legal.
      </p>
      <p>
        El uso de estos proveedores puede implicar tratamiento fuera del Espacio Económico Europeo. Sus acuerdos de tratamiento
        contemplan cláusulas contractuales tipo para las transferencias internacionales. Puedes solicitar información sobre las
        garantías aplicables en nuestro email de contacto.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes solicitar el acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, cuando
        procedan, escribiendo a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Indica el derecho que deseas ejercer y los
        datos necesarios para localizar tu solicitud. Si existen dudas razonables sobre tu identidad, podremos pedir información
        adicional para verificarla.
      </p>
      <p>
        Si consideras que el tratamiento vulnera tus derechos, puedes presentar una reclamación ante la{" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          Agencia Española de Protección de Datos
        </a>
        .
      </p>

      <h2>6. Navegación y servicios externos</h2>
      <p>
        El servidor puede tratar datos técnicos de conexión, como la dirección IP, para prestar el servicio y mantener su
        seguridad, sobre la base del interés legítimo en proteger la web. Las herramientas de analítica solo se cargan si las
        autorizas en el panel de cookies. Puedes rechazarlas o modificar tu elección desde «Configurar cookies». Consulta nuestra{" "}
        <Link href="/cookies">política de cookies</Link>.
      </p>
      <p>
        Las tipografías se sirven desde esta misma web; no se cargan desde servidores de terceros. Los vídeos de YouTube y las
        visitas virtuales de Matterport de las fichas de inmuebles solo se cargan cuando pulsas para verlos. Si accedes a
        nuestras redes sociales mediante un enlace, se aplicará la política de la plataforma correspondiente.
      </p>
    </Legal>
  );
}
