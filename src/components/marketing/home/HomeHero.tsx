"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_PAD_TOP = 100;
const HERO_PAD_BOTTOM = 24;

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    function recalc() {
      const el = containerRef.current;
      if (!el || window.innerWidth <= 1024) {
        setScale(1);
        setOffset(0);
        return;
      }
      // offsetHeight (flow-box height) is the right measure of "real" content —
      // the backdrop ellipse intentionally overflows it for ambient decoration
      // and is fine to let clip via the section's overflow:hidden, same as it
      // does at natural scale.
      const availableHeight = window.innerHeight - (HERO_PAD_TOP + HERO_PAD_BOTTOM);
      const availableWidth = window.innerWidth - 48; // matches hero-section's 24px side padding
      const naturalHeight = el.offsetHeight;
      const naturalWidth = el.offsetWidth;
      const heightScale = naturalHeight > 0 ? availableHeight / naturalHeight : 1;
      const widthScale = naturalWidth > 0 ? availableWidth / naturalWidth : 1;
      // Fill the available height in both directions (shrink on short screens,
      // grow on tall ones) so there's never dead space — but uniform scale also
      // grows width, so cap by widthScale too or side cards clip off-screen.
      const s = Math.min(1.25, heightScale, widthScale);
      const visualHeight = naturalHeight * s;
      setScale(s);
      setOffset(Math.max(0, (availableHeight - visualHeight) / 2));
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <>
      <style>{`
        .hero-section {
          background: #C4E5F5;
          width: 100%;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 140px 24px 80px 24px;
          font-family: var(--font-geist-sans), Inter, sans-serif;
        }

        @media (min-width: 1025px) {
          .hero-section {
            height: 100vh;
            overflow: hidden;
            padding: ${HERO_PAD_TOP}px 24px ${HERO_PAD_BOTTOM}px 24px;
          }
        }

        .hero-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          transform-origin: top center;
        }

        .hero-headline {
          font-size: clamp(34px, 4.8vw, 56px);
          font-weight: 800;
          color: #005070;
          text-align: center;
          line-height: 1.15;
          max-width: 850px;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
          z-index: 10;
        }

        /* Center Illustration Area */
        .hero-center-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 480px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
        }

        .hero-backdrop-ellipse {
          position: absolute;
          width: 780px;
          height: 780px;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-student-img {
          position: absolute;
          width: 320px;
          height: 320px;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        /* Glassmorphic buttons container */
        .hero-glass-buttons {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          padding: 8px 10px;
          border-radius: 9999px;
          display: flex;
          gap: 10px;
          z-index: 10;
          box-shadow: 0 10px 30px rgba(0, 50, 80, 0.08);
          white-space: nowrap;
        }

        .hero-btn-primary {
          background: #2180A8;
          color: #ffffff;
          border: none;
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          background: #196687;
          transform: translateY(-1px);
        }

        .hero-btn-secondary {
          background: transparent;
          color: #005070;
          border: 1.5px solid #005070;
          padding: 11px 26px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .hero-btn-secondary:hover {
          background: rgba(0, 80, 112, 0.08);
          transform: translateY(-1px);
        }

        /* Left Side Absolute Content */
        .hero-left-text {
          position: absolute;
          top: 220px;
          left: 30px;
          font-size: clamp(19px, 1.8vw, 24px);
          font-weight: 600;
          color: #005070;
          line-height: 1.4;
          max-width: 380px;
          z-index: 10;
        }

        .hero-card-markets {
          position: absolute;
          bottom: 80px;
          left: 30px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(33, 128, 168, 0.18);
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: 0 10px 30px rgba(0, 50, 80, 0.06);
          min-width: 180px;
          z-index: 10;
        }

        /* Right Side Absolute Content */
        .hero-card-unemployed {
          position: absolute;
          top: 200px;
          right: 30px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(33, 128, 168, 0.18);
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: 0 10px 30px rgba(0, 50, 80, 0.06);
          min-width: 210px;
          z-index: 10;
        }

        .hero-rating-block {
          position: absolute;
          bottom: 140px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
          align-items: flex-start;
        }

        .hero-stars {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        /* Stat typography */
        .stat-num {
          font-size: 22px;
          font-weight: 850;
          color: #005070;
          margin: 0 0 2px 0;
        }
        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #477E95;
          margin: 0;
        }

        /* Floating animations */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .animate-float-1 {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-medium 7s ease-in-out infinite;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .hero-section {
            padding-top: 140px;
            min-height: auto;
          }
          .hero-container {
            min-height: auto;
          }
          .hero-left-text {
            position: static;
            text-align: center;
            margin: 20px 0;
            max-width: 100%;
          }
          .hero-card-markets, .hero-card-unemployed, .hero-rating-block {
            position: static;
            margin: 10px 0;
            width: 100%;
            max-width: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .hero-rating-block {
            align-items: center;
          }
          .hero-center-wrapper {
            margin: 30px 0;
            height: 380px;
          }
          .hero-backdrop-ellipse {
            width: 520px;
            height: 520px;
          }
          .hero-student-img {
            width: 220px;
            height: 220px;
            bottom: 30px;
          }
          .hero-glass-buttons {
            bottom: 10px;
          }
        }

        @media (max-width: 540px) {
          .hero-center-wrapper {
            height: 320px;
          }
          .hero-backdrop-ellipse {
            width: 400px;
            height: 400px;
          }
          .hero-student-img {
            width: 185px;
            height: 185px;
            bottom: 25px;
          }
          .hero-glass-buttons {
            padding: 8px;
            gap: 8px;
          }
          .hero-btn-primary, .hero-btn-secondary {
            padding: 10px 18px;
            font-size: 13px;
          }
        }
      `}</style>

      <section className="hero-section">
        <div
          className="hero-container"
          ref={containerRef}
          style={{ transform: `scale(${scale})`, marginTop: offset }}
        >
          {/* Centered Headline */}
          <h1 className="hero-headline">
            India’s Placement Infrastructure For Tier 2/3 Colleges
          </h1>

          {/* Left Side: Subtext Bullet List (styled as absolute text on desktop) */}
          <div className="hero-left-text">
            70% Placements | 5.5L Average
            <br />
            Salary | 7-Step Structured
            <br />
            Process
          </div>

          {/* Left Side: Markets floating card */}
          <div className="hero-card-markets animate-float-1">
            <h4 className="stat-num">500Cr+</h4>
            <p className="stat-label">Markets</p>
          </div>

          {/* Center Illustration Area */}
          <div className="hero-center-wrapper">
            {/* Ellipse 78 Background */}
            <div className="hero-backdrop-ellipse">
              <Image
                src="/home-img/landing/Ellipse 78.png"
                alt="Blue backdrop circle"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Student Image */}
            <div className="hero-student-img">
              <Image
                src="/home-img/landing/image.png"
                alt="Student with laptop"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Buttons inside Glass container */}
            <div className="hero-glass-buttons">
              <Link href="/register" className="hero-btn-primary">
                Get Started
              </Link>
              <Link href="/about" className="hero-btn-secondary">
                About Us
              </Link>
            </div>
          </div>

          {/* Right Side: Unemployed floating card */}
          <div className="hero-card-unemployed animate-float-2">
            <h4 className="stat-num">1M+ Students</h4>
            <p className="stat-label">Annual Unemployed</p>
          </div>

          {/* Right Side: Rating block */}
          <div className="hero-rating-block">
            <div className="hero-stars" style={{ marginBottom: 4 }}>
              <Image
                src="/home-img/landing/3.5 stars.png"
                alt="3.5 stars"
                width={110}
                height={20}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#005070" }}>70%</span>
              <span style={{ fontSize: 13, fontWeight: 650, color: "#477E95" }}>Success Rate</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
