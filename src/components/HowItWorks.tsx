"use client";

import { FolderOpen, Sliders, Eye, Download } from "lucide-react";
import AnimatedOnScroll from "@/components/ui/AnimatedOnScroll";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { STEPS, type StepIcon } from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";

const iconMap: Record<StepIcon, typeof FolderOpen> = {
  FolderOpen,
  Sliders,
  Eye,
  Download,
};

export default function HowItWorks() {
  const dict = useDictionary();

  return (
    <SectionWrapper id="how-it-works" className="bg-white">
      <AnimatedOnScroll>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-4 tracking-tight">
            {dict.howItWorks.title}
          </h2>
          <p className="text-apple-text-secondary text-lg max-w-2xl mx-auto">
            {dict.howItWorks.subtitle}
          </p>
        </div>
      </AnimatedOnScroll>

      <div className="relative">
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-apple-blue/20 via-apple-indigo/30 to-apple-blue/20" />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <AnimatedOnScroll key={step.id} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-apple-lg bg-white border border-apple-border-soft shadow-apple-sm mb-5 relative z-10">
                    <Icon size={22} className="text-apple-blue" />
                  </div>
                  <div className="text-xs font-semibold text-apple-text-tertiary mb-1 tracking-wider">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-apple-text text-lg mb-2">
                    {dict.howItWorks.steps[step.id].title}
                  </h3>
                  <p className="text-sm text-apple-text-secondary leading-relaxed">
                    {dict.howItWorks.steps[step.id].description}
                  </p>
                </div>
              </AnimatedOnScroll>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
