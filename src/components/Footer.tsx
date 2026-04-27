"use client";

import Image from "next/image";
import { Github, ExternalLink, User } from "lucide-react";
import { NAV_LINKS, PRODUCT } from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";

export default function Footer() {
  const dict = useDictionary();

  return (
    <footer className="border-t border-apple-border-soft bg-apple-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/icon.png"
                alt=""
                width={24}
                height={24}
                className="rounded-apple-sm"
              />
              <span className="font-semibold text-apple-text">
                Image Transform Lite
              </span>
            </div>
            <p className="text-sm text-apple-text-tertiary leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-apple-text mb-3">
              {dict.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                  >
                    {dict.nav[link.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-apple-text mb-3">
              {dict.footer.resources}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={PRODUCT.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                >
                  <Github size={12} />
                  {dict.footer.links.github}
                </a>
              </li>
              <li>
                <a
                  href={PRODUCT.github.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                >
                  <ExternalLink size={12} />
                  {dict.footer.links.releases}
                </a>
              </li>
              <li>
                <a
                  href={PRODUCT.github.issues}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                >
                  <ExternalLink size={12} />
                  {dict.footer.links.issues}
                </a>
              </li>
              <li>
                <a
                  href={PRODUCT.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                >
                  <User size={12} />
                  {dict.footer.links.creator}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-apple-text mb-3">
              {dict.footer.legal}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={PRODUCT.github.license}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
                >
                  {dict.footer.license}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-apple-border-soft flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-apple-text-tertiary">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href={PRODUCT.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-text-secondary hover:text-apple-blue transition-colors font-medium"
            >
              {PRODUCT.author.name.toUpperCase()}
            </a>
            . {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
