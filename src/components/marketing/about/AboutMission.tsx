"use client";
import { useState } from "react";

const SLIDES = [
  {
    num: "1/4",
    title: "Mission",
    taglineLabel: "Concrete outcomes, not just promises",
    tagline: "Closing the gap between education and employment",
    body: "We strengthen placement systems in Tier-2 and Tier-3 colleges with one measurable goal: help 70 out of every 100 students secure meaningful placements or internships — while giving the remaining 30% a structured path to improve. We treat every student as a future-ready professional, not just a resume.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Target with arrows */}
        <circle cx="60" cy="60" r="55" fill="rgba(0,95,115,0.12)" />
        <circle cx="60" cy="60" r="36" stroke="rgba(0,95,115,0.35)" strokeWidth="4" fill="none"/>
        <circle cx="60" cy="60" r="18" stroke="rgba(0,95,115,0.5)" strokeWidth="4" fill="none"/>
        <circle cx="60" cy="60" r="8" fill="#005F73" />
        {/* Arrow pointing at target */}
        <line x1="95" y1="25" x2="68" y2="53" stroke="#005F73" strokeWidth="4" strokeLinecap="round"/>
        <polygon points="95,25 80,26 94,40" fill="#005F73"/>
        {/* Small bars (analytics) */}
        <rect x="20" y="80" width="8" height="20" rx="2" fill="rgba(0,95,115,0.4)"/>
        <rect x="32" y="70" width="8" height="30" rx="2" fill="rgba(0,95,115,0.55)"/>
        <rect x="44" y="58" width="8" height="42" rx="2" fill="rgba(0,95,115,0.7)"/>
      </svg>
    ),
  },
  {
    num: "2/4",
    title: "Vision",
    taglineLabel: "A future without boundaries",
    tagline: "A future where every college is connected to opportunity",
    body: "We envision a future where every college — regardless of its tier or location — is connected to the right companies, and every student has a clear, AI-guided pathway from classroom to career. Geography and brand name no longer determine destiny. Talent is the only currency that matters.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" fill="rgba(0,95,115,0.12)" />
        {/* Eye */}
        <ellipse cx="60" cy="55" rx="30" ry="18" stroke="#005F73" strokeWidth="4" fill="none"/>
        <circle cx="60" cy="55" r="9" fill="#005F73"/>
        <circle cx="64" cy="51" r="3" fill="rgba(255,255,255,0.5)"/>
        {/* Stars */}
        <circle cx="25" cy="30" r="3" fill="#005F73" opacity="0.5"/>
        <circle cx="95" cy="28" r="4" fill="#005F73" opacity="0.6"/>
        <circle cx="40" cy="20" r="2" fill="#005F73" opacity="0.4"/>
        {/* Arrow up right */}
        <path d="M75 85 L95 65" stroke="#005F73" strokeWidth="4" strokeLinecap="round"/>
        <polygon points="95,65 84,68 92,76" fill="#005F73"/>
      </svg>
    ),
  },
  {
    num: "3/4",
    title: "Impact",
    taglineLabel: "Real numbers that move the needle",
    tagline: "Every data point maps to a student's real-world opportunity",
    body: "Our success is measured in outcomes — higher placement percentages, reduced graduate unemployment, improved starting salaries. Every data point on our dashboard maps directly to a student's real-world opportunity. We don't celebrate traffic or sign-ups. We celebrate offer letters, career paths, and lives changed.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" fill="rgba(0,95,115,0.12)" />
        {/* Bar chart */}
        <rect x="18" y="72" width="14" height="30" rx="3" fill="rgba(0,95,115,0.35)"/>
        <rect x="36" y="56" width="14" height="46" rx="3" fill="rgba(0,95,115,0.5)"/>
        <rect x="54" y="40" width="14" height="62" rx="3" fill="rgba(0,95,115,0.65)"/>
        <rect x="72" y="24" width="14" height="78" rx="3" fill="#005F73"/>
        {/* Trend arrow */}
        <path d="M18 70 L37 52 L55 36 L75 20" stroke="#005F73" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        <circle cx="75" cy="20" r="5" fill="#005F73" opacity="0.7"/>
      </svg>
    ),
  },
  {
    num: "4/4",
    title: "What makes\nus different",
    taglineLabel: "One platform. End-to-end.",
    tagline: "Training, tracking, and placement in one ecosystem",
    body: "Unlike traditional placement cells or job portals, we integrate end-to-end training, AI-based role matching, and measurable placement support into one ecosystem. We don't post jobs — we build the pipeline that gets students from skill gap to signed offer.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" fill="rgba(0,95,115,0.12)" />
        {/* Two arrows forming cycle */}
        <path d="M30 50 Q30 25 60 25 Q90 25 90 50" stroke="#005F73" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <polygon points="88,50 96,42 96,58" fill="#005F73"/>
        <path d="M90 70 Q90 95 60 95 Q30 95 30 70" stroke="#005F73" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <polygon points="32,70 24,62 24,78" fill="#005F73"/>
        {/* Center spark */}
        <circle cx="60" cy="60" r="12" fill="#005F73" opacity="0.8"/>
        <path d="M60 50 L63 58 L72 60 L63 62 L60 70 L57 62 L48 60 L57 58 Z" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
];

