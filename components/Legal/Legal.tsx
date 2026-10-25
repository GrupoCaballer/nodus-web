import styles from "./Legal.module.css";

/** Página legal: título y cuerpo con estilos de prosa. */
export default function Legal({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: React.ReactNode }) {
  return (
    <article className={`container ${styles.root}`}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Información legal</p>
        <h1 className={styles.h1}>{titulo}</h1>
        <p className={styles.date}>Última actualización: {actualizado}</p>
      </header>
      <div className={styles.prose}>{children}</div>
    </article>
  );
}
