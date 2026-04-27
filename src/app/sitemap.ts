import type { MetadataRoute } from "next";
import { PRODUCT } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${PRODUCT.homepage}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: `${PRODUCT.homepage}/es`,
          en: `${PRODUCT.homepage}/en`,
        },
      },
    },
    {
      url: `${PRODUCT.homepage}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${PRODUCT.homepage}/es`,
          en: `${PRODUCT.homepage}/en`,
        },
      },
    },
  ];
}