export default function AboutMission() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const prev = () => setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1));

  return (
    <>
      <style>{`
        .abm-section {
          background: #f0f7fa;
          padding: 80px clamp(24px, 6vw, 100px);
          width: 100%;
        }
        /* Stack wrapper */
        .abm-stack-wrap {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          padding-bottom: 20px;
        }
        /* Shadow offset cards */
        .abm-shadow-card {
          position: absolute;
          border-radius: 24px;
          background: #29ABE2;
        }
        /* Main card */
        .abm-main-card {
          position: relative;
          z-index: 5;
          background: #29ABE2;
          border-radius: 24px;
          padding: clamp(32px, 5vw, 56px) clamp(28px, 5vw, 52px);
          box-shadow: 0 20px 60px rgba(41,171,226,0.35);
          animation: abmCardIn 0.4s ease;
        }
        @keyframes abmCardIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .abm-card-inner {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .abm-text { flex: 1; min-width: 0; }
        .abm-title {
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 800;
          color: #004050;
          margin: 0 0 20px;
          line-height: 1.1;
          white-space: pre-line;
        }
        .abm-body {
          font-size: clamp(14px, 1.4vw, 16px);
          color: #003545;
          line-height: 1.8;
          margin: 0 0 28px;
          max-width: 620px;
        }
        .abm-tagline-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .abm-tagline-label {
          font-size: 13px;
          color: rgba(0,53,69,0.65);
        }
        .abm-tagline {
          font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 700;
          color: #004050;
        }
        .abm-icon-num {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          flex-shrink: 0;
        }
        .abm-num {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 900;
          color: #004050;
          line-height: 1;
        }
        /* Nav */
        .abm-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1.5px solid rgba(0,64,80,0.15);
        }
        .abm-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(0,64,80,0.4);
          background: rgba(255,255,255,0.2);
          color: #004050;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .abm-nav-btn:hover {
          background: rgba(0,64,80,0.2);
          border-color: #004050;
          transform: scale(1.08);
        }
        .abm-dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          background: rgba(0,64,80,0.25);
        }
        .abm-dot.active {
          width: 28px;
          background: #004050;
        }

        @media (max-width: 768px) {
          .abm-card-inner { flex-direction: column-reverse; align-items: flex-start; gap: 24px; }
          .abm-icon-num { flex-direction: row; align-items: center; width: 100%; justify-content: space-between; }
        }
      `}</style>

      <section className="abm-section">
        <div className="abm-stack-wrap">
          {/* Shadow offset cards */}
          {[3, 2, 1].map((n) => (
            <div
              key={n}
              className="abm-shadow-card"
              style={{
                top: n * 8,
                left: n * 8,
                right: -n * 8,
                height: "calc(100% - 24px)",
                opacity: 0.22 - n * 0.05,
                zIndex: 4 - n,
              }}
            />
          ))}

          {/* Main card */}
          <div className="abm-main-card" key={current}>
            <div className="abm-card-inner">
              <div className="abm-text">
                <h2 className="abm-title">{slide.title}</h2>
                <p className="abm-body">{slide.body}</p>
                <div className="abm-tagline-wrap">
                  <span className="abm-tagline-label">{slide.taglineLabel}</span>
                  <span className="abm-tagline">{slide.tagline}</span>
                </div>
              </div>

              <div className="abm-icon-num">
                {slide.icon}
                <span className="abm-num">{slide.num}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="abm-nav">
              <button className="abm-nav-btn" onClick={prev} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`abm-dot${i === current ? " active" : ""}`}
                  />
                ))}
              </div>

              <button className="abm-nav-btn" onClick={next} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
