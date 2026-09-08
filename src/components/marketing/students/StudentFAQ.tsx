"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
  points?: string[];
}

const FAQS: FAQItem[] = [
  {
    q: "How do I register?",
    a: "Registration on TalentYug is quick, seamless, and completely free. You can get started in just three simple steps:",
    points: [
      "Sign up using your college email address or the direct placement invite link provided by your institution.",
      "Complete your student profile by adding your academic records (CGPA/branch), verified technical skills, certifications, and portfolio links.",
      "Generate your unique digital QR Student Pass, which grants you instant access and 1-tap check-in for all on-campus and virtual placement drives.",
    ],
  },
  {
    q: "How many opportunities are available?",
    a: "TalentYug connects students to hundreds of verified hiring opportunities updated weekly across diverse domains and company tiers:",
    points: [
      "Full-time graduate engineer, software developer, and fresher roles across pan-India tech and business hubs.",
      "Stipend-backed summer, winter, and semester internships for pre-final and final-year students.",
      "Exclusive campus placement drives from 500+ partner startups, Fortune 500 enterprises, and IT leaders.",
      "Fast-track skill challenge drives that let high performers interview directly with founding and engineering teams.",
    ],
  },
  {
    q: "How does the matching work?",
    a: "Our intelligent matching engine eliminates irrelevant applications by analyzing your comprehensive profile against real-time recruiter requirements:",
    points: [
      "Automated Eligibility Verification: Matches your branch, CGPA, graduation year, and backlog criteria so you never waste time applying to drives you don't qualify for.",
      "Skill & Project Scoring: Evaluates your GitHub repositories, verified test scores, and project stack to recommend best-fit roles.",
      "Relevance-First Alerts: Delivers tailored drive notifications directly to your dashboard and email, prioritizing roles where your hire-probability is highest.",
    ],
  },
  {
    q: "How do I prepare for interviews?",
    a: "We provide an end-to-end placement preparation suite integrated directly inside your dashboard:",
    points: [
      "AI Mock Interviews: Practice technical and HR rounds with realistic voice/video simulations and receive instant scoring on communication and accuracy.",
      "Company Question Archives: Access real previous-year interview questions and coding problems curated from top hiring companies.",
      "ATS Resume Builder: Optimize your resume with industry-approved templates and ATS keyword scoring to pass automated recruiter screeners.",
      "Aptitude & Coding Sandboxes: Hone your quantitative, logical reasoning, and DSA skills with timed practice tests.",
    ],
  },
  {
    q: "What if I don’t get selected?",
    a: "Rejection is simply data for growth. TalentYug equips you with the feedback and avenues needed to bounce back stronger:",
    points: [
      "Actionable Round Analytics: Receive objective breakdown reports on why a recruiter or assessment stage wasn't cleared.",
      "Personalized Upskilling Paths: Get curated tutorials, coding drills, and project recommendations targeting your identified weak spots.",
      "No Cooldown Penalties: Immediately apply to other active and upcoming placement drives across our network without restriction.",
    ],
  },
  {
    q: "Is there a fee to use?",
    a: "TalentYug is 100% free for all students. Our mission is to democratize career opportunities for every graduate:",
    points: [
      "Zero registration fees, zero subscription costs, and zero hidden platform charges.",
      "We never charge any placement commissions or post-selection cuts from your salary.",
      "All preparation guides, test modules, drive alerts, and digital QR passes are entirely complimentary.",
    ],
  },
];

