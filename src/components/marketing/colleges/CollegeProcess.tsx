"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface StepItem {
  id: number;
  title: string[];
  desc: string;
  side: "left" | "right";
  icon: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: ["Onboard Your", "College"],
    desc: "TPO registers + uploads student data - Basic college info - Student database structure",
    side: "left",
    icon: "/college-img/process/step1.png",
  },
  {
    id: 2,
    title: ["Connect with", "Companies"],
    desc: "We bring 50+ pre-vetted companies - Companies post job requirements - Structured templates",
    side: "right",
    icon: "/college-img/process/step2.png",
  },
  {
    id: 3,
    title: ["AI Matches", "Students"],
    desc: "Our algorithm analyzes student profiles - Matches students to relevant roles - NOT mass blast - precision matching",
    side: "left",
    icon: "/college-img/process/step3.png",
  },
  {
    id: 4,
    title: ["Students Apply"],
    desc: "Students see role-matched opportunities - Apply with 1-click - Access preparation resources",
    side: "right",
    icon: "/college-img/process/step4.png",
  },
  {
    id: 5,
    title: ["Interview", "Management"],
    desc: "Companies conduct interviews via platform - TPO tracks progress in real-time - Interview schedules auto-sync",
    side: "left",
    icon: "/college-img/process/step5.png",
  },
  {
    id: 6,
    title: ["Analytics &", "Reporting"],
    desc: "TPO sees placement funnel - Conversion rates by company/role - Student salary distributions - Export reports for annual reporting",
    side: "right",
    icon: "/college-img/process/step6.png",
  },
  {
    id: 7,
    title: ["Offer &", "Acceptance"],
    desc: "Companies send offer via platform - Students accept/reject - Placement confirmed + salary documented",
    side: "left",
    icon: "/college-img/process/step7.png",
  },
];

