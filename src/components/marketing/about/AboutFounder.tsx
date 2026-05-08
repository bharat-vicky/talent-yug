"use client";
import { useState } from "react";
import Image from "next/image";

const FOUNDERS = [
  {
    name: "Hridayanand Gupta",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Leads product strategy with expertise in AI-powered matching, student-first placement systems, and data-driven outcomes.",
    achievement:
      "Designed and implemented the first AI-assisted placement workflow, helping improve placement readiness.",
    contributions: [
      "Built the core architecture of the placement platform",
      "Developed the student tracking and company matching modules",
      "Helped shape a scalable and outcome-focused placement system",
    ],
    focus: "Building transparent and effective pathways from campus to career.",
    domainStrength:
      "Strong understanding of Ed-Tech systems, campus recruitment workflows, and student outcome-focused product design.",
    attributionLine1: "— Chief Technology Officer",
    attributionLine2: "\u00A0TalentYug",
    photo: "/images/founder-portrait.png",
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
        /* ═══════════════════════════════
           Section wrapper
        ═══════════════════════════════ */
        .abf-section {
          width: 100%;
          background: linear-gradient(160deg, #6fd3f5 0%, #29ABE2 28%, #1796cc 58%, #0d7db0 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }

        /* ═══════════════════════════════
           Two-column grid
        ═══════════════════════════════ */
        .abf-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ════════════════════════════
           LEFT column — text
        ════════════════════════════ */
        .abf-left {
          padding: clamp(32px, 4.5vw, 58px) clamp(24px, 5vw, 68px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 3;
        }

        /* Small dark opening-quote icon (top-left) — exact Figma style */
        .abf-open-quote {
          display: block;
          width: 34px;
          height: 28px;
          margin-bottom: 18px;
        }

        /* Name */
        .abf-name {
          font-size: clamp(12.5px, 1.2vw, 14.5px);
          font-weight: 700;
          color: rgba(8, 35, 55, 0.95);
          margin: 0 0 1px;
          line-height: 1.4;
        }

        /* Role */
        .abf-role {
          font-size: clamp(11.5px, 1.1vw, 13.5px);
          font-weight: 700;
          color: rgba(8, 35, 55, 0.85);
          margin: 0 0 12px;
        }

        /* Bio */
        .abf-bio {
          font-size: clamp(11.5px, 1.05vw, 13px);
          color: rgba(8, 35, 55, 0.75);
          line-height: 1.72;
          margin: 0 0 4px;
          max-width: 400px;
        }

        /* Section heading */
        .abf-section-title {
          font-size: clamp(11px, 1vw, 13px);
          font-weight: 700;
          color: rgba(8, 35, 55, 0.95);
          margin: 14px 0 3px;
        }

        /* Plain paragraph */
        .abf-plain-text {
          font-size: clamp(11px, 1vw, 12.5px);
          color: rgba(8, 35, 55, 0.73);
          line-height: 1.72;
          margin: 0;
          max-width: 400px;
        }

        /* Bullet row */
        .abf-bullet {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: clamp(11px, 1vw, 12.5px);
          color: rgba(8, 35, 55, 0.73);
          line-height: 1.68;
          margin-bottom: 3px;
          max-width: 400px;
        }
        .abf-bullet::before {
          content: "•";
          flex-shrink: 0;
          color: rgba(8, 35, 55, 0.55);
          font-size: 13px;
          line-height: 1.68;
        }

        /* Attribution */
        .abf-attribution {
          margin-top: 18px;
        }
        .abf-attribution-line {
          font-size: clamp(11px, 1vw, 12.5px);
          color: rgba(8, 35, 55, 0.73);
          line-height: 1.65;
          margin: 0;
        }

        /* ════════════════════════════
           RIGHT column — photo + shapes
        ════════════════════════════ */
        .abf-right {
          position: relative;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          min-height: 480px;
        }

        /* ── Quotes Wrapper (holds both commas side-by-side in front of the founder) ── */
        .abf-quotes-wrapper {
          position: absolute;
          right: clamp(2px, 8vw, 5px);
          top: 69%;
          transform: translateY(-40%);
          display: flex;
          gap: clamp(12px, 2vw, 24px);
          z-index: 6; /* Placed in front of the founder (z-index: 5) */
          pointer-events: none;
        }

        .abf-quote-shape-1, .abf-quote-shape-2 {
          width: clamp(110px, 15vw, 170px);
          height: auto;
          display: block;
        }

        /* ── Founder photo ── transparent PNG, sits behind commas */
        .abf-photo-wrap {
          position: absolute;
          bottom: 0;
          /* Centre of right column, slightly left */
          left: -15%;
          right: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 5;
          height: 100%;
          pointer-events: none;
        }
        .abf-photo {
          display: block;
          height: clamp(400px, 105%, 620px);
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          /* Subtle shadow so figure reads against background */
          filter: drop-shadow(-6px 0 24px rgba(0, 50, 90, 0.18));
        }

        /* ── Name overlay — top-right corner of right column ── */
        .abf-name-overlay {
          position: absolute;
          top: clamp(20px, 3.5vw, 42px);
          right: clamp(14px, 2.5vw, 34px);
          z-index: 6;
          text-align: right;
          max-width: 52%;
        }
        .abf-overlay-name {
          font-size: clamp(20px, 2.8vw, 40px);
          font-weight: 800;
          color: rgba(8, 38, 60, 0.88);
          margin: 0 0 5px;
          line-height: 1.12;
          letter-spacing: -0.5px;
          word-break: break-word;
        }
        .abf-overlay-role {
          font-size: clamp(10px, 1vw, 12.5px);
          color: rgba(8, 38, 60, 0.65);
          margin: 0;
          font-weight: 500;
        }

        /* ── Navigation ── bottom-right of right column */
        .abf-nav {
          position: absolute;
          bottom: clamp(16px, 2.5vw, 30px);
          right: clamp(14px, 2.5vw, 32px);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }
        .abf-nav-btn {
          background: transparent;
          border: none;
          color: rgba(8, 38, 60, 0.70);
          cursor: pointer;
          padding: 4px;
          font-size: clamp(14px, 1.5vw, 18px);
          font-weight: 600;
          line-height: 1;
          transition: color 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .abf-nav-btn:hover { color: rgba(8, 38, 60, 1); }
        .abf-counter {
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 700;
          color: rgba(8, 38, 60, 0.85);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
        }
        .abf-counter-sep {
          font-size: 0.72em;
          font-weight: 500;
          color: rgba(8, 38, 60, 0.55);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .abf-inner { grid-template-columns: 1fr; }
          .abf-right { min-height: 360px; height: 360px; }
          .abf-left { padding: 32px 20px 20px; }
          .abf-name-overlay { top: 14px; right: 14px; }
          .abf-quote-shape-1 { left: 22%; }
        }
      `}</style>

      <section className="abf-section" id="about-team">
        <div className="abf-inner" key={current}>

          {/* ══ LEFT — text panel ══ */}
          <div className="abf-left">

            {/* Small dark opening double-quote — matches Figma top-left icon */}
            <svg className="abf-open-quote" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 28V17.6C0 12.267 1.2 8.133 3.6 5.2C6.053 2.267 9.6 0.533 14.24 0L15.52 3.44C12.907 4.08 10.88 5.28 9.44 7.04C8.053 8.8 7.307 11.04 7.2 13.76H14.24V28H0ZM18.48 28V17.6C18.48 12.267 19.68 8.133 22.08 5.2C24.533 2.267 28.08 0.533 32.72 0L34 3.44C31.387 4.08 29.36 5.28 27.92 7.04C26.533 8.8 25.787 11.04 25.68 13.76H32.72V28H18.48Z" fill="rgba(15,50,80,0.72)" />
            </svg>

            <p className="abf-name">{f.name}</p>
            <p className="abf-role">{f.role}</p>
            <p className="abf-bio">{f.bio}</p>

            <p className="abf-section-title">Key Achievement</p>
            <p className="abf-plain-text">{f.achievement}</p>

            <p className="abf-section-title">Core Contributions</p>
            {f.contributions.map((c, i) => (
              <div className="abf-bullet" key={i}>{c}</div>
            ))}

            <p className="abf-section-title">Focus</p>
            <p className="abf-plain-text">{f.focus}</p>

            <p className="abf-section-title">Domain Strength</p>
            <p className="abf-plain-text">{f.domainStrength}</p>

            <div className="abf-attribution">
              <p className="abf-attribution-line">{f.attributionLine1}</p>
              <p className="abf-attribution-line">{f.attributionLine2}</p>
            </div>
          </div>

          {/* ══ RIGHT — photo + decorations ══ */}
          <div className="abf-right">

            {/* Name + role — top right */}
            <div className="abf-name-overlay">
              <p className="abf-overlay-name">{f.name}</p>
              <p className="abf-overlay-role">— {f.role}</p>
            </div>

            {/* Decorative frosted-glass commas — in front of person */}
            <div className="abf-quotes-wrapper">
              <img src="/images/Vector.png" alt="" className="abf-quote-shape-1" />
              <img src="/images/Vector (1).png" alt="" className="abf-quote-shape-2" />
            </div>

            {/* Transparent founder photo — front layer */}
            <div className="abf-photo-wrap">
              <Image
                src={f.photo}
                alt={f.name}
                width={480}
                height={560}
                className="abf-photo"
                style={{ height: "100%", width: "auto" }}
                priority
              />
            </div>

            {/* Navigation */}
            <div className="abf-nav">
              <button className="abf-nav-btn" onClick={prev} aria-label="Previous founder">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="abf-counter">
                {String(current + 1).padStart(2, "0")}
                <span className="abf-counter-sep">/{String(FOUNDERS.length).padStart(2, "0")}</span>
              </span>
              <button className="abf-nav-btn" onClick={next} aria-label="Next founder">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
