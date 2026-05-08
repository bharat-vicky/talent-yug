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
          animation: scrollInfiniteC 25s linear infinite;
        }
        .cm-wrapper:hover .cm-track {
          animation-play-state: paused;
        }
        .cm-group {
          display: flex;
        }
        .cm-group span {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          color: #064E4D; /* Darker teal for better contrast */
          text-transform: uppercase;
          letter-spacing: 0.02em;
          white-space: nowrap;
          padding-right: 80px;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          background: "#5ED3C1",
          padding: "24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          overflow: "hidden",
          borderTop: "2px solid rgba(0,0,0,0.05)",
          borderBottom: "2px solid rgba(0,0,0,0.05)",
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
