"use client";

import React, { useState } from "react";
import Image from "next/image";

interface StepNode {
  id: number;
  title: string;
  sub: React.ReactNode;
  x: number; // 0..1000 in SVG viewBox
  y: number; // 0..320 in SVG viewBox
  color: string;
}

const STEPS: StepNode[] = [
  {
    id: 1,
    title: "COMPANY CONNECTION",
    sub: (
      <>
        Connect Verified Companies With
        <br />
        Colleges
      </>
    ),
    x: 48,
    y: 247,
    color: "#FB8C00",
  },
  {
    id: 2,
    title: "HR COORDINATION",
    sub: "Single-Point HR Communication",
    x: 228,
    y: 182,
    color: "#F5B800",
  },
  {
    id: 3,
    title: "DATA FILTERING",
    sub: (
      <>
        Skill &amp; Eligibility-Based
        <br />
        Shortlisting
      </>
    ),
    x: 359,
    y: 218,
    color: "#BEDB2A",
  },
  {
    id: 4,
    title: "DRIVE MANAGEMENT",
    sub: (
      <>
        End-To-End Drive Planning
        <br />
        &amp; Execution
      </>
    ),
    x: 498,
    y: 161,
    color: "#7ED321",
  },
  {
    id: 5,
    title: "MOCK INTERVIEWS",
    sub: "Interview Readiness & Feedback",
    x: 667,
    y: 207,
    color: "#3DD598",
  },
  {
    id: 6,
    title: "PRE-PLACEMENT TALKS",
    sub: "Role Clarity & Company Insights",
    x: 801,
    y: 122,
    color: "#00CECB",
  },
  {
    id: 7,
    title: "OFFER TRACKING",
    sub: "Offer Status & Final Outcomes",
    x: 966,
    y: 28,
    color: "#00E5FF",
  },
];

const PATH_D =
  "M 48 247 C 100 220, 160 182, 228 182 C 275 182, 310 218, 359 218 C 410 218, 445 161, 498 161 C 560 161, 605 207, 667 207 C 730 207, 765 155, 801 122 C 850 80, 915 32, 966 28";

const VB_W = 1000;
const VB_H = 320;

