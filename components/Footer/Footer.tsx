import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { GUIAS } from "@/lib/zonas";
import CookiesButton from "@/components/CookieBar/CookiesButton";
import WhatsApp from "@/components/ui/WhatsApp";
import styles from "./Footer.module.css";

const COLUMNAS = [
  {
    titulo: "Inmuebles",
    links: [
      { href: "/propiedades", label: "Propiedades" },
      { href: "/zonas", label: "Zonas" },
      { href: "/vender", label: "Vender" },
      { href: "/comprar", label: "Comprar" },
    ],
  },
  {
    titulo: "Nodus",
    links: [
      { href: "/servicios", label: "Servicios" },
      { href: "/alquilar", label: "Alquiler por habitaciones" },
      { href: "/nosotros", label: "Nosotros" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    // Enlaces a cada guía desde todas las páginas: Google entiende que son importantes. Sale solo de lib/zonas.
    titulo: "Zonas",
    links: GUIAS.map((g) => ({ href: `/zonas/${g.slug}`, label: g.nombre })),
  },
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
        {COLUMNAS.map((c) => (
          <nav key={c.titulo} aria-label={c.titulo} className={styles.col}>
            <h2 className={styles.colTitle}>{c.titulo}</h2>
            <ul className={styles.links}>
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contacto</h2>
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
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <WhatsApp label={SITE.whatsapp} />
              </dd>
            </div>
          </dl>
          {SOCIAL.length > 0 && (
            <ul className={styles.social}>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Link href="/contacto" className={styles.contactLink}>
            Hablemos <span aria-hidden>→</span>
          </Link>
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
          <li>
            <CookiesButton className={styles.cookiesBtn} />
          </li>
        </ul>
      </div>
    </footer>
  );
}
