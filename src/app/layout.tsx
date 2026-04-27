import type { Metadata } from "next";
import "./globals.css";
import { PRODUCT } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCT.homepage),
  title: {
    default: `${PRODUCT.name} — Batch image processing for macOS`,
    template: `%s · ${PRODUCT.name}`,
  },
  description:
    "Native macOS Apple Silicon app for batch image processing. 7 transformations, live preview, reusable presets. Free and open source.",
  applicationName: PRODUCT.name,
  category: "multimedia",
  authors: [{ name: PRODUCT.author.fullName, url: PRODUCT.author.url }],
  creator: PRODUCT.author.fullName,
  alternates: {
    canonical: "/",
    languages: {
      es: "/es",
      en: "/en",
      "x-default": "/es",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-white text-apple-text antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