export default function HomeInfrastructure() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="infrastructure"
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        padding: "60px 24px 140px",
        overflow: "hidden",
      }}
    >
      <style>{`
        .infra-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Institutional Centered Quote Block */
        .infra-quote-wrapper {
          max-width: 980px;
          margin: 0 auto 90px;
          padding: 10px 20px;
        }

        .infra-quote-block {
          position: relative;
          padding: 12px 54px;
          text-align: center;
        }

        .infra-quote-text {
          font-size: clamp(17px, 1.85vw, 21.5px);
          font-weight: 700;
          color: #0B3654;
          line-height: 1.55;
          letter-spacing: -0.012em;
          margin: 0;
        }

        .infra-quote-mark {
          position: absolute;
          width: 44px;
          height: 38px;
          opacity: 0.92;
          user-select: none;
          pointer-events: none;
        }

        .infra-quote-mark.start {
          top: -12px;
          left: -4px;
        }

        .infra-quote-mark.end {
          bottom: -12px;
          right: -4px;
          transform: rotate(180deg);
        }

        @media (max-width: 900px) {
          .quote-br {
            display: none;
          }
        }

        /* Large Card */
        .infra-card {
          display: flex;
          align-items: stretch;
          background: #ffffff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 16px 45px -10px rgba(10, 50, 80, 0.12),
                      0 4px 16px -4px rgba(10, 50, 80, 0.05);
          border: 1px solid rgba(13, 53, 84, 0.08);
          position: relative;
          aspect-ratio: 1024 / 282;
        }

        /* Left Panel */
        .infra-left {
          flex: 0 0 25.5%;
          width: 25.5%;
          background: #E5F6FD;
          padding: 34px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        .infra-title {
          font-size: clamp(19px, 1.85vw, 24px);
          font-weight: 700;
          color: #0A3554;
          line-height: 1.32;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .infra-pill {
          display: block;
          width: 100%;
          background: #84DCFA;
          color: #0A3554;
          font-size: clamp(11.5px, 1.05vw, 13px);
          font-weight: 700;
          line-height: 1.35;
          text-align: center;
          padding: 11px 14px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(120, 215, 250, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          user-select: none;
          box-sizing: border-box;
        }

        .infra-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(120, 215, 250, 0.45);
        }

        /* Right Panel */
        .infra-right {
          flex: 1;
          position: relative;
          background: #22A8DC;
          overflow: hidden;
        }

        .infra-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .infra-stage svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Node Labels - Absolute positioning with guaranteed non-overlapping clearance */
        .infra-label {
          position: absolute;
          pointer-events: auto;
          transition: transform 0.2s ease, opacity 0.2s ease;
          cursor: pointer;
          z-index: 10;
        }

        /* Node 1: COMPANY CONNECTION (below-left) */
        .infra-label.node-1 {
          left: 4.8%;
          top: 78%;
          transform: translate(0, 16px);
          width: 155px;
          text-align: left;
        }

        /* Node 2: HR COORDINATION (below) */
        .infra-label.node-2 {
          left: 22.8%;
          top: 57%;
          transform: translate(-50%, 18px);
          width: 160px;
          text-align: center;
        }

        /* Node 3: DATA FILTERING (below) */
        .infra-label.node-3 {
          left: 35.9%;
          top: 68%;
          transform: translate(-50%, 18px);
          width: 160px;
          text-align: center;
        }

        /* Node 4: DRIVE MANAGEMENT (above) - Generous clearance above Crest 2 */
        .infra-label.node-4 {
          left: 49.8%;
          top: 50%;
          transform: translate(-50%, -125%);
          width: 160px;
          text-align: center;
        }

        /* Node 5: MOCK INTERVIEWS (below) */
        .infra-label.node-5 {
          left: 66.7%;
          top: 65%;
          transform: translate(-50%, 18px);
          width: 160px;
          text-align: center;
        }

        /* Node 6: PRE-PLACEMENT TALKS (above-left of Node 6) - SOLVES OVERLAP! */
        .infra-label.node-6 {
          left: 77.5%;
          top: 36%;
          transform: translate(-88%, -128%);
          width: 175px;
          text-align: center;
        }

        /* Node 7: OFFER TRACKING (below-right) */
        .infra-label.node-7 {
          left: 96.6%;
          top: 9%;
          transform: translate(-78%, 20px);
          width: 160px;
          text-align: center;
        }

        .infra-label-title {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #0A3554;
          margin: 0 0 2px;
          text-transform: uppercase;
          line-height: 1.25;
          transition: color 0.2s ease;
        }

        .infra-label-sub {
          font-size: 9px;
          font-weight: 600;
          color: #0A3554;
          margin: 0;
          line-height: 1.25;
          opacity: 0.85;
        }

        .infra-label:hover .infra-label-title,
        .infra-label.active .infra-label-title {
          color: #021827;
        }

        .node-interactive {
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .node-interactive:hover {
          transform: scale(1.35);
        }

        /* Mobile layout (< 920px) */
        .infra-mobile-list {
          display: none;
          flex-direction: column;
          gap: 18px;
          padding: 28px 24px;
          background: #22A8DC;
          width: 100%;
        }

        @media (max-width: 920px) {
          .infra-card {
            flex-direction: column;
            aspect-ratio: auto;
          }
          .infra-left {
            flex: 1 1 auto;
            width: 100%;
            padding: 34px 28px;
            gap: 24px;
          }
          .infra-stage {
            display: none !important;
          }
          .infra-mobile-list {
            display: flex !important;
          }
          .infra-quote-block {
            padding: 10px 42px;
          }
          .infra-quote-mark {
            width: 32px;
            height: 28px;
          }
        }

        @media (max-width: 600px) {
          .infra-title {
            font-size: 22px;
          }
          .infra-pill {
            font-size: 12.5px;
            padding: 12px 16px;
          }
          .infra-quote-wrapper {
            margin-bottom: 50px;
          }
        }
      `}</style>

      <div className="infra-container">
        {/* Institutional Centered Quote Block */}
        <div className="infra-quote-wrapper">
          <div className="infra-quote-block">
            <Image
              src="/home-img/landing/commaa.png"
              alt=""
              width={48}
              height={42}
              className="infra-quote-mark start"
            />
            <p className="infra-quote-text">
              Bridging The Gap For Tier 2/3 College Hiring, TalentYug Brings Colleges,
              <br className="quote-br" />
              Companies, And Students Onto One Centralized Platform — Streamlining
              <br className="quote-br" />
              Coordination, Eliminating Fragmented Manual Processes, And Enabling Data-
              <br className="quote-br" />
              Driven Decisions For Better Hiring Visibility And Outcome-Focused Execution.
            </p>
            <Image
              src="/home-img/landing/commaa.png"
              alt=""
              width={48}
              height={42}
              className="infra-quote-mark end"
            />
          </div>
        </div>

        {/* Large Card */}
        <div className="infra-card">
          {/* Left Column */}
          <div className="infra-left">
            <h2 className="infra-title">
              TalentYug – The
              <br />
              <span style={{ whiteSpace: "nowrap" }}>Missing Infrastructure</span>
              <br />
              Layer
            </h2>

            <div className="infra-pill">
              <span style={{ whiteSpace: "nowrap" }}>A Structured, End-To-End</span>
              <br />
              <span style={{ whiteSpace: "nowrap" }}>Placement Ecosystem</span>
            </div>
          </div>

          {/* Right Column: Stage Graphic */}
          <div className="infra-right">
            {/* Desktop / Tablet Interactive Stage */}
            <div className="infra-stage">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="rightPanelClip">
                    <rect x="0" y="0" width={VB_W} height={VB_H} />
                  </clipPath>

                  {/* Ribbon Multi-Stop Gradient */}
                  <linearGradient
                    id="pipeGrad"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FB8C00" />
                    <stop offset="18%" stopColor="#F5B800" />
                    <stop offset="36%" stopColor="#BEDB2A" />
                    <stop offset="54%" stopColor="#7ED321" />
                    <stop offset="72%" stopColor="#3DD598" />
                    <stop offset="88%" stopColor="#00CECB" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>

                  {/* Soft Neon Blur Filter */}
                  <filter
                    id="ribbonGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <filter
                    id="pulseGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Concentric circular ripples from top left boundary (x: 120, y: -30) */}
                <g clipPath="url(#rightPanelClip)">
                  <circle cx="120" cy="-30" r="380" fill="#32BDEE" />
                  <circle cx="120" cy="-30" r="300" fill="#59CEF7" />
                  <circle cx="120" cy="-30" r="220" fill="#8FE0FB" />
                  <circle cx="120" cy="-30" r="150" fill="#C0EFFD" />
                  <circle cx="120" cy="-30" r="90" fill="#E5F6FD" />
                </g>

                {/* Subtle outer neon halo under the ribbon */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth={16}
                  strokeLinecap="round"
                  opacity={0.35}
                  filter="url(#ribbonGlow)"
                />

                {/* Primary Continuous Pipeline Ribbon */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="url(#pipeGrad)"
                  strokeWidth={9.5}
                  strokeLinecap="round"
                />

                {/* Traveling Energy Light Packet */}
                <g filter="url(#pulseGlow)">
                  <circle r="12" fill="#00E5FF" opacity={0.4}>
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      path={PATH_D}
                    />
                  </circle>
                  <circle r="5.5" fill="#FFFFFF" opacity={0.95}>
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      path={PATH_D}
                    />
                  </circle>
                </g>

                {/* 7 SVG Milestone Nodes */}
                {STEPS.map((node) => {
                  const isHovered = activeStep === node.id;
                  return (
                    <g
                      key={node.id}
                      className="node-interactive"
                      style={{
                        transformOrigin: `${node.x}px ${node.y}px`,
                      }}
                      onMouseEnter={() => setActiveStep(node.id)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      {/* Outer White Ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 10.5 : 8.5}
                        fill="#FFFFFF"
                        stroke="rgba(0,0,0,0.06)"
                        strokeWidth={1}
                        style={{ transition: "r 0.2s ease" }}
                      />
                      {/* Inner Color Core */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 5.5 : 4.5}
                        fill={node.color}
                        style={{ transition: "r 0.2s ease" }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* HTML Positioned Step Labels for Pixel-Sharp Text */}
              {STEPS.map((node) => {
                const isHovered = activeStep === node.id;
                return (
                  <div
                    key={node.id}
                    className={`infra-label node-${node.id} ${isHovered ? "active" : ""}`}
                    onMouseEnter={() => setActiveStep(node.id)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className="infra-label-title">{node.title}</div>
                    <div className="infra-label-sub">{node.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Flow (< 920px) */}
            <div className="infra-mobile-list">
              {STEPS.map((node, index) => (
                <div
                  key={node.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    position: "relative",
                  }}
                >
                  {/* Connecting vertical line */}
                  {index < STEPS.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 12,
                        top: 24,
                        bottom: -18,
                        width: 2,
                        background: "rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  )}

                  {/* Node Circle */}
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      zIndex: 2,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: node.color,
                      }}
                    />
                  </div>

                  {/* Text Details */}
                  <div style={{ paddingTop: 2 }}>
                    <h4
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#0A3554",
                        margin: "0 0 3px",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {node.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "#0E3F63",
                        margin: 0,
                        lineHeight: 1.3,
                        opacity: 0.9,
                      }}
                    >
                      {node.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
