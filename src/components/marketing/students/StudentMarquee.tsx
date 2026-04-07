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
          animation: scrollInfiniteS 6s linear infinite;
        }
        .sm-wrapper:hover .sm-track {
          animation-play-state: paused;
        }
        .sm-group {
          display: flex;
        }
        .sm-group span {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: #7E0101;
          white-space: nowrap;
          padding-right: 80px;
        }
      `}</style>

      <section
        style={{
          position: "sticky",
          top: 60,
          height: "15vh",
          maxHeight: 90,
          maxWidth: "100%",
          background: "#EE6983",
          display: "flex",
          alignItems: "flex-start",
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
