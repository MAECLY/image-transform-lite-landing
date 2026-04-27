"use client";

import {
  Eye,
  GripVertical,
  Bookmark,
  Layers,
  FileImage,
  RefreshCw,
  PanelLeft,
  Github,
} from "lucide-react";
import AnimatedOnScroll from "@/components/ui/AnimatedOnScroll";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import { FEATURES, type FeatureIcon } from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";

const iconMap: Record<FeatureIcon, typeof Eye> = {
  Eye,
  GripVertical,
  Bookmark,
  Layers,
  FileImage,
  RefreshCw,
  PanelLeft,
  Github,
};

type FeatureId = keyof ReturnType<typeof useDictionary>["features"]["items"];

export default function Features() {
  const dict = useDictionary();

  return (
    <SectionWrapper id="features" className="bg-apple-bg">
      <AnimatedOnScroll>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-4 tracking-tight">
            {dict.features.title}
          </h2>
          <p className="text-apple-text-secondary text-lg max-w-2xl mx-auto">
            {dict.features.subtitle}
          </p>
        </div>
      </AnimatedOnScroll>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          const item = dict.features.items[feature.id as FeatureId];
          return (
            <AnimatedOnScroll key={feature.id} delay={i * 0.04}>
              <GlowCard>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-apple bg-gradient-to-br from-apple-blue/15 to-apple-indigo/15 flex items-center justify-center mb-4 group-hover:from-apple-blue/25 group-hover:to-apple-indigo/25 transition-colors">
                    <Icon size={20} className="text-apple-blue" />
                  </div>
                  <h3 className="font-semibold text-apple-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-apple-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlowCard>
            </AnimatedOnScroll>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
