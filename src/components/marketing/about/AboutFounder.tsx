"use client";
import { useState } from "react";

const FOUNDERS = [
  {
    name: "Hridayanand Gupta",
    role: "Co-Founder & Product Lead",
    bio: "Leads product strategy with expertise in AI-powered matching, student-first placement systems, and data-driven outcomes.",
    achievement: "Designed and implemented the first AI-assisted placement workflow at IIT Patna, helping improve placement readiness.",
    contributions: [
      "Built the core architecture of the placement platform",
      "Developed the student tracking and company matching modules",
      "Helped shape a scalable and outcome-focused placement system",
    ],
    focus: "Building transparent and effective pathways from campus to career.",
    domainStrength: "Strong understanding of Ed-Tech systems, campus recruitment workflows, and student outcome-focused product design.",
    attribution: "Training & Placement Officer\nABC Institute of Technology",
    photo: "/home-img/landing/l1.webp",
  },
];

export default function AboutFounder() {
  const [current, setCurrent] = useState(0);
  const f = FOUNDERS[current];
  const prev = () => setCurrent((c) => (c === 0 ? FOUNDERS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === FOUNDERS.length - 1 ? 0 : c + 1));

  return (
    <>
      <style>{`
        .abf-section {
          width: 100%;
          background: linear-gradient(135deg, #29ABE2 0%, #1e8fbf 50%, #006B8F 100%);
          position: relative;
          overflow: hidden;
          padding: clamp(48px, 6vw, 80px) 0;
        }
        .abf-inner {
          display: flex;
          align-items: stretch;
          min-height: 520px;
          max-width: 100%;
        }
        /* Left panel — text */
        .abf-left {
          flex: 1;
          padding: clamp(32px, 5vw, 64px) clamp(24px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          position: relative;
          z-index: 2;
        }
        .abf-quote-icon {
          font-size: 80px;
          line-height: 0.8;
          color: rgba(255,255,255,0.2);
          font-family: Georgia, serif;
          margin-bottom: 24px;
          display: block;
        }
        .abf-name {
          font-size: clamp(16px, 1.5vw, 19px);
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          margin: 0 0 2px;
        }
        .abf-role {
          font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          margin: 0 0 20px;
          letter-spacing: 0.03em;
        }
        .abf-bio {
          font-size: clamp(13px, 1.2vw, 15px);
          color: rgba(255,255,255,0.85);
          line-height: 1.75;
          margin: 0 0 20px;
          max-width: 480px;
        }
        .abf-section-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 16px 0 8px;
        }
        .abf-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
          margin-bottom: 6px;
        }
        .abf-bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          flex-shrink: 0;
          margin-top: 6px;
        }
        .abf-plain-text {
          font-size: 13px;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          margin: 0;
        }
        .abf-attribution {
          margin-top: 24px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.12);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          white-space: pre-line;
          display: inline-block;
          align-self: flex-start;
          line-height: 1.6;
        }
        /* Right panel — photo */
        .abf-right {
          flex-shrink: 0;
          width: clamp(280px, 40%, 580px);
          position: relative;
          overflow: hidden;
        }
        .abf-photo {
          position: absolute;
          inset: 0;
          object-fit: cover;
          object-position: top center;
        }
        /* Decorative */
        .abf-deco-shape {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 260px;
          height: 260px;
          border-radius: 40px;
          background: rgba(255,255,255,0.07);
          transform: rotate(15deg);
          z-index: 1;
        }
        .abf-deco-shape-2 {
          position: absolute;
          top: -20px;
          left: -20px;
          width: 180px;
          height: 180px;
          border-radius: 30px;
          background: rgba(255,255,255,0.05);
          transform: rotate(-10deg);
          z-index: 1;
        }
        /* Name overlay on photo right side */
        .abf-name-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background: linear-gradient(to top, rgba(0,40,60,0.85) 0%, transparent 100%);
          padding: 40px 28px 32px;
          z-index: 3;
        }
        .abf-overlay-name {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 4px;
        }
        .abf-overlay-role {
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }
        /* Navigation */
        .abf-nav {
          position: absolute;
          bottom: 28px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
        }
        .abf-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .abf-nav-btn:hover {
          background: rgba(255,255,255,0.3);
          border-color: #fff;
        }
        .abf-counter {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 900px) {
          .abf-inner { flex-direction: column; }
          .abf-right { width: 100%; height: 300px; }
          .abf-left { padding: 40px 24px; }
        }
      `}</style>

      <section className="abf-section" id="about-team">
        <div className="abf-deco-shape" />
        <div className="abf-deco-shape-2" />

        <div className="abf-inner" key={current}>
          {/* Left — text info */}
          <div className="abf-left">
            <span className="abf-quote-icon">&ldquo;</span>

            <p className="abf-name">{f.name}</p>
            <p className="abf-role">{f.role}</p>
            <p className="abf-bio">{f.bio}</p>

            <p className="abf-section-title">Key Achievement</p>
            <p className="abf-plain-text">{f.achievement}</p>

            <p className="abf-section-title">Core Contributions</p>
            {f.contributions.map((c, i) => (
              <div className="abf-bullet" key={i}>
                <div className="abf-bullet-dot" />
                <span>{c}</span>
              </div>
            ))}

            <p className="abf-section-title">Focus</p>
            <p className="abf-plain-text">{f.focus}</p>

            <p className="abf-section-title">Domain Strength</p>
            <p className="abf-plain-text">{f.domainStrength}</p>

            <div className="abf-attribution">— {f.attribution}</div>
          </div>

          {/* Right — photo */}
          <div className="abf-right">
            {/* Using a real image from existing assets */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #1e8fbf 0%, #29ABE2 40%, #006B8F 100%)" }} />
            {/* Person silhouette placeholder — will show real photo when uploaded */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              zIndex: 2,
            }}>
              <svg viewBox="0 0 300 400" width="100%" height="85%" style={{ display: "block" }}>
                <ellipse cx="150" cy="120" rx="70" ry="75" fill="rgba(255,255,255,0.18)"/>
                <path d="M30 400 C30 280 70 220 150 220 C230 220 270 280 270 400" fill="rgba(255,255,255,0.18)"/>
                <ellipse cx="150" cy="120" rx="54" ry="58" fill="rgba(255,255,255,0.28)"/>
                <path d="M60 390 C60 290 90 235 150 235 C210 235 240 290 240 390" fill="rgba(255,255,255,0.28)"/>
              </svg>
            </div>

            <div className="abf-name-overlay">
              <p className="abf-overlay-name">{f.name}</p>
              <p className="abf-overlay-role">— {f.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="abf-nav">
          <button className="abf-nav-btn" onClick={prev} aria-label="Previous founder">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="abf-counter">
            {String(current + 1).padStart(2, "0")}/{String(FOUNDERS.length).padStart(2, "0")}
          </span>
          <button className="abf-nav-btn" onClick={next} aria-label="Next founder">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
