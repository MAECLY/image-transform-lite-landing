import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/lib/dictionary-context";
import { LangSync } from "@/components/LangSync";
import { PRODUCT } from "@/lib/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = await getDictionary(rawLocale);
  const localeLang = rawLocale === "es" ? "es_ES" : "en_US";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `/${rawLocale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      url: `${PRODUCT.homepage}/${rawLocale}`,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      siteName: PRODUCT.name,
      locale: localeLang,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: dict.meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/opengraph-image.png"],
    },
  };
}

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: PRODUCT.name,
  description:
    "Native macOS Apple Silicon app for batch image processing with 8 configurable transformations, live preview, and reusable JSON presets.",
  url: PRODUCT.homepage,
  operatingSystem: "macOS 11+",
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Image Processing",
  processorRequirements: "Apple Silicon (arm64)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: PRODUCT.author.fullName,
    alternateName: PRODUCT.author.name,
    url: PRODUCT.author.url,
  },
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  downloadUrl: PRODUCT.github.releases,
  softwareVersion: PRODUCT.fallbackVersion,
  releaseNotes: `${PRODUCT.github.url}/blob/main/CHANGELOG.md`,
  featureList: [
    "Live preview with 150ms debounce",
    "8 image transformations (Flip, Rotate, Safe Square Crop, Resize, Brightness, Contrast, Sharpness, Watermark)",
    "Drag-and-drop transformation reordering",
    "JSON-based reusable presets",
    "Batch recursive processing preserving folder structure",
    "Multi-format input (JPG, PNG, WebP, BMP, TIFF)",
    "Multi-format output (WebP, JPEG, PNG, TIFF)",
    "Auto-update from GitHub Releases",
  ],
  fileSize: "~32MB",
  inLanguage: ["es", "en"],
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: PRODUCT.name,
  url: PRODUCT.homepage,
  logo: `${PRODUCT.homepage}/icon.png`,
  sameAs: [PRODUCT.github.url, PRODUCT.author.url],
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider locale={locale} dictionary={dictionary}>
      <LangSync locale={locale} />
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd).replace(/</g, "\\u003c"),
        }}
      />
    </DictionaryProvider>
  );
}
