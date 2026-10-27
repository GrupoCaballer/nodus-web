import { SITE } from "@/lib/site";
import styles from "./WhatsApp.module.css";

/** Enlace a WhatsApp de Nodus. `tone` ajusta el color al fondo; `block` lo muestra como botón. */
export default function WhatsApp({ block = false, label = "Escríbenos por WhatsApp", className }: { block?: boolean; label?: string; className?: string }) {
  return (
    <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${block ? styles.block : styles.inline} ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden className={styles.icon}>
        <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.4c-.2 0-.5 0-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.4.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6Z" />
      </svg>
      <span>{label}</span>
      {block && <span className={styles.num}>{SITE.whatsapp}</span>}
    </a>
  );
}
