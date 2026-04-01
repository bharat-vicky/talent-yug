"use client";

// Sticky marquee banner — matches original scrollInfinite animation
export default function StudentMarquee() {
  const text = "FOR STUDENTS · PLACEMENT DRIVES · QR PASS · REGISTER NOW · ";
  const repeated = text.repeat(4);

  return (
    <>
      <style>{`
        @keyframes scrollInfinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollInfinite 10s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 56,               /* below fixed nav */
          height: "15vh",
          maxHeight: 90,
          background: "#EE6983",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="marquee-wrapper" style={{ maxWidth: "100%", overflow: "hidden" }}>
          <div className="marquee-track">
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#7E0101",
                whiteSpace: "nowrap",
                paddingRight: 0,
              }}
            >
              {repeated}
            </span>
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#7E0101",
                whiteSpace: "nowrap",
              }}
            >
              {repeated}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
