"use client";

import { useState } from "react";

const founders = [
  {
    name: "Founder Name",
    role: "Co-Founder & Product Lead",
    photo: "/about/founder.webp",
    achievements: [
      "Led the IIT Patna placement pilot that validated the TalentYug model",
      "Secured institutional endorsement from the Director, IIT Patna",
      "Designed the AI-powered skill-mapping architecture",
      "Built the end-to-end student readiness tracking system",
    ],
    contributions: [
      "Product strategy and roadmap for the TalentYug platform",
      "College partnerships and institutional onboarding framework",
      "Driving the 70% placement success metric across partner colleges",
    ],
    focus:
      "Scaling TalentYug's AI-powered placement infrastructure to 5,000+ Tier 2 and Tier 3 colleges across India.",
    humanStrength:
      "Deeply empathetic builder who listens to students and translates their unmet needs into scalable systems.",
    attribution: "Training & Placement Officer, ABC Institute of Technology",
  },
];

export default function AboutFounder() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? founders.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === founders.length - 1 ? 0 : c + 1));

  const f = founders[current];
  const padNum = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <style>{`
        .ab-founder-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #dbeafe;
          background: #f0f7ff;
          color: #1d4ed8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .ab-founder-nav-btn:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: #fff;
          transform: scale(1.08);
        }
        .ab-founder-slide {
          animation: abFounderIn 0.4s ease;
        }
        @keyframes abFounderIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }
        .ab-bullet-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #1d4ed8;
          flex-shrink: 0;
          margin-top: 7px;
        }
        @media (max-width: 768px) {
          .ab-founder-card { flex-direction: column !important; }
          .ab-founder-photo-wrap { width: 100% !important; min-height: 240px !important; }
        }
      `}</style>

      <section
        style={{
          background: "#ffffff",
          padding: "80px clamp(20px,8vw,100px)",
          width: "100%",
        }}
      >
        {/* Section heading */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#dbeafe",
              border: "1.5px solid #93c5fd",
              borderRadius: 8,
              padding: "6px 16px",
              marginBottom: 16,
              fontSize: 13,
              fontWeight: 600,
              color: "#1e40af",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Meet the Team
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            The people building{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1e40af,#2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TalentYug
            </span>
          </h2>
        </div>

        {/* Founder card */}
        <div
          className="ab-founder-slide ab-founder-card"
          key={current}
          style={{
            display: "flex",
            background: "#f8faff",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #dbeafe",
            boxShadow: "0 4px 32px rgba(29,78,216,0.07)",
          }}
        >
          {/* Left — photo */}
          <div
            className="ab-founder-photo-wrap"
            style={{
              width: 320,
              minWidth: 260,
              background: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              minHeight: 420,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative rings */}
            <div
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                border: "40px solid rgba(255,255,255,0.06)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "30px solid rgba(255,255,255,0.08)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />

            {/* Person silhouette SVG */}
            <svg
              width="120"
              height="160"
              viewBox="0 0 120 160"
              fill="none"
              style={{ position: "relative", zIndex: 1 }}
            >
              <circle cx="60" cy="45" r="36" fill="rgba(255,255,255,0.2)" />
              <path
                d="M10 160 C10 120 20 100 60 100 C100 100 110 120 110 160"
                fill="rgba(255,255,255,0.2)"
              />
              <circle cx="60" cy="45" r="28" fill="rgba(255,255,255,0.35)" />
              <path
                d="M20 155 C20 122 32 108 60 108 C88 108 100 122 100 155"
                fill="rgba(255,255,255,0.35)"
              />
            </svg>
          </div>

          {/* Right — info */}
          <div style={{ flex: 1, padding: "40px 36px", minWidth: 0 }}>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "#0f172a",
                margin: "0 0 6px",
              }}
            >
              {f.name}
            </h3>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1d4ed8",
                margin: "0 0 28px",
                letterSpacing: "0.02em",
              }}
            >
              {f.role}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              {/* Key Achievements */}
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e40af",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Key Achievements
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {f.achievements.map((a, i) => (
                    <div className="ab-bullet-item" key={i}>
                      <div className="ab-bullet-dot" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Contributions */}
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e40af",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Core Contributions
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {f.contributions.map((c, i) => (
                    <div className="ab-bullet-item" key={i}>
                      <div className="ab-bullet-dot" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus */}
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e40af",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Focus
                </h4>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {f.focus}
                </p>
              </div>

              {/* Human Strength */}
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e40af",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Human Strength
                </h4>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {f.humanStrength}
                </p>
              </div>
            </div>

            {/* Attribution */}
            <div
              style={{
                marginTop: 28,
                padding: "12px 16px",
                background: "#dbeafe",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: "#1e40af",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {f.attribution}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 28,
              }}
            >
              <button className="ab-founder-nav-btn" onClick={prev} aria-label="Previous founder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: 48,
                  textAlign: "center",
                }}
              >
                {padNum(current)} / {padNum(founders.length - 1)}
              </span>

              <button className="ab-founder-nav-btn" onClick={next} aria-label="Next founder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