export default function StudentFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <>
      <style>{`
        .sfq-section {
          position: relative;
          background: #ffffff;
          padding: 80px 24px 120px;
          overflow: hidden;
        }

        .sfq-container {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          gap: 48px;
        }

        /* Left Column */
        .sfq-left {
          flex: 0 0 460px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 100px;
          padding-bottom: 20px;
        }

        .sfq-heading {
          font-size: clamp(40px, 4.8vw, 56px);
          font-weight: 800;
          color: #000000;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .sfq-heading-accent {
          display: inline-block;
          background: linear-gradient(90deg, #00adef 0%, #004d8c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sfq-desc {
          margin-top: auto;
          padding-top: 60px;
          font-size: 19px;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.45;
        }

        /* Right Column (Accordion List) */
        .sfq-right {
          flex: 1;
          max-width: 540px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sfq-item {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid #e8eef3;
          box-shadow: 0 6px 20px rgba(0, 40, 70, 0.05);
          padding: 20px 26px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .sfq-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 40, 70, 0.08);
          border-color: #cbd5e1;
        }

        .sfq-header-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: transparent;
          border: none;
          text-align: left;
          padding: 0;
          cursor: pointer;
          gap: 16px;
        }

        .sfq-question-text {
          font-size: 17px;
          font-weight: 750;
          color: #000000;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .sfq-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: #000000;
        }

        .sfq-answer {
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease;
        }

        .sfq-answer.closed {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
        }

        .sfq-answer.open {
          max-height: 600px;
          opacity: 1;
          margin-top: 12px;
        }

        .sfq-answer-text {
          font-size: 13px;
          line-height: 1.55;
          color: #475569;
          margin: 0;
          max-width: 98%;
        }

        .sfq-points-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sfq-point-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
          line-height: 1.5;
          color: #334155;
        }

        .sfq-point-bullet {
          color: #2280a8;
          font-weight: 800;
          font-size: 15px;
          line-height: 1.2;
          flex-shrink: 0;
        }

        /* Bottom Help Card */
        .sfq-help-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid #e8eef3;
          box-shadow: 0 6px 20px rgba(0, 40, 70, 0.05);
          padding: 22px 26px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 4px;
        }

        .sfq-help-title {
          font-size: 16.5px;
          font-weight: 800;
          color: #000000;
          margin: 0 0 4px;
        }

        .sfq-help-sub {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        .sfq-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2280a8;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(34, 128, 168, 0.25);
          transition: all 0.2s ease;
        }

        .sfq-contact-btn:hover {
          background: #196b8e;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(34, 128, 168, 0.35);
        }

        @media (max-width: 960px) {
          .sfq-container {
            flex-direction: column;
            gap: 40px;
          }
          .sfq-left {
            flex: none;
            width: 100%;
            padding-top: 0;
            padding-bottom: 0;
          }
          .sfq-desc {
            margin-top: 20px;
            padding-top: 0;
          }
          .sfq-right {
            max-width: 100%;
          }
        }

        @media (max-width: 560px) {
          .sfq-help-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .sfq-contact-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section className="sfq-section" id="faq">
        <div className="sfq-container">
          {/* Left Column */}
          <div className="sfq-left">
            <div>
              <h2 className="sfq-heading">
                Frequently Asked<br />
                <span className="sfq-heading-accent">Questions</span>
              </h2>
            </div>

            <p className="sfq-desc">
              Here are some common questions<br />
              about our services to help you<br />
              understand better
            </p>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="sfq-right">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.q}
                  className="sfq-item"
                  onClick={() => toggle(i)}
                >
                  <button
                    className="sfq-header-btn"
                    aria-expanded={isOpen}
                    type="button"
                  >
                    <h3 className="sfq-question-text">{faq.q}</h3>
                    <span className="sfq-icon-wrap">
                      {isOpen ? (
                        <svg width="15" height="3" viewBox="0 0 15 3" fill="none" aria-hidden="true">
                          <rect width="15" height="2.6" rx="1.3" fill="#000000" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                          <rect y="6.2" width="15" height="2.6" rx="1.3" fill="#000000" />
                          <rect x="6.2" width="2.6" height="15" rx="1.3" fill="#000000" />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div className={`sfq-answer ${isOpen ? "open" : "closed"}`}>
                    <p className="sfq-answer-text">{faq.a}</p>
                    {faq.points && faq.points.length > 0 && (
                      <ul className="sfq-points-list">
                        {faq.points.map((pt, idx) => (
                          <li key={idx} className="sfq-point-item">
                            <span className="sfq-point-bullet">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom Help Card */}
            <div className="sfq-help-card">
              <div>
                <h4 className="sfq-help-title">Have Questions? We&apos;re Here to Help!</h4>
                <p className="sfq-help-sub">Reach out to our support team for any queries or assistance.</p>
              </div>
              <a href="#contact" className="sfq-contact-btn">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
