import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm/ContactForm";
import WhatsApp from "@/components/ui/WhatsApp";
import { allSituaciones, loadSituacion, slugsSituaciones } from "@/lib/situaciones";
import { fecha } from "@/lib/blog";
import { SITE } from "@/lib/site";
import styles from "../../blog/[slug]/page.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugsSituaciones().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!slugsSituaciones().includes(slug)) return {};
  const { meta } = await loadSituacion(slug);
  return {
    title: meta.titulo,
    description: meta.resumen,
    alternates: { canonical: `/vender/${slug}` },
    openGraph: { type: "article", title: meta.titulo, description: meta.resumen, images: ["/fotos/vender-aereo.webp"] },
    ...(meta.borrador && { robots: { index: false, follow: true } }),
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!slugsSituaciones().includes(slug)) notFound();
  const { Content, meta } = await loadSituacion(slug);
  const otras = (await allSituaciones()).filter((s) => s.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: meta.titulo,
        description: meta.resumen,
        dateModified: meta.fecha,
        author: { "@id": `${SITE.url}/#agencia` },
        publisher: { "@id": `${SITE.url}/#agencia` },
        mainEntityOfPage: `${SITE.url}/vender/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Vender", item: `${SITE.url}/vender` },
          { "@type": "ListItem", position: 2, name: meta.corto, item: `${SITE.url}/vender/${slug}` },
        ],
      },
    ],
  };

  return (
    <article className={`container ${styles.root}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={styles.head}>
        <p className={styles.meta}>
          <Link href="/vender">Vender</Link> · Actualizado el <time dateTime={meta.fecha}>{fecha(meta.fecha)}</time>
        </p>
        <h1 className={styles.h1}>{meta.titulo}</h1>
        <p className={styles.lead}>{meta.resumen}</p>
      </header>

      <div className={styles.prose}>
        <Content />
      </div>

      <footer className={styles.foot}>
        <section id="contacto" aria-labelledby="caso" className={styles.prose}>
          <h2 id="caso">Cuéntanos tu caso</h2>
          <p>Te llamamos, revisamos tu situación y te decimos qué precio es realista para tu vivienda y qué gastos tendrás. Sin compromiso.</p>
          <ContactForm origen={`Vender · ${meta.corto}`} conVivienda cta="Quiero que me llaméis" />
          <WhatsApp />
        </section>
        {otras.length > 0 && (
          <section aria-labelledby="mas">
            <h2 id="mas" className={styles.masTitle}>
              Otros casos al vender
            </h2>
            <ul className={styles.mas}>
              {otras.map((s) => (
                <li key={s.slug}>
                  <Link href={`/vender/${s.slug}`}>
                    <span className={styles.masMeta}>Vender</span>
                    <span className={styles.masT}>{s.titulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </footer>
    </article>
  );
}
