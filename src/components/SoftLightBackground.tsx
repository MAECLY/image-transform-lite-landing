"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function SoftLightBackground() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser feature detection requires effect-time state set.
    setIsMobile(mobile);
    if (mobile) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 30,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.18 },
          },
        },
      },
      particles: {
        color: { value: ["#007aff", "#5e5ce6", "#34c759"] },
        links: {
          color: "#007aff",
          distance: 160,
          enable: true,
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.55,
          direction: "none",
          outModes: { default: "bounce" },
        },
        number: {
          value: 45,
          density: { enable: true },
        },
        opacity: {
          value: { min: 0.15, max: 0.4 },
        },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/5 via-transparent to-apple-indigo/5" />
    );
  }

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0"
      options={options}
    />
  );
}
