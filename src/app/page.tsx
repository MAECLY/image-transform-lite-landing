import Link from "next/link";
import { defaultLocale, locales } from "@/i18n/config";

export const dynamic = "force-static";

const redirectScript = `(function(){
  try {
    var supported = ${JSON.stringify(locales)};
    var stored = localStorage.getItem("itl-locale");
    var nav = (navigator.language || "").toLowerCase().split("-")[0];
    var target = supported.indexOf(stored) !== -1 ? stored
      : supported.indexOf(nav) !== -1 ? nav
      : ${JSON.stringify(defaultLocale)};
    window.location.replace("/" + target + "/");
  } catch (e) {
    window.location.replace("/${defaultLocale}/");
  }
})();`;

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}/`} />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4">
          <h1 className="text-2xl font-semibold text-apple-text">
            Image Transform Lite
          </h1>
          <p className="text-apple-text-secondary">
            Choose a language / Elige un idioma:
          </p>
          <div className="flex gap-3">
            <Link
              href="/es/"
              className="px-5 py-2 rounded-apple-lg bg-apple-blue text-white font-medium"
            >
              Español
            </Link>
            <Link
              href="/en/"
              className="px-5 py-2 rounded-apple-lg border border-apple-border text-apple-text font-medium"
            >
              English
            </Link>
          </div>
        </div>
      </noscript>
    </>
  );
}
