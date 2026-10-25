import Link from "next/link";
import styles from "./Button.module.css";

type Props = {
  href?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
};

/** Botón pill. Negro sobre claro, blanco sobre oscuro. La flecha se desplaza al hover. */
export default function Button({ href, children, tone = "dark", type = "button", className, onClick, arrow = true }: Props) {
  const cls = [styles.btn, tone === "light" ? styles.light : styles.dark, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden>
          →
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
