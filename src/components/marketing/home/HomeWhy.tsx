"use client";

const PROBLEM_BOXES = [
  {
    key: "colleges",
    label: "Colleges",
    accentColor: "#4f46e5",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
    bullets: [
      "Manual Placement Processes (Excel/WhatsApp)",
      "Lack of Analytics and Optimization",
      "Weak Network Infrastructure",
      "50-60% placement success rate",
      "Unstructured student preparation",
    ],
  },
  {
    key: "companies",
    label: "Companies",
    accentColor: "#0ea5e9",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    bullets: [
      "Limited and inconsistent college pipeline",
      "No standardized hiring pipeline",
      "High recruitment and sourcing costs",
      "Inefficient candidate screening leading to high churn",
    ],
  },
  {
    key: "students",
    label: "Students",
    accentColor: "#f59e0b",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    bullets: [
      "40% unemployed post-graduation",
      "Lack of structured preparation",
      "Unaided resources",
      "Weak Interview preparation",
    ],
  },
];

const CIRCLE_STEPS = [
  { n: "01", label: "Company uploads\nrequirements" },
  { n: "02", label: "AI Matches\nto Students" },
  { n: "03", label: "AI Matches Students\nto Roles" },
  { n: "04", label: "Students\nApply" },
  { n: "05", label: "Interview\nmanagement" },
  { n: "06", label: "Offer &\nAcceptance" },
  { n: "07", label: "Analytics &\nReporting" },
];

export default function HomeWhy() {
  // Place 7 steps evenly around a circle. Start from top (-90 deg) so step 01 is at top.
  const RADIUS = 210; // px, distance from center to step node
  const steps = CIRCLE_STEPS.map((s, i) => {
    const angleDeg = (360 / CIRCLE_STEPS.length) * i - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const cx = Math.cos(angleRad) * RADIUS;
    const cy = Math.sin(angleRad) * RADIUS;
    return { ...s, cx, cy, angleDeg };
  });

  return (
    <section style={{ background: "#ffffff", overflow: "hidden" }}>
      <style>{`
        /* Problem section */
        .hw-problem-grid {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hw-problem-box {
          flex: 1;
          min-width: 260px;
          max-width: 360px;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hw-problem-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }
        /* Infra section */
        .hw-infra-section {
          background: #f0f7ff;
        }
        /* Circular diagram */
        .hw-circle-wrap {
          position: relative;
          width: 520px;
          height: 520px;
          flex-shrink: 0;
        }
        .hw-step-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100px;
          transform: translate(-50%, -50%);
        }
        .hw-step-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #4f46e5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 6px;
          flex-shrink: 0;
        }
        .hw-step-label {
          font-size: 11px;
          color: #374151;
          line-height: 1.4;
          white-space: pre-line;
        }
        /* Responsive */
        @media (max-width: 640px) {
          .hw-problem-box { max-width: 100%; }
          .hw-circle-wrap { width: 340px; height: 340px; }
          .hw-infra-inner { flex-direction: column !important; align-items: center !important; }
        }
        @media (max-width: 900px) {
          .hw-infra-inner { flex-direction: column !important; align-items: center !important; }
        }
      `}</style>

      {/* ── PART 1: Why Placements Fail ── */}
      <div
        style={{
          padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(22px,3vw,36px)",
              fontWeight: 800,
              color: "#1e3a8a",
              marginBottom: 10,
            }}
          >
            Why Placements Fail in Tier 2/3 Colleges
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "#6b7280" }}>
            A Broken System Hurting All Three Stakeholders
          </p>
        </div>

        {/* 3 problem boxes */}
        <div className="hw-problem-grid">
          {PROBLEM_BOXES.map((box) => (
            <div key={box.key} className="hw-problem-box">
              {/* Icon + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: `${box.accentColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {box.icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1e3a8a",
                    margin: 0,
                  }}
                >
                  {box.label}
                </h3>
              </div>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {box.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: box.accentColor,
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── PART 2: TalentYug – The Missing Infrastructure Layer ── */}
      <div className="hw-infra-section">
        <div
          style={{
            padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontSize: "clamp(22px,3vw,36px)",
                fontWeight: 800,
                color: "#1e3a8a",
                marginBottom: 10,
              }}
            >
              TalentYug – The Missing Infrastructure Layer
            </h2>
            <p
              style={{
                fontSize: "clamp(14px,2vw,18px)",
                color: "#4f46e5",
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              A Structured, End-To-End Placement Ecosystem
            </p>
            <p
              style={{
                fontSize: "clamp(13px,1.5vw,15px)",
                color: "#4b5563",
                lineHeight: 1.8,
                maxWidth: 860,
                margin: "0 auto",
                textAlign: "justify",
              }}
            >
              TalentYug Is Built As The Missing Infrastructure Layer That Brings Structure,
              Transparency, And Efficiency To Tier 2/3 College Hiring. By Centralizing Company
              Connections, Streamlining Coordination, And Enabling Data-Driven Decision-Making,
              It Replaces Fragmented Manual Processes With A Single, Reliable System. The Platform
              Ensures Smoother Placement Drives, Better Hiring Visibility, And Outcome-Focused
              Execution For Colleges, Companies, And Students Alike.
            </p>
          </div>

          {/* Circular diagram */}
          <div
            className="hw-infra-inner"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* SVG-based circular diagram */}
            <div className="hw-circle-wrap">
              {/* Dashed orbit ring (SVG) */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                  pointerEvents: "none",
                }}
                viewBox="0 0 520 520"
              >
                {/* Orbit circle */}
                <circle
                  cx="260"
                  cy="260"
                  r={RADIUS}
                  fill="none"
                  stroke="#c7d2fe"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />
                {/* Arrow connectors between steps */}
                {steps.map((s, i) => {
                  const next = steps[(i + 1) % steps.length];
                  const ax = 260 + s.cx;
                  const ay = 260 + s.cy;
                  const bx = 260 + next.cx;
                  const by = 260 + next.cy;
                  // midpoint for a slight arc via quadratic bezier through center
                  const mx = (ax + bx) / 2;
                  const my = (ay + by) / 2;
                  // control point pulled slightly toward center
                  const cpx = mx + (260 - mx) * 0.15;
                  const cpy = my + (260 - my) * 0.15;
                  return (
                    <path
                      key={i}
                      d={`M ${ax} ${ay} Q ${cpx} ${cpy} ${bx} ${by}`}
                      fill="none"
                      stroke="#a5b4fc"
                      strokeWidth="1.5"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L6,3 z" fill="#4f46e5" />
                  </marker>
                </defs>
              </svg>

              {/* Center circle */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4f46e5,#1e3a8a)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 30px rgba(79,70,229,0.4)",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    lineHeight: 1.3,
                    textAlign: "center",
                  }}
                >
                  Talent
                  <br />
                  Yug
                </span>
              </div>

              {/* Step nodes */}
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="hw-step-node"
                  style={{
                    left: `calc(50% + ${s.cx}px)`,
                    top: `calc(50% + ${s.cy}px)`,
                    zIndex: 3,
                  }}
                >
                  <div className="hw-step-badge">{s.n}</div>
                  <span className="hw-step-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
