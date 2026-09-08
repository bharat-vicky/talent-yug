"use client";

export default function CompanyMarquee() {
  const text = "Connect Talent & Create Future \u00A0 \u00A0 \u00A0 ";
  const repeated = text.repeat(6);

  return (
    <>
      <style>{`
        @keyframes scrollMarqueeCompanies {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .cm-wrapper {
          width: 100%;
          background-color: #ffffff;
          padding: 30px 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          user-select: none;
          cursor: default;
        }
        .cm-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
          animation: scrollMarqueeCompanies 28s linear infinite;
        }
        .cm-wrapper:hover .cm-track {
          animation-play-state: paused;
        }
        .cm-text {
          font-size: clamp(42px, 5.5vw, 76px);
          font-weight: 800;
          color: #053b50;
          letter-spacing: -0.03em;
          line-height: 1.15;
          display: inline-block;
        }
      `}</style>

      <div className="cm-wrapper" aria-hidden="true">
        <div className="cm-track">
          <span className="cm-text">{repeated}</span>
          <span className="cm-text">{repeated}</span>
        </div>
      </div>
    </>
  );
}
