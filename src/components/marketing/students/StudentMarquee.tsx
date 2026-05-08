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
          animation: scrollInfiniteS 25s linear infinite;
        }
        .sm-wrapper:hover .sm-track {
          animation-play-state: paused;
        }
        .sm-group {
          display: flex;
        }
        .sm-group span {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #4A0413;
          white-space: nowrap;
          padding-right: 60px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>

      <section
        style={{
          position: "sticky",
          top: 60,
          height: 80,
          maxWidth: "100%",
          background: "#EE6983",
          borderTop: "1px solid #C4435F",
          borderBottom: "1px solid #C4435F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="sm-wrapper" style={{ maxWidth: "100%", overflow: "hidden" }}>
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
