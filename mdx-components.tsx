import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Elementos que genera el MDX del blog; los estilos viven en app/blog/[slug]/page.module.css (.prose)
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...rest }) =>
      href.startsWith("/") ? (
        <Link href={href} {...rest}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      ),
    ...components,
  };
}
