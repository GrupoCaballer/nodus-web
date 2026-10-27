import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Los buscadores con IA (GPTBot, ClaudeBot, PerplexityBot) quedan permitidos: queremos que nos citen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
