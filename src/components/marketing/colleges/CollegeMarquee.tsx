"use client";

export default function CollegeMarquee() {
  const text = "Connect Talent & Create Future · ";
  const repeated = text.repeat(8);

  return (
    <>
      <style>{`
        @keyframes scrollInfiniteCollege {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .c-marquee-track {
          display: flex;
          width: max-content;
          animation: scrollInfiniteCollege 12s linear infinite;
        }
        .c-marquee-wrapper:hover .c-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 60,
          height: "15vh",
          maxHeight: 90,
          background: "#FF9700",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="c-marquee-wrapper" style={{ maxWidth: "100%", overflow: "hidden" }}>
          <div className="c-marquee-track">
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#984A00",
                whiteSpace: "nowrap",
              }}
            >
              {repeated}
            </span>
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#984A00",
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
