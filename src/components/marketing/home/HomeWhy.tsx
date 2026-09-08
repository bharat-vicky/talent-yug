"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function HomeWhy() {
  return (
    <section id="why-placements-fail" className="hwhy-section">
      <style>{`
        .hwhy-section {
          background: #ffffff;
          padding: 120px 24px 140px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
        }

        .hwhy-wrap {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Heading */
        .hwhy-title {
          font-size: clamp(34px, 4.2vw, 52px);
          font-weight: 800;
          color: #0c374d;
          text-align: center;
          line-height: 1.16;
          letter-spacing: -0.02em;
          margin: 0 0 14px 0;
        }

        .hwhy-subtitle {
          font-size: clamp(16px, 1.8vw, 20px);
          color: #1e293b;
          font-weight: 500;
          text-align: center;
          margin: 0 0 54px 0;
        }

        /* 4-Column Grid */
        .hwhy-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .hwhy-span-1 { grid-column: span 1; }
        .hwhy-span-2 { grid-column: span 2; }

        .hwhy-card {
          border-radius: 22px;
          box-shadow: 0 8px 24px rgba(0, 50, 80, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px 28px;
          min-height: 230px;
          position: relative;
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hwhy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 50, 80, 0.1);
        }

        /* Stat numbers */
        .hwhy-stat-num {
          font-size: clamp(44px, 4.4vw, 56px);
          font-weight: 850;
          margin: 0 0 8px 0;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .hwhy-stat-label {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
          margin: 0;
        }

        .hwhy-pill-badge {
          display: block;
          text-align: center;
          padding: 10px 16px;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 750;
          letter-spacing: 0.08em;
          margin-top: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Quote Cards */
        .hwhy-quote-text {
          font-size: 15px;
          line-height: 1.62;
          color: #334155;
          font-weight: 500;
          margin: 0 0 24px 0;
        }

        .hwhy-quote-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .hwhy-quote-footer h4 {
          font-size: 24px;
          font-weight: 800;
          color: #0c374d;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .hwhy-quote-icon-wrap {
          width: 62px;
          height: 62px;
          position: relative;
          flex-shrink: 0;
          mix-blend-mode: multiply;
        }

        /* Banner Card (See How TalentYug Works) */
        .hwhy-card-banner {
          background: #18607D;
          color: #ffffff;
          justify-content: center;
          padding: 32px 28px;
        }

        .hwhy-card-banner h3 {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 12px 0;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .hwhy-card-banner p {
          font-size: 14.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
        }

        /* Role Navigation Cards (Colleges, Students, Companies) */
        .hwhy-role-card {
          background: #DCEEFA;
          text-decoration: none;
          color: inherit;
        }

        .hwhy-role-card h3 {
          font-size: 21px;
          font-weight: 800;
          color: #0c374d;
          margin: 0;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        .hwhy-role-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
        }

        .hwhy-role-footer span {
          font-size: 14.5px;
          font-weight: 600;
          color: #334155;
        }

        .hwhy-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0B3550;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease;
          box-shadow: 0 4px 12px rgba(11, 53, 80, 0.2);
        }

        .hwhy-role-card:hover .hwhy-arrow-btn {
          transform: scale(1.1) rotate(45deg);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hwhy-section {
            padding: 90px 20px 110px;
          }
          .hwhy-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .hwhy-span-1 { grid-column: span 1; }
          .hwhy-span-2 { grid-column: span 2; }
        }

        @media (max-width: 640px) {
          .hwhy-section {
            padding: 70px 16px 90px;
          }
          .hwhy-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .hwhy-span-1, .hwhy-span-2 {
            grid-column: span 1;
          }
          .hwhy-card {
            padding: 24px 22px;
            min-height: auto;
          }
          .hwhy-title {
            margin-bottom: 10px;
          }
          .hwhy-subtitle {
            margin-bottom: 36px;
          }
        }
      `}</style>

      <div className="hwhy-wrap">
        {/* Section Heading & Subtitle */}
        <h2 className="hwhy-title">
          Why Placements Fail In Tier<br />
          2/3 Colleges
        </h2>
        <p className="hwhy-subtitle">
          A Broken System Hurting All Three Stakeholders
        </p>

        {/* 3-Row Grid */}
        <div className="hwhy-grid">
          {/* ================= ROW 1 ================= */}

          {/* Card 1: 50% Talent Crisis */}
          <div className="hwhy-card hwhy-span-1" style={{ background: "#D4EAF7" }}>
            <div>
              <h3 className="hwhy-stat-num" style={{ color: "#0c374d" }}>
                50%
              </h3>
              <p className="hwhy-stat-label" style={{ color: "#1e3a4a" }}>
                Graduates Left Unemployed Post-College
              </p>
            </div>
            <span
              className="hwhy-pill-badge"
              style={{ background: "#0B3550", color: "#ffffff" }}
            >
              TALENT CRISIS
            </span>
          </div>

          {/* Card 2: 3X Process Gap */}
          <div className="hwhy-card hwhy-span-1" style={{ background: "#52A5CC" }}>
            <div>
              <h3 className="hwhy-stat-num" style={{ color: "#ffffff" }}>
                3X
              </h3>
              <p className="hwhy-stat-label" style={{ color: "#ffffff" }}>
                More Time Spent On Manual Placement Work
              </p>
            </div>
            <span
              className="hwhy-pill-badge"
              style={{ background: "#ffffff", color: "#18607D" }}
            >
              PROCESS GAP
            </span>
          </div>

          {/* Card 3: Students Quote */}
          <div className="hwhy-card hwhy-span-2" style={{ background: "#EBF6FD" }}>
            <p className="hwhy-quote-text">
              “Students Miss Opportunities Due To Zero Structured Preparation And Zero
              Visibility. 50% Remain Unemployed Post-Graduation — Not For Lack Of Talent,
              But Lack Of Guidance.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Students</h4>
              <div className="hwhy-quote-icon-wrap">
                <Image
                  src="/home-img/landing/icon_student.jpg"
                  alt="Student Icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* ================= ROW 2 ================= */}

          {/* Card 4: See How TalentYug Works */}
          <div className="hwhy-card hwhy-card-banner hwhy-span-1">
            <h3>See How TalentYug Works</h3>
            <p>Select Your Role To Explore</p>
          </div>

          {/* Card 5: AI-Powered Campus Hiring (Colleges) */}
          <Link
            href="/colleges"
            className="hwhy-card hwhy-role-card hwhy-span-1"
          >
            <h3>AI-Powered Campus Hiring.</h3>
            <div className="hwhy-role-footer">
              <span>For Colleges</span>
              <div className="hwhy-arrow-btn" style={{ background: "#0B3550" }}>
                <ArrowUpRight size={20} color="#ffffff" strokeWidth={2.4} />
              </div>
            </div>
          </Link>

          {/* Card 6: Prepare, Apply, Get Hired (Students) */}
          <Link
            href="/students"
            className="hwhy-card hwhy-role-card hwhy-span-1"
          >
            <h3>Prepare, Apply, Get Hired.</h3>
            <div className="hwhy-role-footer">
              <span>For Students</span>
              <div className="hwhy-arrow-btn" style={{ background: "#0B3550" }}>
                <ArrowUpRight size={20} color="#ffffff" strokeWidth={2.4} />
              </div>
            </div>
          </Link>

          {/* Card 7: Hire Smarter, Hire Faster (Companies) */}
          <Link
            href="/companies"
            className="hwhy-card hwhy-role-card hwhy-span-1"
          >
            <h3 style={{ color: "#0284c7" }}>Hire Smarter, Hire Faster.</h3>
            <div className="hwhy-role-footer">
              <span>For Companies</span>
              <div className="hwhy-arrow-btn" style={{ background: "#1E7A9E" }}>
                <ArrowUpRight size={20} color="#ffffff" strokeWidth={2.4} />
              </div>
            </div>
          </Link>

          {/* ================= ROW 3 ================= */}

          {/* Card 8: Colleges Quote */}
          <div className="hwhy-card hwhy-span-2" style={{ background: "#EBF6FD" }}>
            <p className="hwhy-quote-text">
              “Colleges Manage Placements Via WhatsApp And Excel. No Centralized
              Tracking, No Clarity On Who Got Placed, And Weak Company Coordination.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Colleges</h4>
              <div className="hwhy-quote-icon-wrap">
                <Image
                  src="/home-img/landing/icon_college.jpg"
                  alt="College Icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* Card 9: Companies Quote */}
          <div className="hwhy-card hwhy-span-2" style={{ background: "#EBF6FD" }}>
            <p className="hwhy-quote-text">
              “Companies Receive Unstructured, Inconsistent Candidate Data. Hiring
              Visibility Is Almost Zero, So They Silently Skip Tier-2 Colleges Altogether.”
            </p>
            <div className="hwhy-quote-footer">
              <h4>Companies</h4>
              <div className="hwhy-quote-icon-wrap">
                <Image
                  src="/home-img/landing/icon_company.jpg"
                  alt="Company Icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
