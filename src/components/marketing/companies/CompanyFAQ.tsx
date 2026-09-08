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
    q: "What's your candidate quality?",
    a: "Every candidate entering our pooled drives undergoes automated multi-level vetting to guarantee job-readiness:",
    points: [
      "Standardized Technical & Coding Benchmarks: Role-specific tests covering algorithms, system design, and practical programming stacks.",
      "Authenticated Academic Records: CGPA, degree streams, and backlog histories are verified directly with partner university placement cells.",
      "Comprehensive Portfolios: Full visibility into candidate GitHub repositories, live projects, and verified internship credentials.",
    ],
  },
  {
    q: "Which colleges are in your network?",
    a: "TalentYug partners directly with 50+ accredited regional universities and top Tier 2/3 engineering colleges across India:",
    points: [
      "Untapped Regional Talent Hubs: Elite state universities and accredited institutions across Maharashtra, Karnataka, Tamil Nadu, Telangana, and North India.",
      "High-Demand Disciplines: Pre-screened candidates from Computer Science, Artificial Intelligence, Data Science, Electronics, and IT streams.",
      "Dedicated TPO Liaison: Close coordination with campus placement officers guarantees high attendance rates and punctual interview drives.",
    ],
  },
  {
    q: "How fast can we hire?",
    a: "Our digital platform shortens campus recruitment cycles from 6–9 months down to 2–3 weeks:",
    points: [
      "Immediate Candidate Delivery: Receive tailored candidate shortlists matched to your job specs within 48 to 72 hours of posting.",
      "Automated 1-Click Scheduling: Eliminate email ping-pong with calendar-synced interview slots and direct video call links.",
      "Rapid Offer Rollouts: Structured interview scorecards let hiring teams finalize decisions and release digital offer letters in hours.",
    ],
  },
  {
    q: "What's the hiring process?",
    a: "We provide an end-to-end, standardized 6-step recruitment pipeline accessible right from your dashboard:",
    points: [
      "Step 1: Create Job Posting using standardized job parameters, skill requirements, and salary compensation bands.",
      "Step 2: Receive AI-Ranked Candidate Pool matched across our partner college network based on skills and academic fit.",
      "Step 3: Shortlist & Interview with built-in video links and real-time evaluator feedback.",
      "Step 4: Make Digital Offers with automated deadline trackers and transparent salary documentation.",
      "Step 5: Onboard & Track Joining Dates with post-hire feedback loops to measure new employee retention.",
    ],
  },
  {
    q: "Can we post multiple roles?",
    a: "Yes, you can post, manage, and interview for unlimited positions simultaneously:",
    points: [
      "Diverse Role Openings: Hire simultaneously for software development, QA engineering, data analytics, product support, and sales roles.",
      "Reusable Job Templates: Duplicate past job postings in 1 click for seasonal or recurring campus hiring cycles.",
      "Multi-User Hiring Panels: Grant customized access to engineering leads, hiring managers, and HR team members with role-based permissions.",
    ],
  },
  {
    q: "How does pricing work?",
    a: "Our flexible, transparent pricing is tailored to match your specific hiring volume:",
    points: [
      "Commission Model: ₹15,000 per hire with zero upfront cost — pay only when a candidate successfully accepts and joins.",
      "Subscription + Commission: ₹2 Lakhs annual platform fee + reduced ₹10,000 per hire, optimized for growing teams hiring 20+ candidates.",
      "Enterprise Contracts: Volume-tiered pricing with dedicated account managers and customized interview drives for 50+ annual hires.",
    ],
  },
];

export default function CompanyFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <>
      <style>{`
        .cfq-section {
          position: relative;
          background: #ffffff;
          padding: 90px 24px 130px;
          overflow: hidden;
        }

        .cfq-container {
          max-width: 1160px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          gap: 56px;
        }

        /* Left Column */
        .cfq-left {
          flex: 0 0 440px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 40px;
          padding-bottom: 20px;
        }

        .cfq-heading {
          font-size: clamp(38px, 4.4vw, 54px);
          font-weight: 800;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .cfq-heading-accent {
          display: block;
          color: #0284c7;
        }

        .cfq-desc {
          margin-top: auto;
          padding-top: 80px;
          font-size: 17.5px;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.5;
          max-width: 360px;
        }

        /* Right Column (Accordion List) */
        .cfq-right {
          flex: 1;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cfq-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 4px 14px rgba(0, 50, 80, 0.04);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .cfq-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 6px 20px rgba(0, 50, 80, 0.07);
        }

        .cfq-card-open {
          border-color: #b5d5e8;
          box-shadow: 0 8px 24px rgba(34, 128, 168, 0.1);
        }

        .cfq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 16.5px;
          font-weight: 750;
          color: #0f172a;
          gap: 16px;
          transition: color 0.2s ease;
        }

        .cfq-question-btn:hover {
          color: #2280a8;
        }

        .cfq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          font-size: 20px;
          font-weight: 400;
        }

        .cfq-answer-box {
          padding: 0 24px 22px;
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
          animation: faqFadeIn 0.3s ease;
        }

        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cfq-answer-text {
          margin: 0 0 12px;
          font-weight: 500;
        }

        .cfq-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cfq-points li {
          position: relative;
          padding-left: 18px;
          font-size: 13.5px;
          line-height: 1.5;
          color: #334155;
        }

        .cfq-points li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 16px;
          color: #2280a8;
        }

        /* Support Help Card */
        .cfq-support-card {
          margin-top: 10px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px 24px;
          box-shadow: 0 4px 14px rgba(0, 50, 80, 0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cfq-support-title {
          font-size: 15.5px;
          font-weight: 750;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .cfq-support-sub {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .cfq-support-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border-radius: 9999px;
          background: #2280a8;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(34, 128, 168, 0.25);
        }

        .cfq-support-btn:hover {
          background: #19698a;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(34, 128, 168, 0.35);
        }

        @media (max-width: 900px) {
          .cfq-container {
            flex-direction: column;
            gap: 40px;
          }
          .cfq-left {
            flex: none;
            padding-top: 0;
          }
          .cfq-desc {
            padding-top: 24px;
            max-width: 100%;
          }
          .cfq-right {
            max-width: 100%;
          }
        }
      `}</style>

      <section className="cfq-section" id="faq">
        <div className="cfq-container">
          {/* Left Column */}
          <div className="cfq-left">
            <h2 className="cfq-heading">
              Frequently Asked
              <span className="cfq-heading-accent">Questions</span>
            </h2>

            <p className="cfq-desc">
              Here are some common questions about our services to help you
              understand better
            </p>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="cfq-right">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`cfq-card ${isOpen ? "cfq-card-open" : ""}`}
                >
                  <button
                    className="cfq-question-btn"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="cfq-icon">
                      {isOpen ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="cfq-answer-box">
                      <p className="cfq-answer-text">{faq.a}</p>
                      {faq.points && (
                        <ul className="cfq-points">
                          {faq.points.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Have Questions? Support Card */}
            <div className="cfq-support-card">
              <div>
                <h4 className="cfq-support-title">
                  Have Questions? We&apos;re Here to Help!
                </h4>
                <p className="cfq-support-sub">
                  Reach out to our support team for any queries or assistance.
                </p>
              </div>
              <Link href="/register" className="cfq-support-btn">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
