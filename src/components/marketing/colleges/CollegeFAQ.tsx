"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: string;
  points?: string[];
}

const FAQS: FAQItem[] = [
  {
    q: "How do we upload student data?",
    a: "Our college portal offers multiple secure, fast, and structured ways to onboard and manage your student database:",
    points: [
      "Bulk CSV & Excel Upload: Easily import hundreds of student records in minutes with our auto-mapping schema for CGPA, branch, backlogs, and contact information.",
      "Automated Student Verification: Students receive an instant invitation link to review their profile, upload updated resumes, and add verified skill badges.",
      "Real-Time Data Hygiene: Automated validation checks flag duplicate entries, formatting issues, or missing criteria before placement drives begin.",
    ],
  },
  {
    q: "What companies are in your network?",
    a: "TalentYug actively collaborates with 50+ pre-vetted hiring partners spanning diverse industry sectors and hiring tiers:",
    points: [
      "Top Tech & IT Leaders: Leading software product companies and pan-India IT services firms recruiting for software engineers, DevOps, and cloud associates.",
      "High-Growth Startups & Scaleups: Well-funded startups offering high-CTC technical, product, and data analytics roles.",
      "Core Engineering & Business Firms: Established industrial enterprises hiring for mechanical, electrical, electronics, and consulting trainee positions.",
    ],
  },
  {
    q: "How does the AI matching work?",
    a: "Our intelligent matching engine eliminates tedious manual filtering and optimizes campus placement success:",
    points: [
      "Criterion-Based Role Matching: Automatically matches candidate branch, CGPA, graduation batch, and backlog status against recruiter mandates.",
      "Skill-Gap Assessment & Ranking: Analyzes student project repositories, verified coding scores, and certifications to rank candidates by hire-probability.",
      "Precision Candidate Shortlisting: Generates balanced, drive-ready candidate pools so no qualified student gets overlooked in bulk drives.",
    ],
  },
  {
    q: "What's the implementation timeline?",
    a: "Onboarding your institution onto TalentYug is rapid, streamlined, and completed within days:",
    points: [
      "Day 1–2 (Instant Setup & Onboarding): Your placement cell gets dedicated dashboard access, student database import support, and admin role configuration.",
      "Day 3–7 (Orientation & Student Profiles): Automated student invitations, digital QR pass issuance, and initial resume screening.",
      "Week 2 Onward (Active Hiring Drives): Receive incoming recruiter drive requirements, schedule pooled or exclusive interviews, and roll out digital offers.",
    ],
  },
  {
    q: "What support do you provide?",
    a: "We partner end-to-end with your Training & Placement Cell (TPO) to ensure total operational success:",
    points: [
      "Dedicated TPO Relationship Manager: A dedicated account manager assists with scheduling, employer liaison, and on-ground drive coordination.",
      "Pre-Placement Interview Prep: Integrated AI mock interview simulations, company-specific aptitude drills, and resume scoring for students.",
      "Live Drive Technical Assistance: 24/7 technical monitoring during virtual and hybrid assessment tests to ensure seamless student test environments.",
    ],
  },
  {
    q: "Can we integrate with our existing systems?",
    a: "Yes, TalentYug is built to integrate smoothly into your university's existing IT infrastructure:",
    points: [
      "One-Click Data Sync & Webhooks: Export placement reports, student attendance, and offer lists directly to your college ERP or LMS.",
      "Comprehensive Compliance Reports: 1-click export of AICTE, NAAC, and NIRF-ready placement audit spreadsheets and verified statistics.",
      "Zero Infrastructure Friction: Fully cloud-hosted and accessible via standard web browsers with zero on-premise server maintenance required.",
    ],
  },
];

