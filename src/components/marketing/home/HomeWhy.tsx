"use client";

import Image from "next/image";

const PROBLEM_BOXES = [
  {
    key: "colleges",
    label: "Colleges",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 21h16v-2H4v2zm8-18L2 8v2h20V8l-10-5zm-5 8v6h2v-6H7zm4 0v6h2v-6h-2zm4 0v6h2v-6h-2z" />
      </svg>
    ),
    bullets: [
      "Manual Placement Processes",
      "Excel & WhatsApp Dependency",
      "No Centralized Tracking",
    ],
  },
  {
    key: "companies",
    label: "Companies",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v15h20V7L12 2zm0 2.24l8 4V20H4V8.24l8-4zM7 10h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
      </svg>
    ),
    bullets: [
      "Limited Hiring Visibility",
      "Weak College Coordination",
      "Unstructured Candidate Data",
    ],
  },
  {
    key: "students",
    label: "Students",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
      </svg>
    ),
    bullets: [
      "50% Unemployed Post-Graduation",
      "No Structured Preparation",
      "Missed Opportunities",
    ],
  },
];

export default function HomeWhy() {
  return (
    <section style={{ background: "#ffffff", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        /* Top Section: Placements Fail */
        .hw-top-wrap {
          padding: 100px 20px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hw-title {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
          color: #2E6B82;
          margin: 0 0 10px;
        }
        .hw-subtitle {
          font-size: clamp(15px, 2vw, 18px);
          color: #444;
          font-weight: 500;
          margin: 0 0 50px;
        }
        
        .hw-problem-grid {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hw-problem-box {
          flex: 1;
          min-width: 280px;
          max-width: 360px;
          background: #477E95;
          border-radius: 20px;
          padding: 35px 25px;
          color: #fff;
          box-shadow: 0 15px 30px rgba(46,107,130,0.15);
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .hw-problem-box::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
        }
        .hw-problem-box:hover {
          transform: translateY(-8px);
        }
        .hw-box-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .hw-box-header h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
        }
        .hw-box-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 2;
        }
        .hw-box-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          font-weight: 400;
          line-height: 1.4;
          color: rgba(255,255,255,0.95);
        }
        .hw-box-bullets li::before {
          content: "•";
          color: #fff;
          font-size: 18px;
          line-height: 1;
          opacity: 0.8;
        }

        /* Bottom Section: Infrastructure Layer */
        .hw-bottom-wrap {
          padding: 60px 20px 100px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hw-bottom-layout {
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .hw-left-content {
          flex: 1;
          min-width: 300px;
        }
        .hw-right-content {
          flex: 1.2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hw-desc {
          font-size: clamp(14px, 1.5vw, 16px);
          color: #333;
          line-height: 1.8;
          margin: 40px 0 0;
          text-align: justify;
        }

        @media (max-width: 960px) {
          .hw-bottom-layout {
            flex-direction: column;
            text-align: center;
            gap: 40px;
          }
          .hw-desc {
            text-align: left;
            margin-top: 30px;
          }
        }
        @media (max-width: 768px) {
          .hw-problem-box { max-width: 100%; }
        }
      `}</style>

      {/* ── PART 1: Why Placements Fail ── */}
      <div className="hw-top-wrap">
        <h2 className="hw-title">Why Placements Fail In Tier 2/3 Colleges</h2>
        <p className="hw-subtitle">A Broken System Hurting All Three Stakeholders</p>

        <div className="hw-problem-grid">
          {PROBLEM_BOXES.map((box) => (
            <div key={box.key} className="hw-problem-box">
              <div className="hw-box-header">
                {box.icon}
                <h3>{box.label}</h3>
              </div>
              <ul className="hw-box-bullets">
                {box.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── PART 2: TalentYug – The Missing Infrastructure Layer ── */}
      <div className="hw-bottom-wrap">
        <div className="hw-bottom-layout">
          {/* Left Text */}
          <div className="hw-left-content">
            <h2 className="hw-title">TalentYug – The Missing Infrastructure Layer</h2>
            <p className="hw-subtitle" style={{ marginBottom: 0 }}>A Structured, End-To-End Placement Ecosystem</p>
            <p className="hw-desc">
              TalentYug Is Built As The Missing Placement Infrastructure That Brings Structure, Transparency, And Efficiency To Tier 2/3 College Hiring. By Centralizing Company Connections, Streamlining Coordination, And Enabling Data-Driven Decision-Making, It Replaces Fragmented Manual Processes With A Single, Reliable System. The Platform Ensures Smoother Placement Drives, Better Hiring Visibility, And Outcome-Focused Execution For Colleges, Companies, And Students Alike.
            </p>
          </div>

          {/* Right Image */}
          <div className="hw-right-content">
            <Image
              src="/home-img/landing/steps.png"
              alt="TalentYug Placement Ecosystem Steps"
              width={650}
              height={450}
              style={{
                width: "100%",
                maxWidth: 650,
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
