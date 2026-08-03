import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",        // Admin panel
          "/api/",          // API routes
          "/_next/",        // Next.js internals
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot",
          "DuckDuckBot"
        ],
        allow: "/",
      },
    ],
    sitemap: "https://sniffnsnooz.in/sitemap.xml",
    host: "https://sniffnsnooz.in",
  };
}
