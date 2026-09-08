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
    title: "Sign Up",
    desc: "Student registers with email/college - Completes profile - Full name, email, phone - College, batch year, CGPA - Skills & certifications - Location preferences - Salary expectations",
    delay: "0s",
  },
  {
    id: 2,
    side: "right",
    icon: "/images/icons/monitor.svg",
    title: "Browse Opportunities",
    desc: "View job listings from 50+ companies - Filter by role, salary, location, skills - See job details + company info - Apply with 1-click (auto-filled profile)",
    delay: "0.6s",
  },
  {
    id: 3,
    side: "left",
    icon: "/images/icons/interview.svg",
    title: "Prepare for Interview",
    desc: "Access mock interview platform - Practice with role-specific questions - Get AI-generated feedback - Access interview tips & resources - View tips from TalentYug blog",
    delay: "1.2s",
  },
  {
    id: 4,
    side: "right",
    icon: "/images/icons/user.svg",
    title: "Interview",
    desc: "Receive interview notification - Interview link provided (video call integration) - Interview conducted with company - Feedback visible after (from interviewer)",
    delay: "1.8s",
  },
  {
    id: 5,
    side: "left",
    icon: "/images/icons/offer.svg",
    title: "Get Offer",
    desc: "Receive offer via platform - Accept/reject offer - View offer details (role, salary, joining date, benefits) - Download offer letter",
    delay: "2.4s",
  },
  {
    id: 6,
    side: "right",
    icon: "/images/icons/graphic-progression.svg",
    title: "Track Progress",
    desc: "Application status tracker - Interview feedback review - Accepted offer details - Post-hire onboarding support",
    delay: "3.0s",
  },
];

export default function StudentProcess() {
  return (
    <>
      <style>{`
        .spt-section {
          position: relative;
          background: #ffffff;
          padding: 80px 24px 120px;
          overflow: hidden;
        }

        .spt-wrapper {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
        }

        /* Central Spine Line */
        .spt-spine {
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
        .spt-spine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -2px;
          width: 8px;
          height: 64px;
          background: linear-gradient(180deg, transparent, #2180A8, transparent);
          border-radius: 4px;
          animation: spineTravel 6s linear infinite;
        }

        @keyframes spineTravel {
          0% { top: 0; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Row Layout */
        .spt-row {
          position: relative;
          width: 100%;
          min-height: 180px;
        }

        /* Dashed connecting lines */
        .spt-dashed-left {
          position: absolute;
          top: 34px;
          left: 44px;
          right: 50%;
          height: 0;
          border-top: 2px dashed #b8cdd9;
          z-index: 1;
        }

        .spt-dashed-right {
          position: absolute;
          top: 34px;
          left: 50%;
          right: 44px;
          height: 0;
          border-top: 2px dashed #b8cdd9;
          z-index: 1;
        }

        /* Floating Animated Badge */
        .spt-badge {
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
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, background-color 0.3s ease;
        }

        .spt-badge-left {
          left: 10px;
        }

        .spt-badge-right {
          right: 10px;
        }

        .spt-badge:hover {
          transform: scale(1.18) rotate(6deg) !important;
          background: #bde4f9;
          box-shadow: 0 12px 28px rgba(0, 55, 80, 0.25);
        }

        .spt-icon-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .spt-badge:hover .spt-icon-img {
          transform: scale(1.1);
        }

        /* Ripple effect */
        .spt-badge::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(0, 80, 112, 0.28);
          animation: badgeRipple 3.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          pointer-events: none;
        }

        @keyframes badgeRipple {
          0% { transform: scale(0.92); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        /* Text Content Blocks */
        .spt-content-left {
          position: absolute;
          top: 48px;
          right: calc(50% + 36px);
          max-width: 380px;
          text-align: right;
          z-index: 3;
        }

        .spt-content-right {
          position: absolute;
          top: 48px;
          left: calc(50% + 36px);
          max-width: 380px;
          text-align: left;
          z-index: 3;
        }

        .spt-title {
          font-size: 24px;
          font-weight: 800;
          color: #003750;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.015em;
        }

        .spt-desc {
          font-size: 14px;
          font-weight: 700;
          color: #003750;
          line-height: 1.5;
          margin: 0;
        }

        /* Mobile & Tablet Responsive */
        @media (max-width: 820px) {
          .spt-spine {
            left: 44px;
            transform: none;
          }
          .spt-row {
            min-height: auto;
            margin-bottom: 48px;
            display: flex;
            align-items: flex-start;
          }
          .spt-dashed-left, .spt-dashed-right {
            display: none;
          }
          .spt-badge {
            position: relative;
            top: 0 !important;
            left: 10px !important;
            right: auto !important;
            flex-shrink: 0;
          }
          .spt-content-left, .spt-content-right {
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

      <section className="spt-section" id="process">
        <div className="spt-wrapper">
          {/* Central spine line */}
          <div className="spt-spine" />

          {/* Staggered Rows */}
          {STEPS.map((step) => {
            const isLeft = step.side === "left";
            return (
              <div key={step.id} className="spt-row">
                {/* Dashed line */}
                <div className={isLeft ? "spt-dashed-left" : "spt-dashed-right"} />

                {/* Animated Badge */}
                <div
                  className={`spt-badge ${isLeft ? "spt-badge-left" : "spt-badge-right"}`}
                  style={{
                    animation: `iconFloat 4.2s ease-in-out infinite ${step.delay}`,
                  }}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={38}
                    height={38}
                    className="spt-icon-img"
                  />
                </div>

                {/* Content Block */}
                <div className={isLeft ? "spt-content-left" : "spt-content-right"}>
                  <h3 className="spt-title">{step.title}</h3>
                  <p className="spt-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