export default function CollegeFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  const renderPoint = (pt: string) => {
    const colonIndex = pt.indexOf(":");
    if (colonIndex !== -1) {
      const title = pt.slice(0, colonIndex + 1);
      const rest = pt.slice(colonIndex + 1);
      return (
        <>
          <strong style={{ color: "#0f172a", fontWeight: 700 }}>{title}</strong>
          {rest}
        </>
      );
    }
    return pt;
  };

  return (
    <>
      <style>{`
        .cfaq-section {
          position: relative;
          background: #ffffff;
          padding: 100px 24px 140px;
          overflow: hidden;
          z-index: 10;
        }

        .cfaq-container {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          gap: 60px;
        }

        /* Left Column */
        .cfaq-left {
          flex: 0 0 440px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 40px;
          padding-bottom: 20px;
        }

        .cfaq-heading {
          font-family: var(--font-serif, "Playfair Display", Georgia, serif);
          font-size: clamp(42px, 5.2vw, 62px);
          font-weight: 800;
          color: #000000;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cfaq-heading-accent {
          display: block;
          color: #0284c7;
          font-family: inherit;
          font-weight: 850;
        }

        .cfaq-desc {
          margin-top: auto;
          padding-top: 80px;
          font-size: 18px;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.45;
          max-width: 380px;
        }

        /* Right Column (Accordion List) */
        .cfaq-right {
          flex: 1;
          max-width: 590px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cfaq-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 4px 14px rgba(0, 50, 80, 0.04);
          overflow: hidden;
          transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.25s ease;
        }

        .cfaq-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 8px 24px rgba(0, 50, 80, 0.08);
          transform: translateY(-2px);
        }

        .cfaq-card:hover .cfaq-question-btn {
          color: #0284c7;
        }

        .cfaq-card:hover .cfaq-icon {
          color: #0284c7;
        }

        .cfaq-card-open {
          border-color: #38bdf8 !important;
          box-shadow: 0 10px 28px rgba(2, 132, 199, 0.12) !important;
        }

        .cfaq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 26px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 17.5px;
          font-weight: 750;
          color: #0f172a;
          gap: 16px;
          transition: color 0.25s ease;
        }

        .cfaq-card-open .cfaq-question-btn {
          color: #0284c7;
        }

        .cfaq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          transition: color 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cfaq-card-open .cfaq-icon {
          color: #0284c7;
        }

        .cfaq-icon-vert {
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        .cfaq-card-open .cfaq-icon-vert {
          transform: rotate(90deg) scale(0);
          opacity: 0;
        }

        /* Bulletproof, universally-supported Accordion Collapse */
        .cfaq-answer-collapse {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 26px 0;
          transition: max-height 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.32s ease,
                      padding 0.35s ease;
          will-change: max-height, opacity;
        }

        .cfaq-card-open .cfaq-answer-collapse {
          max-height: 800px;
          opacity: 1;
          padding: 0 26px 24px;
        }

        .cfaq-answer-text {
          margin: 0 0 14px;
          font-size: 14.5px;
          line-height: 1.6;
          font-weight: 500;
          color: #334155;
        }

        .cfaq-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cfaq-points li {
          position: relative;
          padding-left: 20px;
          font-size: 13.8px;
          line-height: 1.55;
          color: #334155;
        }

        .cfaq-points li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 18px;
          color: #0284c7;
        }

        /* Support Help Card */
        .cfaq-support-card {
          margin-top: 8px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 22px 26px;
          box-shadow: 0 4px 14px rgba(0, 50, 80, 0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cfaq-support-title {
          font-size: 16.5px;
          font-weight: 750;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .cfaq-support-sub {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .cfaq-support-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 26px;
          border-radius: 9999px;
          background: #1e7a9e;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(30, 122, 158, 0.25);
        }

        .cfaq-support-btn:hover {
          background: #166482;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(30, 122, 158, 0.35);
        }

        @media (max-width: 900px) {
          .cfaq-container {
            flex-direction: column;
            gap: 40px;
          }
          .cfaq-left {
            flex: none;
            padding-top: 0;
          }
          .cfaq-desc {
            padding-top: 24px;
            max-width: 100%;
          }
          .cfaq-right {
            max-width: 100%;
          }
        }
      `}</style>

      <section className="cfaq-section" id="faq">
        <div className="cfaq-container">
          {/* Left Column */}
          <div className="cfaq-left">
            <h2 className="cfaq-heading">
              Frequently Asked
              <span className="cfaq-heading-accent">Questions</span>
            </h2>

            <p className="cfaq-desc">
              Here are some common questions about our services to help you
              understand better
            </p>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="cfaq-right">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`cfaq-card ${isOpen ? "cfaq-card-open" : ""}`}
                >
                  <button
                    className="cfaq-question-btn"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    <span className="cfaq-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                          className="cfaq-icon-vert"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className="cfaq-answer-collapse">
                    <p className="cfaq-answer-text">{faq.a}</p>
                    {faq.points && (
                      <ul className="cfaq-points">
                        {faq.points.map((pt, idx) => (
                          <li key={idx}>{renderPoint(pt)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Have Questions? Support Card */}
            <div className="cfaq-support-card">
              <div>
                <h4 className="cfaq-support-title">
                  Have Questions? We&apos;re Here to Help!
                </h4>
                <p className="cfaq-support-sub">
                  Reach out to our support team for any queries or assistance.
                </p>
              </div>
              <Link href="mailto:connect@talentyug.in" className="cfaq-support-btn">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
