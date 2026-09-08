"use client";

import Image from "next/image";
import Link from "next/link";

export default function CompanyHero() {
  return (
    <>
      <style>{`
        .co-hero-section {
          background-color: #ffffff;
          width: 100%;
          padding: 140px clamp(20px, 6vw, 90px) 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .co-hero-container {
          width: 100%;
          max-width: 1180px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }
        .co-hero-left {
          flex: 1.1;
          min-width: 320px;
        }
        .co-hero-title {
          font-size: clamp(38px, 4.6vw, 58px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .co-title-blue {
          color: #053b50;
        }
        .co-title-dark {
          color: #0f172a;
        }
        .co-hero-subtitle {
          font-size: clamp(15px, 1.35vw, 18px);
          font-weight: 600;
          color: #1e293b;
          line-height: 1.5;
          margin: 36px 0 0 0;
          letter-spacing: -0.01em;
          max-width: 480px;
        }
        .co-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
          padding: 13px 44px;
          border-radius: 9999px;
          background: #2280a8;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(34, 128, 168, 0.28);
          transition: all 0.25s ease;
          border: none;
          cursor: pointer;
        }
        .co-hero-cta:hover {
          background: #19698a;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(34, 128, 168, 0.38);
        }
        .co-hero-right {
          flex: 0.9;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
        }
        .co-hero-illustration {
          width: 100%;
          max-width: 490px;
          height: auto;
          display: block;
          filter: drop-shadow(0 10px 30px rgba(5, 59, 80, 0.05));
          transition: transform 0.4s ease;
        }
        .co-hero-illustration:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 900px) {
          .co-hero-section {
            padding: 110px 24px 50px;
          }
          .co-hero-container {
            flex-direction: column;
            text-align: left;
            gap: 40px;
          }
          .co-hero-left {
            width: 100%;
          }
          .co-hero-right {
            width: 100%;
            justify-content: center;
          }
          .co-hero-illustration {
            max-width: 400px;
          }
        }
      `}</style>

      <section className="co-hero-section">
        <div className="co-hero-container">
          {/* Left Text Column */}
          <div className="co-hero-left">
            <h1 className="co-hero-title">
              <span className="co-title-blue">Hire Pre-Filtered</span>
              <br />
              <span className="co-title-blue">Talent</span>{" "}
              <span className="co-title-dark">From</span>
              <br />
              <span className="co-title-dark">Tier 2/3 Colleges.</span>
            </h1>

            <p className="co-hero-subtitle">
              Curated Candidate Pools | Fast Hiring | Reduced Time to-Hire
            </p>

            <div>
              <Link href="/register" className="co-hero-cta">
                Register
              </Link>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="co-hero-right">
            <Image
              src="/company-img/companies/company-hero-illustration.png"
              alt="Hire Pre-Filtered Talent From Tier 2/3 Colleges"
              width={490}
              height={355}
              priority
              className="co-hero-illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
}
