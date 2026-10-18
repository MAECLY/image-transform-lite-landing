"use client";

import AnimatedOnScroll from "@/components/ui/AnimatedOnScroll";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BeforeAfterCard from "@/components/showcase/BeforeAfterCard";
import {
  TRANSFORMATIONS,
  SHOWCASE_IMAGES,
  type TransformationId,
} from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";

interface DemoConfig {
  beforeStyle?: React.CSSProperties;
  afterStyle: React.CSSProperties;
  beforeContainerClass?: string;
  afterContainerClass?: string;
  afterOverlay?: string;
}

const demoStyles: Record<TransformationId, DemoConfig> = {
  flip: {
    afterStyle: { transform: "scaleX(-1)" },
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
  },
  rotate: {
    afterStyle: { transform: "rotate(12deg) scale(1.08)" },
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
  },
  crop: {
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-square",
    afterStyle: { transform: "scale(1.25)", transformOrigin: "center" },
  },
  resize: {
    beforeContainerClass: "aspect-[4/3] flex items-center justify-center p-3",
    afterContainerClass:
      "aspect-[4/3] flex items-center justify-center p-3 bg-grid-soft",
    beforeStyle: { width: "100%", height: "100%" },
    afterStyle: {
      width: "55%",
      height: "55%",
      borderRadius: "6px",
    },
  },
  brightness: {
    afterStyle: { filter: "brightness(1.4)" },
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
  },
  contrast: {
    afterStyle: { filter: "contrast(1.55) saturate(1.05)" },
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
  },
  sharpness: {
    afterStyle: {
      filter: "contrast(1.18) saturate(1.12) brightness(1.04)",
    },
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
  },
  watermark: {
    afterStyle: {},
    beforeContainerClass: "aspect-[4/3]",
    afterContainerClass: "aspect-[4/3]",
    afterOverlay: "© MAECLY",
  },
};

export default function TransformationsShowcase() {
  const dict = useDictionary();

  return (
    <SectionWrapper id="transformations" className="bg-white">
      <AnimatedOnScroll>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-4 tracking-tight">
            {dict.transformations.title}
          </h2>
          <p className="text-apple-text-secondary text-lg max-w-2xl mx-auto">
            {dict.transformations.subtitle}
          </p>
        </div>
      </AnimatedOnScroll>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {TRANSFORMATIONS.map((t, i) => {
          const item = dict.transformations.items[t.id];
          const demo = demoStyles[t.id];
          return (
            <AnimatedOnScroll key={t.id} delay={i * 0.05}>
              <BeforeAfterCard
                title={item.title}
                description={item.description}
                beforeLabel={dict.transformations.before}
                afterLabel={dict.transformations.after}
                icon={t.icon}
                imgSrc={SHOWCASE_IMAGES[t.id]}
                beforeStyle={demo.beforeStyle}
                afterStyle={demo.afterStyle}
                beforeContainerClass={demo.beforeContainerClass}
                afterContainerClass={demo.afterContainerClass}
                afterOverlay={demo.afterOverlay}
                altBefore={`${item.title} — ${dict.transformations.before}`}
                altAfter={`${item.title} — ${dict.transformations.after}`}
              />
            </AnimatedOnScroll>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
