import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const WORK_CARDS = [
  {
    key: "colleges",
    headline: "AI-Powered Campus Hiring.",
    label: "For Colleges",
    href: "/colleges",
    bg: "#F4FAFD",
    arrowBg: "#0B3654",
  },
  {
    key: "students",
    headline: "Prepare, Apply, Get Hired.",
    label: "For Students",
    href: "/students",
    bg: "#F4FAFD",
    arrowBg: "#0B3654",
  },
  {
    key: "companies",
    headline: "Hire Smarter, Hire Faster.",
    label: "For Companies",
    href: "/companies",
    bg: "#DCEEFA",
    arrowBg: "#2180A8",
  },
];

export default function HomeWhy() {
  return (
    <section id="why-placements-fail" style={{ background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .hwhy-wrap {
          padding: 100px 20px 110px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hwhy-title {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
          color: #0B3654;
          margin: 0 0 10px;
        }
        .hwhy-subtitle {
          font-size: clamp(15px, 2vw, 18px);
          color: #444;
          font-weight: 500;
          margin: 0 0 44px;
        }

        .hwhy-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .hwhy-span-1 { grid-column: span 1; }
        .hwhy-span-2 { grid-column: span 2; }

        .hwhy-card {
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 50, 80, 0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hwhy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 50, 80, 0.12);
        }

        /* Stat cards (50% / 3X) */
        .hwhy-stat {
          padding: 28px 26px 22px;
          justify-content: space-between;
          min-height: 220px;
        }
        .hwhy-stat-num {
          font-size: clamp(40px, 5vw, 52px);
          font-weight: 800;
          margin: 0 0 8px;
          line-height: 1;
        }
        .hwhy-stat-label {
          font-size: 15px;
          font-weight: 600;
          margin: 0;
          line-height: 1.4;
        }
        .hwhy-badge {
          display: block;
          text-align: center;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin-top: 18px;
        }
        .hwhy-badge-dark { background: #0B3654; color: #fff; }
        .hwhy-badge-light { background: #fff; color: #0B3654; }

        /* Quote cards (Students / Colleges / Companies) */
        .hwhy-quote {
          background: #EAF6FD;
          padding: 32px 30px 26px;
          justify-content: space-between;
          min-height: 220px;
        }
        .hwhy-quote-text {
          font-size: 15.5px;
          line-height: 1.65;
          color: #33424C;
          font-weight: 500;
          margin: 0 0 20px;
        }
        .hwhy-quote-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hwhy-quote-footer h4 {
          font-size: 22px;
          font-weight: 800;
          color: #0B3654;
          margin: 0;
        }
        .hwhy-quote-emoji {
          font-size: 38px;
          line-height: 1;
        }

        /* Banner card (See How TalentYug Works) */
        .hwhy-banner {
          background: #0B3654;
          color: #fff;
          padding: 28px 26px;
          justify-content: center;
          min-height: 220px;
        }
        .hwhy-banner h3 {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 14px;
          line-height: 1.25;
        }
        .hwhy-banner p {
          font-size: 14.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          margin: 0;
        }

        /* Work cards (AI-Powered / Prepare Apply / Hire Smarter) */
        .hwhy-work {
          padding: 28px 26px;
          justify-content: space-between;
          min-height: 220px;
          text-decoration: none;
        }
        .hwhy-work h3 {
          font-size: 19px;
          font-weight: 800;
          color: #0B3654;
          margin: 0;
          line-height: 1.3;
        }
        .hwhy-work-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
        }
        .hwhy-work-footer span {
          font-size: 14px;
          font-weight: 600;
          color: #33424C;
        }
        .hwhy-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .hwhy-card:hover .hwhy-arrow {
          transform: rotate(45deg);
        }

        @media (max-width: 960px) {
          .hwhy-grid { grid-template-columns: repeat(2, 1fr); }
          .hwhy-span-1 { grid-column: span 1; }
          .hwhy-span-2 { grid-column: span 2; }
        }
        @media (max-width: 600px) {
          .hwhy-grid { grid-template-columns: 1fr; }
          .hwhy-span-1, .hwhy-span-2 { grid-column: span 1; }
        }
      `}</style>

      <div className="hwhy-wrap">
        <h2 className="hwhy-title">Why Placements Fail In Tier 2/3 Colleges</h2>
        <p className="hwhy-subtitle">A Broken System Hurting All Three Stakeholders</p>

        <div className="hwhy-grid">
          {/* Row 1 */}
          <div className="hwhy-card hwhy-stat hwhy-span-1" style={{ background: "#DCEEFA" }}>
            <div>
              <h3 className="hwhy-stat-num" style={{ color: "#0B3654" }}>50%</h3>
              <p className="hwhy-stat-label" style={{ color: "#33424C" }}>
                Graduates Left Unemployed Post-College
              </p>
            </div>
            <span className="hwhy-badge hwhy-badge-dark">TALENT CRISIS</span>
          </div>

          <div className="hwhy-card hwhy-stat hwhy-span-1" style={{ background: "#4A8EA5" }}>
            <div>
              <h3 className="hwhy-stat-num" style={{ color: "#fff" }}>3X</h3>
              <p className="hwhy-stat-label" style={{ color: "rgba(255,255,255,0.92)" }}>
                More Time Spent On Manual Placement Work
              </p>
            </div>
            <span className="hwhy-badge hwhy-badge-light">PROCESS GAP</span>
          </div>

          <div className="hwhy-card hwhy-quote hwhy-span-2">
            <p className="hwhy-quote-text">
              “Students Miss Opportunities Due To Zero Structured Preparation And Zero
              Visibility. 50% Remain Unemployed Post-Graduation — Not For Lack Of Talent,
              But Lack Of Guidance.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Students</h4>
              <span className="hwhy-quote-emoji">🧑‍🎓</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="hwhy-card hwhy-banner hwhy-span-1">
            <h3>See How TalentYug Works</h3>
            <p>Select Your Role To Explore</p>
          </div>

          {WORK_CARDS.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="hwhy-card hwhy-work hwhy-span-1"
              style={{ background: card.bg }}
            >
              <h3>{card.headline}</h3>
              <div className="hwhy-work-footer">
                <span>{card.label}</span>
                <span className="hwhy-arrow" style={{ background: card.arrowBg }}>
                  <ArrowUpRight size={18} color="#fff" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          ))}

          {/* Row 3 */}
          <div className="hwhy-card hwhy-quote hwhy-span-2">
            <p className="hwhy-quote-text">
              “Colleges Manage Placements Via WhatsApp And Excel. No Centralized
              Tracking, No Clarity On Who Got Placed, And Weak Company Coordination.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Colleges</h4>
              <span className="hwhy-quote-emoji">🏫</span>
            </div>
          </div>

          <div className="hwhy-card hwhy-quote hwhy-span-2">
            <p className="hwhy-quote-text">
              “Companies Receive Unstructured, Inconsistent Candidate Data. Hiring
              Visibility Is Almost Zero, So They Silently Skip Tier-2 Colleges Altogether.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Companies</h4>
              <span className="hwhy-quote-emoji">🏢</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
