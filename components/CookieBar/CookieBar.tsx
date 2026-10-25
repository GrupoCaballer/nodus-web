"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieBar.module.css";

export type Consent = { necessary: true; analytics: boolean; date: string };
const KEY = "nodus-consent";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/**
 * Barra de cookies. Google Analytics solo tras aceptar: los scripts de
 * analítica escuchan el evento "nodus:consent".
 */
export default function CookieBar() {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setVisible(!readConsent());
    const reopen = () => {
      setPrefs(true);
      setVisible(true);
    };
    window.addEventListener("nodus:cookies", reopen);
    return () => window.removeEventListener("nodus:cookies", reopen);
  }, []);

  const save = (value: boolean) => {
    const consent: Consent = { necessary: true, analytics: value, date: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {}
    window.dispatchEvent(new CustomEvent("nodus:consent", { detail: consent }));
    setVisible(false);
    setPrefs(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.bar} role="dialog" aria-label="Preferencias de cookies" data-lenis-prevent>
      <p className={styles.text}>
        Usamos cookies necesarias para que la web funcione y, solo si usted lo acepta, cookies de analítica para
        entender cómo se usa. <Link href="/cookies">Más información</Link>
      </p>

      {prefs && (
        <fieldset className={styles.prefs}>
          <legend className="visually-hidden">Tipos de cookies</legend>
          <label>
            <input type="checkbox" checked disabled /> Necesarias
          </label>
          <label>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analítica
          </label>
        </fieldset>
      )}

      <div className={styles.actions}>
        {prefs ? (
          <button className={styles.primary} onClick={() => save(analytics)}>
            Guardar preferencias
          </button>
        ) : (
          <>
            <button className={styles.link} onClick={() => setPrefs(true)}>
              Preferencias
            </button>
            <button className={styles.secondary} onClick={() => save(false)}>
              Rechazar
            </button>
            <button className={styles.primary} onClick={() => save(true)}>
              Aceptar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
