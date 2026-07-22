import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",        // Admin panel
          "/api/",          // API routes — no need to crawl
          "/_next/",        // Next.js internals
          "/api/admin/",    // Admin API endpoints
        ],
      },
      {
        // Block GPTBot and similar AI scrapers from crawling content
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: "https://sniffnsnooz.in/sitemap.xml",
    host: "https://sniffnsnooz.in",
  };
}
