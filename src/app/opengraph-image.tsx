import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Image Transform Lite — Batch image processing for macOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f5f5f7 50%, #ffffff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 700,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,122,255,0.18) 0%, transparent 70%)",
            top: 50,
            right: -150,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 500,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(94,92,230,0.15) 0%, transparent 70%)",
            bottom: -100,
            left: -100,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#007aff",
              letterSpacing: "-0.02em",
            }}
          >
            Image Transform Lite
          </div>

          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: "#1d1d1f",
              textAlign: "center",
              lineHeight: 1.1,
              maxWidth: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Batch image processing for macOS
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#6e6e73",
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            8 transformations, live preview, reusable presets. Free and open source.
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 8,
            }}
          >
            {["Apple Silicon", "AGPL-3.0", "Open Source"].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: "1px solid rgba(0,122,255,0.3)",
                  color: "#007aff",
                  fontSize: 14,
                  fontWeight: 500,
                  background: "rgba(0,122,255,0.05)",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
