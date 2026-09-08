"use client";

import Image from "next/image";

interface Step {
  id: number;
  side: "left" | "right";
  icon: string;
  title: string;
  desc: string;
  delay: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    side: "left",
    icon: "/images/icons/apply.svg",
    title: "Create Job Posting",
    desc: "Company fills standardized form - Role name, description, skills required - Salary band, location, job type - Interview timeline, rounds - Start date - Form gets distributed to college network",
    delay: "0s",
  },
  {
    id: 2,
    side: "right",
    icon: "/images/icons/graphic-progression.svg",
    title: "Receive Candidate Pool",
    desc: "TalentYug AI matches candidates across colleges - Candidates ranked by fit - Candidate profiles include CGPA, skills, projects, preferences",
    delay: "0.6s",
  },
  {
    id: 3,
    side: "left",
    icon: "/images/icons/interview.svg",
    title: "Interview & Shortlist",
    desc: "Company shortlists candidates on platform - Interviews scheduled automatically (no back-and-forth) - Interview feedback recorded on platform - Real-time status visible to all stakeholders",
    delay: "1.2s",
  },
  {
    id: 4,
    side: "right",
    icon: "/images/icons/offer.svg",
    title: "Make Offers",
    desc: "Offer generated + sent via platform - Candidate accepts/rejects - Offer tracked with deadline - Salary documented automatically",
    delay: "1.8s",
  },
  {
    id: 5,
    side: "left",
    icon: "/images/icons/user.svg",
    title: "Hire & Onboard",
    desc: "Confirmed hire list exported - Joining date tracked - Post-hire feedback on new employee performance",
    delay: "2.4s",
  },
  {
    id: 6,
    side: "right",
    icon: "/images/icons/analytics-insights.svg",
    title: "Analytics & Insights",
    desc: "Time-to-hire metrics - Cost-per-hire - Quality of hires (performance tracking) - College/batch performance - Repeat hiring rates",
    delay: "3.0s",
  },
];

export default function CompanyProcess() {
  return (
    <>
      <style>{`
        .cpt-section {
          position: relative;
          background: #ffffff;
          padding: 80px 24px 120px;
          overflow: hidden;
        }

        .cpt-wrapper {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
        }

        /* Central Spine Line */
        .cpt-spine {
          position: absolute;
          top: 34px;
          bottom: 40px;
          left: 50%;
          width: 4px;
          background: #003750;
          transform: translateX(-50%);
          border-radius: 4px;
          z-index: 2;
        }

        /* Ambient light pulse travelling down spine */
        .cpt-spine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -2px;
          width: 8px;
          height: 64px;
          background: linear-gradient(180deg, transparent, #2180A8, transparent);
          border-radius: 4px;
          animation: spineTravelCompanies 6s linear infinite;
        }

        @keyframes spineTravelCompanies {
          0% {
            top: 0;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        /* Row Layout */
        .cpt-row {
          position: relative;
          width: 100%;
          min-height: 180px;
        }

        /* Dashed connecting lines */
        .cpt-dashed-left {
          position: absolute;
          top: 34px;
          left: 44px;
          right: 50%;
          height: 0;
          border-top: 2px dashed #b8cdd9;
          z-index: 1;
        }

        .cpt-dashed-right {
          position: absolute;
          top: 34px;
          left: 50%;
          right: 44px;
          height: 0;
          border-top: 2px dashed #b8cdd9;
          z-index: 1;
        }

        /* Floating Animated Badge */
        .cpt-badge {
          position: absolute;
          top: 0;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #d4effc;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 55, 80, 0.12);
          z-index: 4;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease, background-color 0.3s ease;
        }

        .cpt-badge-left {
          left: 10px;
        }

        .cpt-badge-right {
          right: 10px;
        }

        .cpt-badge:hover {
          transform: scale(1.18) rotate(6deg) !important;
          background: #bde4f9;
          box-shadow: 0 12px 28px rgba(0, 55, 80, 0.25);
        }

        .cpt-icon-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .cpt-badge:hover .cpt-icon-img {
          transform: scale(1.1);
        }

        /* Ripple effect */
        .cpt-badge::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(0, 80, 112, 0.28);
          animation: badgeRippleCompanies 3.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          pointer-events: none;
        }

        @keyframes badgeRippleCompanies {
          0% {
            transform: scale(0.92);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes iconFloatCompanies {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        /* Text Content Blocks */
        .cpt-content-left {
          position: absolute;
          top: 48px;
          right: calc(50% + 36px);
          max-width: 390px;
          text-align: right;
          z-index: 3;
        }

        .cpt-content-right {
          position: absolute;
          top: 48px;
          left: calc(50% + 36px);
          max-width: 390px;
          text-align: left;
          z-index: 3;
        }

        .cpt-title {
          font-size: 24px;
          font-weight: 800;
          color: #003750;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.015em;
        }

        .cpt-desc {
          font-size: 14px;
          font-weight: 700;
          color: #003750;
          line-height: 1.5;
          margin: 0;
        }

        /* Mobile & Tablet Responsive */
        @media (max-width: 820px) {
          .cpt-spine {
            left: 44px;
            transform: none;
          }
          .cpt-row {
            min-height: auto;
            margin-bottom: 48px;
            display: flex;
            align-items: flex-start;
          }
          .cpt-dashed-left,
          .cpt-dashed-right {
            display: none;
          }
          .cpt-badge {
            position: relative;
            top: 0 !important;
            left: 10px !important;
            right: auto !important;
            flex-shrink: 0;
          }
          .cpt-content-left,
          .cpt-content-right {
            position: relative;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            max-width: 100%;
            text-align: left !important;
            padding-left: 28px;
          }
        }
      `}</style>

      <section className="cpt-section" id="process">
        <div className="cpt-wrapper">
          {/* Central spine line */}
          <div className="cpt-spine" />

          {/* Staggered Rows */}
          {STEPS.map((step) => {
            const isLeft = step.side === "left";
            return (
              <div key={step.id} className="cpt-row">
                {/* Dashed line */}
                <div
                  className={isLeft ? "cpt-dashed-left" : "cpt-dashed-right"}
                />

                {/* Animated Badge */}
                <div
                  className={`cpt-badge ${
                    isLeft ? "cpt-badge-left" : "cpt-badge-right"
                  }`}
                  style={{
                    animation: `iconFloatCompanies 4.2s ease-in-out infinite ${step.delay}`,
                  }}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={38}
                    height={38}
                    className="cpt-icon-img"
                  />
                </div>

                {/* Content Block */}
                <div
                  className={
                    isLeft ? "cpt-content-left" : "cpt-content-right"
                  }
                >
                  <h3 className="cpt-title">{step.title}</h3>
                  <p className="cpt-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
