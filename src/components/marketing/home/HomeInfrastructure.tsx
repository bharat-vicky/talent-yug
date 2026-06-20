import Image from "next/image";

interface Step {
  n: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  pos: "above" | "below";
  color: string;
}

const STEPS: Step[] = [
  { n: "01", title: "Company Connection", sub: "Connect Verified Companies With Colleges", x: 60, y: 200, pos: "below", color: "#F2A93B" },
  { n: "02", title: "HR Coordination", sub: "Single-Point HR Communication", x: 205, y: 140, pos: "above", color: "#E0B341" },
  { n: "03", title: "Data Filtering", sub: "Skill & Eligibility-Based Shortlisting", x: 350, y: 230, pos: "below", color: "#9CC25A" },
  { n: "04", title: "Drive Management", sub: "End-To-End Drive Planning & Execution", x: 495, y: 300, pos: "below", color: "#4FB286" },
  { n: "05", title: "Mock Interviews", sub: "Interview Readiness & Feedback", x: 640, y: 190, pos: "above", color: "#3AA9A0" },
  { n: "06", title: "Pre-Placement Talks", sub: "Role Clarity & Company Insights", x: 785, y: 110, pos: "above", color: "#2DA0C2" },
  { n: "07", title: "Offer Tracking", sub: "Offer Status & Final Outcomes", x: 930, y: 50, pos: "above", color: "#2492C9" },
];

const VB_W = 1000;
const VB_H = 360;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function HomeInfrastructure() {
  const pathD = buildSmoothPath(STEPS);

  return (
    <section style={{ background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .hi-wrap {
          padding: 30px 20px 110px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hi-quote-block {
          position: relative;
          max-width: 880px;
          margin: 0 auto 70px;
          padding: 10px 70px;
        }
        .hi-quote-block p {
          font-size: clamp(17px, 2.2vw, 22px);
          font-weight: 700;
          color: #0B3654;
          text-align: center;
          line-height: 1.55;
          margin: 0;
        }
        .hi-quote-mark {
          position: absolute;
          width: 46px;
          height: 46px;
          opacity: 0.85;
        }
        .hi-quote-mark.start { top: -6px; left: 0; }
        .hi-quote-mark.end { bottom: -6px; right: 0; transform: scaleX(-1) scaleY(-1); }

        .hi-card {
          display: flex;
          align-items: stretch;
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 50, 80, 0.1);
        }
        .hi-left {
          flex: 0 0 30%;
          background: #DCEEFA;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 22px;
        }
        .hi-left h2 {
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800;
          color: #0B3654;
          line-height: 1.3;
          margin: 0;
        }
        .hi-pill {
          display: inline-block;
          background: #4A8EA5;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 9999px;
          line-height: 1.3;
        }
        .hi-right {
          flex: 1;
          background: #0B3654;
          padding: 36px 30px;
          display: flex;
          align-items: center;
        }
        .hi-steps-graphic {
          position: relative;
          width: 100%;
          aspect-ratio: ${VB_W} / ${VB_H};
        }
        .hi-steps-graphic svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hi-step-label {
          position: absolute;
          width: 130px;
          text-align: center;
          transform: translateX(-50%);
        }
        .hi-step-label.above { transform: translate(-50%, -100%); padding-bottom: 14px; }
        .hi-step-label.below { padding-top: 14px; }
        .hi-step-label h4 {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #fff;
          margin: 0 0 3px;
          text-transform: uppercase;
          line-height: 1.25;
        }
        .hi-step-label p {
          font-size: 9.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 860px) {
          .hi-card { flex-direction: column; }
          .hi-left, .hi-right { flex: 1 1 auto; }
          .hi-quote-block { padding: 10px 50px; }
        }
        @media (max-width: 640px) {
          .hi-step-label { width: 95px; }
          .hi-quote-mark { width: 32px; height: 32px; }
        }
      `}</style>

      <div className="hi-wrap">
        {/* Centered quote */}
        <div className="hi-quote-block">
          <Image src="/home-img/landing/commaa.png" alt="" width={46} height={40} className="hi-quote-mark start" />
          <p>
            Bridging The Gap For Tier 2/3 College Hiring, TalentYug Brings Colleges,
            Companies, And Students Onto One Centralized Platform — Streamlining
            Coordination, Eliminating Fragmented Manual Processes, And Enabling
            Data-Driven Decisions For Better Hiring Visibility And Outcome-Focused
            Execution.
          </p>
          <Image src="/home-img/landing/commaa.png" alt="" width={46} height={40} className="hi-quote-mark end" />
        </div>

        {/* Missing infrastructure layer card */}
        <div className="hi-card">
          <div className="hi-left">
            <h2>TalentYug – The Missing Infrastructure Layer</h2>
            <span className="hi-pill">A Structured, End-To-End Placement Ecosystem</span>
          </div>

          <div className="hi-right">
            <div className="hi-steps-graphic">
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="stepsLineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F2A93B" />
                    <stop offset="50%" stopColor="#4FB286" />
                    <stop offset="100%" stopColor="#2492C9" />
                  </linearGradient>
                </defs>
                <path d={pathD} fill="none" stroke="url(#stepsLineGradient)" strokeWidth={3} strokeLinecap="round" />
                {STEPS.map((s) => (
                  <g key={s.n}>
                    <circle cx={s.x} cy={s.y} r={11} fill="#0B3654" stroke={s.color} strokeWidth={3} />
                    <circle cx={s.x} cy={s.y} r={3.5} fill={s.color} />
                  </g>
                ))}
              </svg>

              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className={`hi-step-label ${s.pos}`}
                  style={{ left: `${(s.x / VB_W) * 100}%`, top: `${(s.y / VB_H) * 100}%` }}
                >
                  <h4>{s.title}</h4>
                  <p>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
