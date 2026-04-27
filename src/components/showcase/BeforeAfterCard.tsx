"use client";

import type { CSSProperties } from "react";
import {
  FlipHorizontal,
  RotateCw,
  Crop,
  Maximize,
  Sun,
  Contrast,
  Aperture,
} from "lucide-react";
import type { TransformationIcon } from "@/lib/constants";

const iconMap: Record<TransformationIcon, typeof FlipHorizontal> = {
  FlipHorizontal,
  RotateCw,
  Crop,
  Maximize,
  Sun,
  Contrast,
  Aperture,
};

interface BeforeAfterCardProps {
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  icon: TransformationIcon;
  imgSrc: string;
  beforeStyle?: CSSProperties;
  afterStyle: CSSProperties;
  beforeContainerClass?: string;
  afterContainerClass?: string;
  altBefore: string;
  altAfter: string;
}

export default function BeforeAfterCard({
  title,
  description,
  beforeLabel,
  afterLabel,
  icon,
  imgSrc,
  beforeStyle,
  afterStyle,
  beforeContainerClass = "",
  afterContainerClass = "",
  altBefore,
  altAfter,
}: BeforeAfterCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="rounded-apple-lg bg-white border border-apple-border-soft shadow-apple p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-apple bg-apple-blue/10 flex items-center justify-center">
          <Icon size={18} className="text-apple-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-apple-text leading-tight">
            {title}
          </h3>
          <p className="text-xs text-apple-text-secondary mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-apple-text-tertiary font-semibold mb-1.5">
            {beforeLabel}
          </div>
          <div
            className={`overflow-hidden rounded-apple bg-apple-bg border border-apple-border-soft ${beforeContainerClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={altBefore}
              loading="lazy"
              className="w-full h-full object-cover block"
              style={beforeStyle}
            />
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-apple-blue font-semibold mb-1.5">
            {afterLabel}
          </div>
          <div
            className={`overflow-hidden rounded-apple bg-apple-bg border border-apple-blue/30 ${afterContainerClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={altAfter}
              loading="lazy"
              className="w-full h-full object-cover block"
              style={afterStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
