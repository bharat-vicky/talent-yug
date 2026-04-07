"use client";

import { useState } from "react";

const slides = [
  {
    label: "Mission",
    tagline: "Closing the gap between education and employment",
    body: "We strengthen placement systems in Tier 2 and Tier 3 colleges with one measurable goal: help 70 out of every 100 students secure meaningful placements or internships — while giving the remaining 30% a structured plan to improve. We treat every student as a future-ready professional, not just a resume.",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <circle cx="36" cy="36" r="22" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
        <circle cx="36" cy="36" r="10" fill="rgba(255,255,255,0.5)" />
        <line x1="36" y1="2" x2="36" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
        <line x1="36" y1="54" x2="36" y2="70" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
        <line x1="2" y1="36" x2="18" y2="36" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
        <line x1="54" y1="36" x2="70" y2="36" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Vision",
    tagline: "A future where every college is connected to opportunity",
    body: "We envision a future where every college — regardless of its tier or location — is connected to the right companies, and every student has a clear, AI-guided pathway from classroom to career. A world where geography and brand name no longer determine destiny, and where talent is truly the only currency that matters.",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <path d="M20 48 L36 20 L52 48" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M26 40 L46 40" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="36" cy="20" r="5" fill="rgba(255,255,255,0.5)" />
        <path d="M28 54 Q36 46 44 54" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Impact",
    tagline: "Real numbers that move the needle",
    body: "Our success is measured in outcomes — higher placement percentages, reduced graduate unemployment, improved starting salaries. Every data point on our dashboard maps directly to a student's real-world opportunity. We don't celebrate traffic or sign-ups. We celebrate offer letters, career paths, and lives changed.",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <rect x="16" y="42" width="8" height="16" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="28" y="32" width="8" height="26" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="40" y="22" width="8" height="36" rx="2" fill="rgba(255,255,255,0.7)" />
        <path d="M16 36 L28 28 L40 18 L54 14" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="54" cy="14" r="4" fill="rgba(255,255,255,0.9)" />
      </svg>
    ),
  },
  {
    label: "What makes us different",
    tagline: "One platform. Training, tracking, and placement.",
    body: "Unlike traditional placement cells or job portals, we integrate end-to-end training, AI-based role matching, and measurable outcomes into one platform. We don't merely track metrics — we build the pipeline that gets students from skill gap to signed offer. Every feature exists to serve one purpose: a student walking out with an opportunity.",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <rect x="20" y="20" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
        <rect x="38" y="20" width="14" height="14" rx="3" fill="rgba(255,255,255,0.55)" />
        <rect x="20" y="38" width="14" height="14" rx="3" fill="rgba(255,255,255,0.55)" />
        <rect x="38" y="38" width="14" height="14" rx="3" fill="rgba(255,255,255,0.7)" />
        <line x1="36" y1="20" x2="36" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1="20" y1="36" x2="52" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function AboutMission() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];
  const padNum = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <style>{`
        .ab-mission-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .ab-mission-nav-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.8);
          transform: scale(1.08);
        }
        .ab-mission-slide-enter {
          animation: abSlideIn 0.4s ease;
        }
        @keyframes abSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .ab-mission-inner { flex-direction: column !important; align-items: center !important; }
          .ab-mission-icon-wrap { margin-bottom: 28px !important; }
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #1e40af 100%)",
          padding: "80px clamp(20px,8vw,100px)",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blur orbs */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 400,
            height: 400,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -40,
            width: 350,
            height: 350,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Counter label */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 12,
            }}
          >
            {padNum(current)} / {padNum(slides.length - 1)}
          </span>
          Our Values
        </div>

        {/* Slide content */}
        <div
          className="ab-mission-inner"
          style={{ display: "flex", gap: 60, alignItems: "flex-start" }}
        >
          {/* Icon */}
          <div
            className="ab-mission-icon-wrap"
            style={{ flexShrink: 0, paddingTop: 8 }}
          >
            <div className="ab-mission-slide-enter" key={current + "-icon"}>
              {slide.icon}
            </div>
          </div>

          {/* Text */}
          <div className="ab-mission-slide-enter" key={current + "-text"} style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: "0 0 24px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {slide.label}
            </h2>

            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.8,
                marginBottom: 32,
                maxWidth: 680,
              }}
            >
              {slide.body}
            </p>

            {/* Tagline */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 30,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {slide.tagline}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 56,
          }}
        >
          <button className="ab-mission-nav-btn" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? "#ffffff" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button className="ab-mission-nav-btn" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <span
            style={{
              marginLeft: 8,
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {padNum(current)} / {padNum(slides.length - 1)}
          </span>
        </div>
      </section>
    </>
  );
}
