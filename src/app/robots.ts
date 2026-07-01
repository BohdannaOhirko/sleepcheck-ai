import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/register", "/reset-password", "/dashboard"],
      },
    ],
    sitemap: "https://sleepcheck-ai.ehokor.com.ua/sitemap.xml",
  };
}