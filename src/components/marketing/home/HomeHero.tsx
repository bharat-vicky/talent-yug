"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <>
      <style>{`
        .hhero-section {
          background: linear-gradient(180deg, #CEE8F7 0%, #D8EEFA 55%, #E3F3FC 100%);
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 130px 24px 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hhero-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Headline */
        .hhero-heading {
          font-size: clamp(34px, 4.4vw, 54px);
          font-weight: 800;
          color: #0c374d;
          text-align: center;
          line-height: 1.18;
          letter-spacing: -0.025em;
          margin: 0 0 36px 0;
          max-width: 880px;
          z-index: 10;
        }

        /* Center Stage Area */
        .hhero-stage {
          position: relative;
          width: 100%;
          max-width: 1040px;
          min-height: 520px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Backdrop Big Cyan Circle */
        .hhero-circle-backdrop {
          position: absolute;
          width: 580px;
          height: 580px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at 45% 45%, #62C1EB 0%, #52B5E2 60%, #46A8D6 100%);
          box-shadow: 0 20px 60px rgba(82, 181, 226, 0.28);
          z-index: 1;
          pointer-events: none;
        }

        /* Student Illustration with laptop on pedestal */
        .hhero-student-wrapper {
          position: absolute;
          width: 320px;
          height: 380px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -46%);
          z-index: 2;
          pointer-events: none;
        }

        /* Floating Capsule with CTAs */
        .hhero-cta-capsule {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          padding: 8px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 15;
          box-shadow: 0 10px 30px rgba(0, 50, 80, 0.1);
        }

        .hhero-btn-primary {
          background: #2180A8;
          color: #ffffff;
          padding: 12px 30px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(33, 128, 168, 0.35);
        }

        .hhero-btn-primary:hover {
          background: #196788;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(33, 128, 168, 0.45);
        }

        .hhero-btn-secondary {
          background: rgba(255, 255, 255, 0.7);
          color: #0c374d;
          border: 1.5px solid rgba(12, 55, 77, 0.3);
          padding: 11px 26px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.25s ease;
        }

        .hhero-btn-secondary:hover {
          background: #ffffff;
          border-color: #0c374d;
          transform: translateY(-1px);
        }

        /* Left Side Text */
        .hhero-left-block {
          position: absolute;
          left: 10px;
          top: 38%;
          transform: translateY(-50%);
          max-width: 320px;
          z-index: 10;
        }

        .hhero-left-desc {
          font-size: clamp(17px, 1.6vw, 21px);
          font-weight: 600;
          color: #0c374d;
          line-height: 1.45;
          margin: 0;
        }

        /* Bottom Left Card: 500Cr+ Markets */
        .hhero-card-markets {
          position: absolute;
          left: 0;
          bottom: 45px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          border-radius: 18px;
          padding: 16px 24px;
          box-shadow: 0 10px 28px rgba(0, 50, 80, 0.07);
          z-index: 10;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hhero-card-markets:hover,
        .hhero-card-unemployed:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 34px rgba(0, 50, 80, 0.12);
        }

        /* Top Right Card: 1M+ Students */
        .hhero-card-unemployed {
          position: absolute;
          right: 20px;
          top: 75px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          border-radius: 18px;
          padding: 16px 24px;
          box-shadow: 0 10px 28px rgba(0, 50, 80, 0.07);
          z-index: 10;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hhero-card-stat {
          font-size: 24px;
          font-weight: 850;
          color: #0c374d;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .hhero-card-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #2b617a;
          margin: 0;
        }

        /* Right Rating Block */
        .hhero-rating-block {
          position: absolute;
          right: 25px;
          top: 220px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hhero-stars {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hhero-rating-text {
          font-size: 14.5px;
          font-weight: 600;
          color: #0c374d;
          margin: 0;
        }

        .hhero-rating-text strong {
          font-size: 19px;
          font-weight: 850;
          margin-right: 6px;
        }

        /* Floating animations */
        @keyframes hheroFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes hheroFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }

        .hhero-anim-float-1 {
          animation: hheroFloat1 5.5s ease-in-out infinite;
        }

        .hhero-anim-float-2 {
          animation: hheroFloat2 6.5s ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hhero-stage {
            min-height: auto;
            flex-direction: column;
            gap: 24px;
          }
          .hhero-circle-backdrop {
            position: relative;
            width: 440px;
            height: 440px;
            left: auto;
            top: auto;
            transform: none;
            margin: 20px 0;
          }
          .hhero-student-wrapper {
            width: 250px;
            height: 300px;
          }
          .hhero-left-block,
          .hhero-card-markets,
          .hhero-card-unemployed,
          .hhero-rating-block {
            position: static;
            transform: none !important;
            text-align: center;
            max-width: 100%;
          }
          .hhero-stars {
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .hhero-section {
            padding: 110px 16px 70px;
          }
          .hhero-circle-backdrop {
            width: 320px;
            height: 320px;
          }
          .hhero-student-wrapper {
            width: 190px;
            height: 230px;
          }
          .hhero-cta-capsule {
            gap: 8px;
            padding: 6px 10px;
          }
          .hhero-btn-primary,
          .hhero-btn-secondary {
            padding: 10px 18px;
            font-size: 13.5px;
          }
        }
      `}</style>

      <section className="hhero-section">
        <div className="hhero-container">
          {/* Main Centered Heading */}
          <h1 className="hhero-heading">
            India’s Placement Infrastructure<br />
            For Tier 2/3 Colleges
          </h1>

          {/* Stage Area */}
          <div className="hhero-stage">
            {/* Center: Cyan Backdrop Circle */}
            <div className="hhero-circle-backdrop" />

            {/* Center: Student Sitting With Laptop */}
            <div className="hhero-student-wrapper">
              <Image
                src="/home-img/landing/image.png"
                alt="Student with laptop"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Center: Frosted Glass Pill with Get Started & About Us */}
            <div className="hhero-cta-capsule">
              <Link href="/register" className="hhero-btn-primary">
                Get Started
              </Link>
              <Link href="/about" className="hhero-btn-secondary">
                About Us
              </Link>
            </div>

            {/* Left: Headline Metric Text */}
            <div className="hhero-left-block">
              <p className="hhero-left-desc">
                70% Placements | 5.5L Average<br />
                Salary | 7-Step Structured<br />
                Process
              </p>
            </div>

            {/* Bottom Left Card: 500Cr+ Markets */}
            <div className="hhero-card-markets hhero-anim-float-1">
              <h3 className="hhero-card-stat">500Cr+</h3>
              <p className="hhero-card-label">Markets</p>
            </div>

            {/* Top Right Card: 1M+ Students Annual Unemployed */}
            <div className="hhero-card-unemployed hhero-anim-float-2">
              <h3 className="hhero-card-stat">1M+ Students</h3>
              <p className="hhero-card-label">Annual Unemployed</p>
            </div>

            {/* Right: Star Rating Block */}
            <div className="hhero-rating-block">
              <div className="hhero-stars">
                {/* Star 1 */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0C374D">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {/* Star 2 */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0C374D">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {/* Star 3 */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0C374D">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {/* Star 4 */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0C374D">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {/* Star 5 (White Star with Crisp Navy Border) */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" stroke="#0C374D" strokeWidth="1.6">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <p className="hhero-rating-text">
                <strong>70%</strong>Success Rate
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
