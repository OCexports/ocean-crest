import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ocean Crest Exports — Premium Indian commodities, globally delivered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 38%, #1B3A5C 0%, #0A1E2D 55%, #081520 100%)",
          color: "#FAF7F2",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* gold ring accent */}
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.25)",
            top: 55,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: 24,
          }}
        >
          Verified Indian Exporter
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Ocean Crest Exports
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "rgba(250,247,242,0.85)",
            textAlign: "center",
          }}
        >
          Premium Indian Commodities, Globally Delivered
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.8)",
          }}
        >
          Dehydrated Garlic · Spices · Grains · Seeds
        </div>
      </div>
    ),
    { ...size },
  );
}
