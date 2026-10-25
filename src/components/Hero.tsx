"use client";

import dynamic from "next/dynamic";
import {
  ArrowRight,
  Github,
  Check,
  Shield,
  Scale,
  Download,
  Star,
} from "lucide-react";
import { PRODUCT } from "@/lib/constants";
import { useDictionary, useLocale } from "@/lib/dictionary-context";
import { formatCount, formatMetricLabel } from "@/lib/github-metrics";
import { useGitHubMetrics } from "@/lib/useGitHubMetrics";
import { useGitHubRelease } from "@/lib/useGitHubRelease";
import AppMockup from "./AppMockup";

const SoftLightBackground = dynamic(() => import("./SoftLightBackground"), {
  ssr: false,
});

export default function Hero() {
  const dict = useDictionary();
  const { version, pkgUrl, isFresh } = useGitHubRelease();
  const badge = dict.hero.badgeWithVersion.replace("{version}", version);
  const locale = useLocale();
  const { downloads, stars } = useGitHubMetrics();
  const downloadsLabel = formatMetricLabel(
    downloads,
    locale,
    dict.hero.social.downloads
  );
  const starsLabel = formatMetricLabel(stars, locale, dict.hero.stars);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-white">
      <SoftLightBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-apple-blue/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-apple-indigo/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 z-10 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center">
          <div>
            <div className="hero-fade-in" style={{ animationDelay: "0s" }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-apple-blue/10 text-apple-blue border border-apple-blue/20 mb-6">
                {isFresh ? (
                  badge
                ) : (
                  <>
                    {badge}
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-apple-blue/40 animate-pulse" />
                  </>
                )}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 hero-fade-in text-apple-text"
              style={{ animationDelay: "0.1s" }}
            >
              {dict.hero.headlineLine1}
              <br />
              {dict.hero.headlineLine2}
              <br />
              <span className="text-gradient">{dict.hero.headlineAccent}</span>
            </h1>

            <p
              className="text-lg text-apple-text-secondary max-w-xl mb-6 hero-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {dict.hero.subtitle}
            </p>

            <ul
              className="space-y-2 mb-8 hero-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {dict.hero.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2.5 text-sm text-apple-text"
                >
                  <div className="w-4 h-4 rounded-full bg-apple-blue/15 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-apple-blue" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>

            <div
              className="flex flex-col sm:flex-row items-start gap-3 mb-7 hero-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href={pkgUrl}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-apple-lg bg-apple-blue text-white font-semibold hover:bg-apple-blue-dark transition-all shadow-apple-glow hover:shadow-[0_8px_32px_rgba(0,122,255,0.25)]"
              >
                {dict.hero.ctaDownload}
                <ArrowRight size={16} />
              </a>
              <a
                href={PRODUCT.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-apple-lg border border-apple-border text-apple-text font-medium hover:border-apple-text-secondary hover:bg-apple-bg transition-all bg-white"
              >
                <Github size={16} />
                {dict.hero.ctaGithub}
                {starsLabel && stars !== null && (
                  <span
                    className="inline-flex items-center gap-1 pl-2 ml-0.5 border-l border-apple-border text-sm text-apple-text-secondary tabular-nums"
                    title={starsLabel}
                  >
                    <Star size={13} aria-hidden="true" />
                    <span aria-hidden="true">{formatCount(stars, locale)}</span>
                    <span className="sr-only">{starsLabel}</span>
                  </span>
                )}
              </a>
            </div>

            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-apple-text-tertiary hero-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Scale size={12} className="text-apple-blue" />
                {dict.hero.social.license}
              </span>
              <span className="text-apple-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Shield size={12} className="text-apple-blue" />
                {dict.hero.social.openSource}
              </span>
              <span className="text-apple-border">·</span>
              <span>{dict.hero.social.platform}</span>
              <span className="text-apple-border">·</span>
              <span>{dict.hero.social.noTelemetry}</span>
              {downloadsLabel && (
                <>
                  <span className="text-apple-border">·</span>
                  <span className="inline-flex items-center gap-1.5 tabular-nums">
                    <Download size={12} className="text-apple-blue" />
                    {downloadsLabel}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <AppMockup />
          </div>
        </div>

        <div className="lg:hidden mt-12">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
