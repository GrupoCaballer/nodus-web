"use client";

import Link from "next/link";
import { useActionState } from "react";
import { enviarContacto, type EstadoContacto } from "@/app/actions/contacto";
import { SITE } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Props = {
  /** Etiqueta que llega en el asunto del correo (p. ej. "Vender"). */
  origen: string;
  /** Muestra el campo "vivienda / zona". */
  conVivienda?: boolean;
  cta?: string;
  tone?: "light" | "dark";
};

/** Formulario de contacto: Server Action, honeypot, confirmación sin recargar. */
export default function ContactForm({ origen, conVivienda = false, cta = "Enviar mensaje", tone = "light" }: Props) {
  const [estado, action, pending] = useActionState<EstadoContacto | null, FormData>(enviarContacto, null);

  if (estado?.ok) {
    return (
      <div className={`${styles.done} ${tone === "dark" ? styles.dark : ""}`} role="status">
        <p className={styles.doneTitle}>Mensaje enviado.</p>
        <p>Te contestamos en el día, normalmente por teléfono.</p>
        {estado.dev && <p className={styles.devNote}>Modo desarrollo: el correo no se ha enviado (falta RESEND_API_KEY).</p>}
      </div>
    );
  }

  return (
    <form action={action} className={`${styles.form} ${tone === "dark" ? styles.dark : ""}`} noValidate>
      <input type="hidden" name="origen" value={origen} />
      <div className={styles.hp} aria-hidden>
        <label>
          No rellenar <input type="text" name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Nombre</span>
          <input name="nombre" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Teléfono</span>
          <input name="telefono" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <label className={styles.field}>
        <span>Correo</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      {conVivienda && (
        <label className={styles.field}>
          <span>Dirección o zona de la vivienda</span>
          <input name="vivienda" type="text" placeholder="Campolivar, Godella" />
        </label>
      )}
      <label className={styles.field}>
        <span>Mensaje</span>
        <textarea name="mensaje" rows={4} />
      </label>

      {estado && !estado.ok && (
        <p className={styles.error} role="alert">
          {estado.error}
        </p>
      )}

      <p className={styles.legal}>
        Responsable: {SITE.legal.holder} (Nodus Real Estate). Usaremos tus datos para atender tu consulta, sobre la base de
        medidas precontractuales o del interés legítimo en responderte. Intervienen proveedores de correo; no se usarán para
        publicidad. Puedes ejercer tus derechos en {SITE.email}. Detalles en la <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <button type="submit" className={styles.submit} disabled={pending}>
        <span>{pending ? "Enviando…" : cta}</span>
        <span aria-hidden className={styles.arrow}>
          →
        </span>
      </button>
    </form>
  );
}
