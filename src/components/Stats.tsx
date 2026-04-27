"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { STATS } from "@/lib/constants";
import { useDictionary } from "@/lib/dictionary-context";

export default function Stats() {
  const dict = useDictionary();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 border-y border-apple-border-soft bg-apple-bg"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1 tabular-nums">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.2}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                ) : (
                  <span>0{stat.suffix ?? ""}</span>
                )}
              </div>
              <p className="text-sm text-apple-text-secondary">
                {dict.stats.items[stat.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
