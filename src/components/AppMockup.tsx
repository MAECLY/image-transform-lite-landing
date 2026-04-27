"use client";

import { GripVertical, Plus, Upload, Download } from "lucide-react";
import { useDictionary } from "@/lib/dictionary-context";

const transforms = [
  { id: "flip", on: true },
  { id: "rotate", on: true },
  { id: "resize", on: false },
] as const;

export default function AppMockup() {
  const dict = useDictionary();
  const transformLabels: Record<(typeof transforms)[number]["id"], string> = {
    flip: dict.transformations.items.flip.title,
    rotate: dict.transformations.items.rotate.title,
    resize: dict.transformations.items.resize.title,
  };

  return (
    <div className="relative hero-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="animate-float">
        <div
          className="w-full max-w-[640px] mx-auto rounded-apple-xl bg-white border border-apple-border shadow-apple-lg overflow-hidden"
          style={{
            transform: "perspective(1400px) rotateY(-3deg) rotateX(2deg)",
          }}
        >
          {/* Window chrome (macOS) */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-apple-bg border-b border-apple-border-soft">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-apple-red" />
              <div className="w-3 h-3 rounded-full bg-apple-yellow" />
              <div className="w-3 h-3 rounded-full bg-apple-green" />
            </div>
            <span className="text-[11px] text-apple-text-secondary font-medium">
              {dict.hero.mockup.windowTitle}
            </span>
            <div className="w-12" />
          </div>

          <div className="flex" style={{ minHeight: 380 }}>
            {/* Sidebar */}
            <aside className="w-[150px] bg-white border-r border-apple-border-soft p-3 flex flex-col gap-3 flex-shrink-0">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-apple-text-tertiary mb-2 font-semibold">
                  {dict.hero.mockup.presetsLabel}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-apple-blue/10 text-apple-blue text-[11px] font-medium">
                    <span className="w-4 h-4 rounded-full bg-apple-blue text-white text-[8px] flex items-center justify-center font-bold">
                      D
                    </span>
                    {dict.hero.mockup.presetDefault}
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-apple-text-secondary text-[11px]">
                    <span className="w-4 h-4 rounded-full bg-apple-bg text-apple-text-secondary text-[8px] flex items-center justify-center font-bold">
                      W
                    </span>
                    {dict.hero.mockup.presetWeb}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 mt-auto">
                <button
                  className="h-7 rounded-md bg-apple-bg flex items-center justify-center text-apple-text-secondary cursor-default"
                  aria-hidden
                >
                  <Plus size={12} />
                </button>
                <button
                  className="h-7 rounded-md bg-apple-bg flex items-center justify-center text-apple-text-secondary cursor-default"
                  aria-hidden
                >
                  <Download size={12} />
                </button>
                <button
                  className="h-7 rounded-md bg-apple-bg flex items-center justify-center text-apple-text-secondary cursor-default"
                  aria-hidden
                >
                  <Upload size={12} />
                </button>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-3 space-y-3 bg-apple-bg min-w-0">
              <div className="bg-white rounded-apple p-2.5 border border-apple-border-soft">
                <div className="text-[9px] text-apple-text-tertiary mb-1 font-semibold tracking-wider">
                  {dict.hero.mockup.inputLabel}
                </div>
                <div className="text-[11px] text-apple-text font-mono truncate">
                  {dict.hero.mockup.inputPath}
                </div>
              </div>

              <div className="bg-white rounded-apple p-2.5 border border-apple-border-soft">
                <div className="text-[9px] text-apple-text-tertiary mb-2 font-semibold tracking-wider">
                  {dict.hero.mockup.previewLabel}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-md bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden">
                    <span className="absolute top-1.5 left-1.5 text-[9px] bg-white/90 px-1.5 py-0.5 rounded font-medium text-apple-text-secondary">
                      {dict.hero.mockup.previewBefore}
                    </span>
                  </div>
                  <div
                    className="aspect-square rounded-md bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden"
                    style={{ filter: "brightness(1.15) contrast(1.1)" }}
                  >
                    <span className="absolute top-1.5 left-1.5 text-[9px] bg-white/90 px-1.5 py-0.5 rounded font-medium text-apple-text-secondary">
                      {dict.hero.mockup.previewAfter}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                {transforms.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between bg-white rounded-md px-2.5 py-2 border border-apple-border-soft"
                  >
                    <div className="flex items-center gap-1.5">
                      <GripVertical
                        size={12}
                        className="text-apple-text-tertiary"
                      />
                      <span className="text-[11px] text-apple-text font-medium">
                        {transformLabels[t.id]}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                        t.on ? "bg-apple-blue" : "bg-apple-border"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-white transition-transform ${
                          t.on ? "translate-x-3" : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-2 rounded-apple bg-apple-blue text-white text-[11px] font-semibold cursor-default shadow-apple-glow"
                aria-hidden
              >
                {dict.hero.mockup.process}
              </button>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
