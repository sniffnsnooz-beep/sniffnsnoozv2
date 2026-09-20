import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
