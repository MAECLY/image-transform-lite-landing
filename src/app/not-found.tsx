import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gradient mb-4">404</h1>
        <p className="text-apple-text-secondary mb-8">Page not found.</p>
        <Link
          href={`/${defaultLocale}`}
          className="inline-flex items-center px-6 py-2.5 rounded-apple-lg bg-apple-blue text-white font-medium hover:bg-apple-blue-dark transition-colors shadow-apple-glow"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
