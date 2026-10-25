import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { allPosts, fecha, loadPost, slugs } from "@/lib/blog";
import { SITE } from "@/lib/site";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!slugs().includes(slug)) return {};
  const { meta } = await loadPost(slug);
  return {
    title: meta.titulo,
    description: meta.resumen,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: meta.titulo, description: meta.resumen, images: [meta.imagen], publishedTime: meta.fecha },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!slugs().includes(slug)) notFound();
  const { Content, meta } = await loadPost(slug);
  const otros = (await allPosts()).filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.titulo,
    description: meta.resumen,
    datePublished: meta.fecha,
    image: SITE.url + meta.imagen,
    author: { "@type": "Organization", name: meta.autor ?? SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
  };

  return (
    <article className={`container ${styles.root}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={styles.head}>
        <p className={styles.meta}>
          <Link href={`/blog?cat=${encodeURIComponent(meta.categoria)}`}>{meta.categoria}</Link> ·{" "}
          <time dateTime={meta.fecha}>{fecha(meta.fecha)}</time>
        </p>
        <h1 className={styles.h1}>{meta.titulo}</h1>
        <p className={styles.lead}>{meta.resumen}</p>
      </header>

      <figure className={styles.fig}>
        <Image src={meta.imagen} alt={meta.alt} fill priority sizes="100vw" className={styles.img} />
      </figure>

      <div className={styles.prose}>
        <Content />
      </div>

      <footer className={styles.foot}>
        <div className={styles.cta}>
          <p>¿Hablamos de tu caso?</p>
          <Button href="/contacto">Contactar con Nodus</Button>
        </div>
        {otros.length > 0 && (
          <section aria-labelledby="mas">
            <h2 id="mas" className={styles.masTitle}>
              Más artículos
            </h2>
            <ul className={styles.mas}>
              {otros.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>
                    <span className={styles.masMeta}>{p.categoria}</span>
                    <span className={styles.masT}>{p.titulo}</span>
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
