"use client";

export default function CompanyMarquee() {
  const text = "Connect Talent & Create Future · ";
  const repeated = text.repeat(8);

  return (
    <>
      <style>{`
        @keyframes scrollInfiniteCompany {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .co-marquee-track {
          display: flex;
          width: max-content;
          animation: scrollInfiniteCompany 12s linear infinite;
        }
        .co-marquee-wrapper:hover .co-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 56,
          height: "15vh",
          maxHeight: 90,
          background: "#5ED3C1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="co-marquee-wrapper" style={{ maxWidth: "100%", overflow: "hidden" }}>
          <div className="co-marquee-track">
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#006F5F",
                whiteSpace: "nowrap",
              }}
            >
              {repeated}
            </span>
            <span
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontWeight: 800,
                color: "#006F5F",
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
