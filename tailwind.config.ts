import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: "#f5f5f7",
          surface: "#ffffff",
          border: "#d2d2d7",
          "border-soft": "#e0e0e0",
          text: "#1d1d1f",
          "text-secondary": "#6e6e73",
          "text-tertiary": "#86868b",
          blue: "#007aff",
          "blue-dark": "#005ecb",
          indigo: "#5e5ce6",
          green: "#34c759",
          red: "#ff3b30",
          yellow: "#ffcc00",
          orange: "#ff9500",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"Segoe UI"',
          "Roboto",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
        display: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "apple-sm": "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        apple:
          "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
        "apple-md":
          "0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        "apple-lg":
          "0 10px 32px rgba(0,0,0,0.10), 0 24px 48px rgba(0,0,0,0.08)",
        "apple-glow": "0 4px 24px rgba(0,122,255,0.15)",
      },
      borderRadius: {
        "apple-sm": "6px",
        apple: "10px",
        "apple-lg": "14px",
        "apple-xl": "20px",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out both",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "showcase-toggle": "showcaseToggle 5s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        showcaseToggle: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
