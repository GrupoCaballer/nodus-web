"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { NAV, SITE } from "@/lib/site";
import WhatsApp from "@/components/ui/WhatsApp";
import styles from "./Header.module.css";

/**
 * Cabecera fija. Transparente con letra oscura solo sobre el cielo de la portada
 * ([data-header-over] sin valor); sobre fotos o fondos oscuros ([data-header-over="dark"])
 * y en el resto de la página es una franja negra con letra clara.
 * Se oculta al bajar, vuelve al subir y al acercar el ratón al borde de arriba.
 */
export default function Header() {
  const pathname = usePathname();
  const [over, setOver] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const zone = document.querySelector<HTMLElement>("[data-header-over]");
      setOver(!!zone && zone.dataset.headerOver !== "dark" && zone.getBoundingClientRect().bottom > 80);
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 200);
        lastY = y;
      }
    };
    // Al acercar el ratón al borde de arriba, la franja vuelve a aparecer.
    const onMove = (e: MouseEvent) => {
      if (e.clientY < 90) setHidden(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={[styles.header, over ? styles.over : styles.solid, hidden && !open ? styles.hidden : "", open ? styles.open : ""].join(" ")}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Nodus Real Estate, inicio">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href="/contacto" arrow={false}>
            Hablemos
          </Button>
        </div>

        <button className={styles.burger} aria-expanded={open} aria-controls="menu-movil" onClick={() => setOpen((o) => !o)}>
          <span className="visually-hidden">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden className={styles.burgerLines} />
        </button>
      </div>

      <nav id="menu-movil" className={styles.mobile} aria-label="Menú móvil" hidden={!open}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/contacto">Contacto</Link>
        <div className={styles.mobileContact}>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <WhatsApp block />
        </div>
      </nav>
    </header>
  );
}
