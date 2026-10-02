import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "TextToolsAI — High-Velocity AI Text Engine SaaS";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030303",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 242, 254, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(121, 40, 202, 0.2) 0%, transparent 50%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#00f2fe",
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "24px",
            letterSpacing: "0.05em",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              backgroundColor: "#00f5a0",
            }}
          />
          5 CORE AI TEXT ENGINES • ZERO LATENCY
        </div>

        {/* Main Brand Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "64px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          texttools
          <span
            style={{
              color: "#a855f7",
              marginLeft: "2px",
            }}
          >
            ai
          </span>
          <span
            style={{
              fontSize: "36px",
              color: "#00f2fe",
              marginLeft: "12px",
              padding: "4px 12px",
              backgroundColor: "rgba(0, 242, 254, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(0, 242, 254, 0.3)",
            }}
          >
            .org
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#a3a3a3",
            maxWidth: "800px",
            textAlign: "center",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          The High-Velocity AI Text Engine for Creators & Engineers.
          Humanize, Rewrite, Summarize, and Optimize in Sub-200ms.
        </div>

        {/* 5 Tool Pills Grid */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {[
            { name: "AI Humanizer", color: "#00f5a0" },
            { name: "Tone Shifter", color: "#9d4edd" },
            { name: "Transcript Summarizer", color: "#00f2fe" },
            { name: "SEO Meta Generator", color: "#ffb703" },
            { name: "Grammar Doctor", color: "#ff0080" },
          ].map((tool, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "12px",
                backgroundColor: "rgba(15, 15, 15, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#f5f5f5",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor: tool.color,
                }}
              />
              {tool.name}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
