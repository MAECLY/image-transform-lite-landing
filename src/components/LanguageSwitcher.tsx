"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/lib/dictionary-context";

const labels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export default function LanguageSwitcher() {
  const dict = useDictionary();
  const currentLocale = useLocale();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-apple-border-soft bg-white/70 backdrop-blur p-0.5 text-xs font-medium"
      role="group"
      aria-label={dict.language.label}
    >
      <Languages
        size={12}
        className="ml-2 mr-0.5 text-apple-text-secondary"
        aria-hidden
      />
      {locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            aria-current={active ? "true" : undefined}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              active
                ? "bg-apple-blue text-white shadow-sm"
                : "text-apple-text-secondary hover:text-apple-text"
            }`}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
