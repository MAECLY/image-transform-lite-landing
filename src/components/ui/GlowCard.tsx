"use client";

import { useCallback, useRef } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({
  children,
  className = "",
}: GlowCardProps) {
  const rafRef = useRef(0);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const clientX = e.clientX;
      const clientY = e.clientY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--glow-x", `${clientX - rect.left}px`);
        target.style.setProperty("--glow-y", `${clientY - rect.top}px`);
      });
    },
    []
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative group p-6 rounded-apple-lg bg-white border border-apple-border-soft shadow-apple hover:border-apple-blue/40 hover:shadow-[0_4px_24px_rgba(0,122,255,0.12)] transition-all duration-300 h-full overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,122,255,0.08), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
