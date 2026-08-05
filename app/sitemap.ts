import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sonicasbake.com";

  const productUrls = PRODUCTS.map((p) => ({
    url: `${baseUrl}/cakes/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    "",
    "/cakes",
    "/custom-cake",
    "/gallery",
    "/reviews",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...staticUrls, ...productUrls];
}
