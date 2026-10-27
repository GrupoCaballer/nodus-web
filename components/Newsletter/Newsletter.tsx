"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { suscribir, type EstadoNewsletter } from "@/app/actions/newsletter";
import { track } from "@/lib/track";
import styles from "./Newsletter.module.css";

/** Alta en la newsletter: un campo, confirmación sin recargar. */
export default function Newsletter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [estado, action, pending] = useActionState<EstadoNewsletter | null, FormData>(suscribir, null);

  useEffect(() => {
    if (estado?.ok) track("newsletter_signup");
  }, [estado]);

  return (
    <div className={`${styles.root} ${tone === "dark" ? styles.dark : ""}`}>
      <p className={styles.title}>Precios por barrio y lo que sale antes de publicarse.</p>
      <p className={styles.text}>Un correo al mes, sin publicidad. Te das de baja con un clic.</p>
      {estado?.ok ? (
        <p className={styles.done} role="status">
          Apuntado. {estado.dev && "(Modo desarrollo: el alta no se ha registrado.)"}
        </p>
      ) : (
        <form action={action} className={styles.form}>
          <input type="text" name="web" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden />
          <label className={styles.field}>
            <span className="visually-hidden">Correo electrónico</span>
            <input name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required />
          </label>
          <button type="submit" className={styles.btn} disabled={pending} aria-label="Apuntarme a la newsletter">
            {pending ? "…" : "→"}
          </button>
          {estado && !estado.ok && (
            <p className={styles.error} role="alert">
              {estado.error}
            </p>
          )}
        </form>
      )}
      <p className={styles.legal}>
        Al apuntarte aceptas la <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </div>
  );
}
