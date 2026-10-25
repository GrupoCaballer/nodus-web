import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

const LINKS = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/vender", label: "Vender" },
  { href: "/alquilar", label: "Alquilar" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const SOCIAL = [
  { href: SITE.instagram, label: "Instagram" },
  { href: SITE.tiktok, label: "TikTok" },
  { href: SITE.linkedin, label: "LinkedIn" },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <nav aria-label="Pie de página" className={styles.links}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.meta}>
          <dl className={styles.contact}>
            <div>
              <dt>Oficina</dt>
              <dd>{SITE.place}</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </dd>
            </div>
          </dl>
          <ul className={styles.social}>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.giant} aria-hidden>
        <Logo />
      </div>

      <div className={styles.legal}>
        <p>
          © {new Date().getFullYear()} Nodus Real Estate · Titular: {SITE.legal.holder}
        </p>
        <ul>
          <li>
            <Link href="/aviso-legal">Aviso legal</Link>
          </li>
          <li>
            <Link href="/privacidad">Privacidad</Link>
          </li>
          <li>
            <Link href="/cookies">Cookies</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
