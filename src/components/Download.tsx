"use client";

import {
  Package,
  FileArchive,
  Download as DownloadIcon,
  ExternalLink,
} from "lucide-react";
import { BorderBeam } from "@stianlarsen/border-beam";
import AnimatedOnScroll from "@/components/ui/AnimatedOnScroll";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  DOWNLOAD_OPTIONS,
  PRODUCT,
  type DownloadOptionId,
} from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";
import { useGitHubRelease } from "@/lib/useGitHubRelease";

const iconMap = {
  Package,
  FileArchive,
} as const;

export default function Download() {
  const dict = useDictionary();
  const { version, pkgUrl, zipUrl } = useGitHubRelease();
  const urls: Record<DownloadOptionId, string> = {
    pkg: pkgUrl,
    zip: zipUrl,
  };
  const badge = dict.download.badgeWithVersion.replace("{version}", version);

  return (
    <SectionWrapper
      id="download"
      className="bg-gradient-to-b from-apple-bg via-white to-apple-bg"
    >
      <AnimatedOnScroll>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-4 tracking-tight">
            {dict.download.title}
          </h2>
          <p className="text-apple-text-secondary text-lg mb-5 max-w-2xl mx-auto">
            {dict.download.subtitle}
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-apple-green/10 text-apple-green border border-apple-green/20">
            {badge}
          </span>
        </div>
      </AnimatedOnScroll>

      <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {DOWNLOAD_OPTIONS.map((option, i) => {
          const Icon = iconMap[option.icon];
          const item = dict.download.options[option.id];
          const isRecommended = option.recommended;
          return (
            <AnimatedOnScroll key={option.id} delay={i * 0.1}>
              <div
                className={`relative p-6 rounded-apple-lg bg-white border transition-all h-full flex flex-col overflow-hidden ${
                  isRecommended
                    ? "border-apple-blue/40 shadow-apple-md"
                    : "border-apple-border-soft shadow-apple hover:border-apple-text-tertiary"
                }`}
              >
                {isRecommended && (
                  <BorderBeam
                    size={200}
                    duration={6}
                    colorFrom="#007aff"
                    colorTo="#5e5ce6"
                    borderWidth={2}
                  />
                )}
                {isRecommended && "badge" in item && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-apple-blue/10 text-apple-blue border border-apple-blue/20">
                      {item.badge}
                    </span>
                  </div>
                )}
                <div
                  className={`w-11 h-11 rounded-apple flex items-center justify-center mb-4 ${
                    isRecommended ? "bg-apple-blue/10" : "bg-apple-bg"
                  }`}
                >
                  <Icon
                    size={22}
                    className={
                      isRecommended ? "text-apple-blue" : "text-apple-text"
                    }
                  />
                </div>
                <h3 className="font-semibold text-apple-text text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-apple-text-secondary mb-5 flex-1">
                  {item.description}
                </p>
                <a
                  href={urls[option.id]}
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-apple-lg font-medium text-sm transition-all ${
                    isRecommended
                      ? "bg-apple-blue text-white hover:bg-apple-blue-dark shadow-apple-glow"
                      : "border border-apple-border text-apple-text hover:border-apple-text-tertiary bg-white"
                  }`}
                >
                  <DownloadIcon size={14} />
                  {item.cta}
                </a>
              </div>
            </AnimatedOnScroll>
          );
        })}
      </div>

      <AnimatedOnScroll delay={0.25}>
        <div className="text-center mt-9 space-y-2">
          <a
            href={PRODUCT.github.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-apple-text-secondary hover:text-apple-blue transition-colors"
          >
            {dict.download.viewAll}
            <ExternalLink size={12} />
          </a>
          <p className="text-xs text-apple-text-tertiary">
            {dict.download.requirements}
          </p>
          <p className="text-xs text-apple-text-tertiary max-w-xl mx-auto">
            {dict.download.gatekeeperNote}
          </p>
        </div>
      </AnimatedOnScroll>
    </SectionWrapper>
  );
}
