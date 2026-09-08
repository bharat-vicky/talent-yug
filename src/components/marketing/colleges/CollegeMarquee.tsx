"use client";

export default function CollegeMarquee() {
  const text = "Connect Talent & Create Future \u00A0 \u00A0 \u00A0 ";
  const repeated = text.repeat(6);

  return (
    <>
      <style>{`
        @keyframes scrollMarqueeColleges {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .clm-wrapper {
          width: 100%;
          background-color: #ffffff;
          padding: 60px 0 110px;
          overflow: hidden;
          display: flex;
          align-items: center;
          user-select: none;
          cursor: default;
        }
        .clm-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
          animation: scrollMarqueeColleges 28s linear infinite;
        }
        .clm-wrapper:hover .clm-track {
          animation-play-state: paused;
        }
        .clm-text {
          font-size: clamp(42px, 5.5vw, 76px);
          font-weight: 800;
          color: #053b50;
          letter-spacing: -0.03em;
          line-height: 1.15;
          display: inline-block;
        }
      `}</style>

      <div className="clm-wrapper" aria-hidden="true">
        <div className="clm-track">
          <span className="clm-text">{repeated}</span>
          <span className="clm-text">{repeated}</span>
        </div>
      </div>
    </>
  );
}
