"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useDictionary, useLocale } from "@/lib/dictionary-context";
import { useGitHubRelease } from "@/lib/useGitHubRelease";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const dict = useDictionary();
  const locale = useLocale();
  const { pkgUrl } = useGitHubRelease();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-apple-border-soft shadow-apple-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href={`/${locale}`}
            className="flex items-center gap-2.5"
            aria-label="Image Transform Lite"
          >
            <Image
              src="/icon.png"
              alt=""
              width={32}
              height={32}
              className="rounded-apple-sm"
              priority
            />
            <span className="font-semibold text-base text-apple-text tracking-tight">
              Image Transform Lite
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm text-apple-text-secondary hover:text-apple-text transition-colors"
              >
                {dict.nav[link.id]}
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href={pkgUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-apple-blue text-white text-sm font-medium hover:bg-apple-blue-dark transition-colors shadow-apple-glow"
            >
              <Download size={14} />
              {dict.nav.downloadCta}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-apple-text-secondary hover:text-apple-text"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-apple-border-soft mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-apple-text-secondary hover:text-apple-text transition-colors py-1"
                >
                  {dict.nav[link.id]}
                </a>
              ))}
              <div className="flex items-center justify-between pt-1">
                <LanguageSwitcher />
                <a
                  href={pkgUrl}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-apple-blue text-white text-sm font-medium"
                >
                  <Download size={14} />
                  {dict.nav.downloadCta}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
