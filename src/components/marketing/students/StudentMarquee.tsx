"use client";

export default function StudentMarquee() {
  const text = "Connect Talent & Create Future";

  return (
    <>
      <style>{`
        @keyframes scrollInfiniteS {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sm-track {
          display: flex;
          width: max-content;
          animation: scrollInfiniteS 30s linear infinite;
        }
        .sm-wrapper:hover .sm-track {
          animation-play-state: paused;
        }
        .sm-group {
          display: flex;
          align-items: center;
        }
        .sm-group span {
          font-size: clamp(34px, 4.5vw, 58px);
          font-weight: 800;
          color: #083a50;
          white-space: nowrap;
          padding-right: 64px;
          letter-spacing: -0.015em;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          background: "#ffffff",
          padding: "24px 0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <div className="sm-wrapper" style={{ width: "100%", overflow: "hidden" }}>
          <div className="sm-track">
            <div className="sm-group">
              <span>{text}</span>
              <span>{text}</span>
              <span>{text}</span>
            </div>
            <div className="sm-group">
              <span>{text}</span>
              <span>{text}</span>
              <span>{text}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
