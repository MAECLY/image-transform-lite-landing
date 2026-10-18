import type { MetadataRoute } from "next";
import { PRODUCT } from "@/lib/constants";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT.name} — Batch image processing for macOS`,
    short_name: PRODUCT.name,
    description:
      "Native macOS Apple Silicon app for batch image processing with 8 transformations, live preview, and reusable presets.",
    start_url: "/es",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007aff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
