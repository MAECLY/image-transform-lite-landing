import "server-only";
import type { Dictionary } from "./types";
import type { Locale } from "./config";

const dictionaries = {
  es: () => import("@/messages/es.json").then((m) => m.default as Dictionary),
  en: () => import("@/messages/en.json").then((m) => m.default as Dictionary),
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.es;
  return loader();
}