export default function CollegeProcess() {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Auto-advance traveling beam through each of the 7 steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 7 ? 1 : prev + 1));
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const currentStep = hoveredStep !== null ? hoveredStep : activeStep;

  // Percentage position along the central spine for steps 1 through 7
  const beamTopPercent = ((currentStep - 1) / 6) * 100;

  return (
    <>
      <style>{`
        .proc-section {
          position: relative;
          background: #ffffff;
          padding: 60px 24px 180px;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .proc-container,
        .proc-container *,
        .proc-container *::before,
        .proc-container *::after {
          box-sizing: border-box;
        }

        .proc-container {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
        }

        /* Central Navy Spine */
        .proc-spine {
          position: absolute;
          left: 50%;
          top: 30px;
          height: calc(100% - 60px);
          width: 5px;
          background: #053B50;
          transform: translateX(-50%);
          border-radius: 4px;
          z-index: 1;
        }

        /* Continuous GPU-accelerated Traveling Energy Beam */
        .proc-spine-beam {
          position: absolute;
          left: -4px;
          width: 13px;
          height: 68px;
          border-radius: 8px;
          background: linear-gradient(180deg, rgba(56, 189, 248, 0) 0%, #38bdf8 35%, #ffffff 65%, #38bdf8 90%, rgba(56, 189, 248, 0) 100%);
          box-shadow: 0 0 24px 6px rgba(56, 189, 248, 0.95), 0 0 10px 3px #ffffff;
          transform: translateY(-50%);
          animation: procPulseGlide 8s linear infinite;
          pointer-events: none;
          z-index: 3;
        }

        @keyframes procPulseGlide {
          0% {
            top: 0%;
            opacity: 0;
            transform: translateY(-50%) scaleY(0.7);
          }
          4% {
            opacity: 1;
            transform: translateY(-50%) scaleY(1);
          }
          96% {
            opacity: 1;
            transform: translateY(-50%) scaleY(1);
          }
          100% {
            top: 100%;
            opacity: 0;
            transform: translateY(-50%) scaleY(0.7);
          }
        }

        /* Active Step Targeted Ring along Spine */
        .proc-spine-target {
          position: absolute;
          left: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #38bdf8;
          box-shadow: 0 0 18px 4px rgba(56, 189, 248, 0.9);
          transform: translateY(-50%);
          transition: top 0.6s cubic-bezier(0.34, 1.25, 0.64, 1);
          z-index: 4;
          pointer-events: none;
        }

        /* Spine Junction Nodes for all 7 steps */
        .proc-spine-junction {
          position: absolute;
          left: -2.5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0c4a6e;
          border: 2px solid #38bdf8;
          transform: translateY(-50%);
          transition: all 0.3s ease;
          z-index: 2;
        }

        .proc-spine-junction.active {
          background: #38bdf8;
          box-shadow: 0 0 12px 3px rgba(56, 189, 248, 0.85);
          transform: translateY(-50%) scale(1.3);
        }

        /* Step rows */
        .proc-step-row {
          position: relative;
          width: 100%;
          margin-bottom: 30px;
          clear: both;
          cursor: pointer;
        }
        .proc-step-row::after {
          content: "";
          display: table;
          clear: both;
        }
        .proc-step-row:last-child {
          margin-bottom: 0;
        }

        /* Left Step Container: strictly occupying left 50% */
        .proc-step-left {
          width: 50%;
          float: left;
          padding-right: 38px;
          text-align: right;
          position: relative;
        }

        /* Right Step Container: strictly occupying right 50% */
        .proc-step-right {
          width: 50%;
          margin-left: 50%;
          padding-left: 38px;
          text-align: left;
          position: relative;
        }

        /* Flowing Dashed Lines (Left) */
        .proc-dash-left {
          position: absolute;
          top: 30px;
          left: 60px;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            #94a3b8 0,
            #94a3b8 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 2px;
          z-index: 0;
          pointer-events: none;
          opacity: 0.65;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        /* Flowing Dashed Lines (Right) */
        .proc-dash-right {
          position: absolute;
          top: 30px;
          left: 0;
          right: 60px;
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            #94a3b8 0,
            #94a3b8 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 2px;
          z-index: 0;
          pointer-events: none;
          opacity: 0.65;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        /* Active / Hover Animated Dash Flow */
        .proc-step-row.is-active .proc-dash-left,
        .proc-step-row:hover .proc-dash-left {
          opacity: 1;
          background: repeating-linear-gradient(
            to right,
            #0284c7 0,
            #0284c7 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 2px;
          animation: procDashFlowLeft 0.85s linear infinite;
          filter: drop-shadow(0 0 5px rgba(2, 132, 199, 0.85));
        }

        .proc-step-row.is-active .proc-dash-right,
        .proc-step-row:hover .proc-dash-right {
          opacity: 1;
          background: repeating-linear-gradient(
            to right,
            #0284c7 0,
            #0284c7 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 2px;
          animation: procDashFlowRight 0.85s linear infinite;
          filter: drop-shadow(0 0 5px rgba(2, 132, 199, 0.85));
        }

        @keyframes procDashFlowLeft {
          from {
            background-position: 12px 0;
          }
          to {
            background-position: 0 0;
          }
        }

        @keyframes procDashFlowRight {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 12px 0;
          }
        }

        /* Circular Icon Badges with floating animation & ripple waves */
        .proc-badge-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #E0F2FE;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 4px 14px rgba(5, 59, 80, 0.08);
          animation: procBadgeFloat 4.2s ease-in-out infinite;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .proc-badge-right {
          position: absolute;
          right: 0;
          top: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #E0F2FE;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 4px 14px rgba(5, 59, 80, 0.08);
          animation: procBadgeFloat 4.2s ease-in-out infinite;
          animation-delay: 2.1s;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, box-shadow 0.3s ease;
        }

        @keyframes procBadgeFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        /* Ripple effect */
        .proc-badge-left::after,
        .proc-badge-right::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(85, 171, 206, 0.38);
          animation: procBadgeRipple 3.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          pointer-events: none;
        }

        @keyframes procBadgeRipple {
          0% {
            transform: scale(0.92);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.36);
            opacity: 0;
          }
        }

        .proc-step-row.is-active .proc-badge-left,
        .proc-step-row.is-active .proc-badge-right,
        .proc-step-row:hover .proc-badge-left,
        .proc-step-row:hover .proc-badge-right {
          transform: scale(1.16) translateY(-4px) !important;
          background: #bae6fd;
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.7);
        }

        /* Text Blocks */
        .proc-text-block-left {
          padding-top: 38px;
          max-width: 295px;
          margin-left: auto;
        }

        .proc-text-block-right {
          padding-top: 38px;
          max-width: 295px;
          margin-right: auto;
        }

        /* Titles */
        .proc-title-left {
          font-size: 25px;
          font-weight: 800;
          line-height: 1.15;
          color: #053B50;
          margin: 0 0 10px 0;
          text-align: right;
          word-break: break-word;
          transition: color 0.3s ease;
        }

        .proc-title-right {
          font-size: 25px;
          font-weight: 800;
          line-height: 1.15;
          color: #053B50;
          margin: 0 0 10px 0;
          text-align: left;
          word-break: break-word;
          transition: color 0.3s ease;
        }

        .proc-step-row.is-active .proc-title-left,
        .proc-step-row.is-active .proc-title-right,
        .proc-step-row:hover .proc-title-left,
        .proc-step-row:hover .proc-title-right {
          color: #0284c7;
        }

        /* Descriptions */
        .proc-desc-left {
          font-size: 14px;
          line-height: 1.45;
          font-weight: 500;
          color: #0F172A;
          margin: 0;
          text-align: right;
          word-break: break-word;
        }

        .proc-desc-right {
          font-size: 14px;
          line-height: 1.45;
          font-weight: 500;
          color: #0F172A;
          margin: 0;
          text-align: left;
          word-break: break-word;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .proc-spine {
            left: 28px;
            transform: none;
          }
          .proc-dash-left,
          .proc-dash-right {
            display: none;
          }
          .proc-step-left,
          .proc-step-right {
            width: 100%;
            float: none;
            margin-left: 0;
            padding-left: 72px;
            padding-right: 0;
            text-align: left;
          }
          .proc-badge-left,
          .proc-badge-right {
            left: 0;
            right: auto;
          }
          .proc-text-block-left,
          .proc-text-block-right {
            max-width: 100%;
            margin: 0;
            padding-top: 6px;
          }
          .proc-title-left,
          .proc-title-right {
            text-align: left;
          }
          .proc-desc-left,
          .proc-desc-right {
            text-align: left;
          }
        }
      `}</style>

      <section className="proc-section" id="process">
        <div className="proc-container">
          {/* Central Spine with Continuous Traveling Beam & Step Nodes */}
          <div className="proc-spine">
            {/* Continuous GPU Traveling Laser Pulse */}
            <div className="proc-spine-beam" />

            {/* Targeted Active Step Ring */}
            <div
              className="proc-spine-target"
              style={{ top: `${beamTopPercent}%` }}
            />

            {/* Junction Nodes at all 7 step intersections */}
            {STEPS.map((s) => {
              const topPos = ((s.id - 1) / 6) * 100;
              const isJuncActive = s.id === currentStep;
              return (
                <div
                  key={`junction-${s.id}`}
                  className={`proc-spine-junction ${isJuncActive ? "active" : ""}`}
                  style={{ top: `${topPos}%` }}
                />
              );
            })}
          </div>

          {STEPS.map((step) => {
            const isLeft = step.side === "left";
            const isActive = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`proc-step-row ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveStep(step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {isLeft ? (
                  /* Left Step */
                  <div className="proc-step-left">
                    <div className="proc-dash-left" />
                    <div className="proc-badge-left">
                      <Image
                        src={step.icon}
                        alt={`Step ${step.id}`}
                        width={28}
                        height={28}
                        style={{ objectFit: "contain", width: 28, height: 28 }}
                      />
                    </div>
                    <div className="proc-text-block-left">
                      <h3 className="proc-title-left">
                        {step.title[0]}
                        {step.title[1] && (
                          <>
                            <br />
                            {step.title[1]}
                          </>
                        )}
                      </h3>
                      <p className="proc-desc-left">{step.desc}</p>
                    </div>
                  </div>
                ) : (
                  /* Right Step */
                  <div className="proc-step-right">
                    <div className="proc-dash-right" />
                    <div className="proc-badge-right">
                      <Image
                        src={step.icon}
                        alt={`Step ${step.id}`}
                        width={28}
                        height={28}
                        style={{ objectFit: "contain", width: 28, height: 28 }}
                      />
                    </div>
                    <div className="proc-text-block-right">
                      <h3 className="proc-title-right">
                        {step.title[0]}
                        {step.title[1] && (
                          <>
                            <br />
                            {step.title[1]}
                          </>
                        )}
                      </h3>
                      <p className="proc-desc-right">{step.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
