"use client";

export default function CompanyMarquee() {
  const text = "Connect Talent & Create Future";

  return (
    <>
      <style>{`
        @keyframes scrollInfiniteC {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cm-track {
          display: flex;
          width: max-content;
          animation: scrollInfiniteC 6s linear infinite;
        }
        .cm-wrapper:hover .cm-track {
          animation-play-state: paused;
        }
        .cm-group {
          display: flex;
        }
        .cm-group span {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: #006F5F;
          white-space: nowrap;
          padding-right: 80px;
        }
      `}</style>

      <section
        style={{
          position: "sticky",
          top: "11.5vh",
          height: "15vh",
          maxWidth: "100%",
          background: "#5ED3C1",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div className="cm-wrapper" style={{ maxWidth: "100%", overflow: "hidden" }}>
          <div className="cm-track">
            <div className="cm-group">
              <span>{text}</span>
              <span>{text}</span>
              <span>{text}</span>
            </div>
            <div className="cm-group">
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
