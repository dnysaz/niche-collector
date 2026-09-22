import {ImageResponse} from "next/og";

export const runtime = "edge";
export const alt = "Niche Collector — Collection Tracker + Price Intelligence";
export const size = { width: 1200, height: 630 };
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
          background: "#09090b",
          color: "white",
          padding: "56px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, letterSpacing: 4, opacity: 0.6 }}>
          <span>SANITY CHALLENGE — PATH 2</span>
          <span>71M89SY5 / PRODUCTION</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "white",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              NC
            </div>
            <div style={{ fontSize: 20, opacity: 0.7 }}>Niche Collector</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Collection Tracker
            <br />
            <span style={{ color: "#f59e0b" }}>+ Price Intelligence</span>
          </div>
          <div style={{ fontSize: 20, opacity: 0.75, maxWidth: 800 }}>
            Track Hot Wheels, Gunpla & Keyboards — auto valuation via GROQ, outlier filtering & wishlist alerts.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 14, opacity: 0.6 }}>
          <span>🏎️ Hot Wheels</span>
          <span>🤖 Gunpla</span>
          <span>⌨️ Keyboards</span>
          <span>•</span>
          <span>Sanity GROQ • Next.js</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
