"use client";

import Image from "next/image";
import Link from "next/link";

export default function CollegeHero() {
  return (
    <>
      <style>{`
        .cl-hero-section {
          position: relative;
          background-color: #ffffff;
          width: 100%;
          overflow: hidden;
          padding-top: clamp(100px, 12vw, 140px);
          padding-bottom: clamp(70px, 7vw, 110px);
        }
        .cl-hero-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 56px);
        }
        .cl-hero-left {
          flex: 1.15;
          max-width: 670px;
        }
        .cl-hero-title {
          font-size: clamp(28px, 4.4vw, 58px);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.025em;
          color: #0f172a;
          margin-bottom: 32px;
          word-break: break-word;
        }
        .cl-hero-title .teal-part {
          color: #053b50;
        }
        .cl-hero-features {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 40px;
        }
        .cl-feature-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cl-feature-icon-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #d1e6f1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #1a82b8;
        }
        .cl-feature-text {
          font-size: 17px;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.4;
        }
        .cl-feature-highlight {
          color: #1a82b8;
          font-weight: 700;
          font-size: 18px;
        }
        .cl-feature-bullet {
          color: #1a82b8;
          font-weight: 800;
          margin: 0 6px;
        }
        .cl-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #1a82b8;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 13px 44px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(26, 130, 184, 0.28);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cl-hero-cta:hover {
          background-color: #146c99;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(26, 130, 184, 0.4);
        }
        .cl-hero-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 580px;
          position: relative;
        }
        .cl-hero-img-box {
          position: relative;
          width: 100%;
          max-width: 530px;
          transition: transform 0.4s ease;
        }
        .cl-hero-img-box:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 960px) {
          .cl-hero-container {
            flex-direction: column;
            text-align: left;
            gap: 36px;
            padding: 0 16px;
          }
          .cl-hero-left {
            max-width: 100%;
          }
          .cl-hero-title {
            font-size: clamp(28px, 7vw, 42px);
          }
          .cl-feature-text {
            font-size: 14.5px;
            word-break: break-word;
          }
          .cl-hero-right {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>

      <section className="cl-hero-section">
        <div className="cl-hero-container">
          {/* Left Text Content */}
          <div className="cl-hero-left">
            <h1 className="cl-hero-title">
              Turn Placements
              <br />
              Into <span className="teal-part">Your Competitive</span>
              <br />
              <span className="teal-part">Advantage.</span>
            </h1>

            {/* Feature bullets */}
            <div className="cl-hero-features">
              {/* Feature 1 */}
              <div className="cl-feature-row">
                <div className="cl-feature-icon-badge" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="16" y1="4" x2="20" y2="4" />
                    <line x1="18" y1="2" x2="18" y2="6" />
                  </svg>
                </div>
                <div className="cl-feature-text">
                  <span className="cl-feature-highlight">70%+</span>{" "}
                  Placement Success Rate
                </div>
              </div>

              {/* Feature 2 */}
              <div className="cl-feature-row">
                <div className="cl-feature-icon-badge" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3 2.5 0 4.7-.35 6.2-1" />
                    <path d="M16 19l2 2 4-4" strokeWidth="2.5" />
                  </svg>
                </div>
                <div className="cl-feature-text">
                  Data - Driven
                  <span className="cl-feature-bullet">•</span>
                  Scalable Infrastructure
                </div>
              </div>
            </div>

            {/* Register CTA Button */}
            <div>
              <Link href="/register" className="cl-hero-cta">
                Register
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="cl-hero-right">
            <div className="cl-hero-img-box">
              <Image
                src="/college-img/college/college-hero-illustration.png"
                alt="TalentYug College Placement Advantage Dashboard"
                width={530}
                height={490}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
