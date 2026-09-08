"use client";

import Link from "next/link";

interface PricingPlan {
  id: string;
  badge: string;
  priceLines: string[];
  subtext: string;
  headerBg: string;
  features: string[];
}

const PLANS: PricingPlan[] = [
  {
    id: "commission",
    badge: "Commission",
    priceLines: ["₹15,000 / Hire"],
    subtext: "Pay Only When You Hire",
    headerBg: "#a4c8e8",
    features: [
      "Zero Upfront Cost",
      "Pay Per Successful Hire",
      "Risk-Free Hiring Model",
      "Ideal For Hiring 5–50 Candidates / Year",
    ],
  },
  {
    id: "subscription",
    badge: "Subscription + Commission",
    priceLines: ["₹2L / Year +", "₹10K / Hire"],
    subtext: "Lower Per-Hire Cost",
    headerBg: "#55abce",
    features: [
      "Annual Platform Access",
      "Reduced ₹10K Per Hire",
      "Priority Candidate Matching",
      "Ideal For Hiring 20+ Candidates / Year",
      "Cost Efficient For Growing Companies",
    ],
  },
  {
    id: "enterprise",
    badge: "Enterprise Contract",
    priceLines: ["Custom Pricing"],
    subtext: "For High-Volume Hiring",
    headerBg: "#257291",
    features: [
      "Custom Pricing Based On Volume",
      "Dedicated Account Manager",
      "Priority Candidate Matching",
      "Fast-Track Hiring Support",
      "Ideal For Hiring 50+ Candidates / Year",
    ],
  },
];

export default function CompanyPricing() {
  return (
    <>
      <style>{`
        .cpr-section {
          position: relative;
          background: #ffffff;
          padding: 70px 24px 120px;
          overflow: hidden;
        }

        .cpr-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .cpr-title {
          font-size: clamp(64px, 10vw, 120px);
          font-weight: 800;
          color: #005070;
          line-height: 1;
          letter-spacing: -0.025em;
          margin: 0;
          display: inline-block;
        }

        .cpr-container {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 32px;
        }

        .cpr-card {
          flex: 1;
          max-width: 350px;
          background: #ffffff;
          border-radius: 36px;
          box-shadow: 0 14px 40px rgba(0, 50, 80, 0.08);
          border: 1.5px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }

        .cpr-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(0, 50, 80, 0.15);
        }

        /* Top Module Floating Box */
        .cpr-top-module {
          background: #ffffff;
          border-radius: 32px;
          box-shadow: 0 12px 24px rgba(0, 50, 80, 0.09);
          padding: 10px 10px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Colored Header */
        .cpr-colored-box {
          width: 100%;
          min-height: 180px;
          border-radius: 26px;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cpr-badge {
          align-self: flex-start;
          background: #ffffff;
          color: #0f172a;
          font-size: 13px;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          white-space: nowrap;
        }

        .cpr-price-wrap {
          margin-top: 24px;
        }

        .cpr-price {
          font-size: clamp(26px, 2.2vw, 31px);
          font-weight: 800;
          color: #000000;
          line-height: 1.2;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* Action Area below colored box */
        .cpr-action-area {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 16px 0;
        }

        .cpr-subtext {
          font-size: 13.5px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 16px;
          text-align: center;
        }

        .cpr-btn {
          width: 100%;
          max-width: 250px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 0;
          border-radius: 9999px;
          background: #2280a8;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(34, 128, 168, 0.3);
        }

        .cpr-btn:hover {
          background: #17688c;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(34, 128, 168, 0.45);
        }

        /* Features List Bottom Area */
        .cpr-features-area {
          padding: 30px 28px 40px;
          flex: 1;
        }

        .cpr-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cpr-list li {
          position: relative;
          padding-left: 16px;
          font-size: 13.5px;
          font-weight: 700;
          color: #000000;
          line-height: 1.45;
        }

        .cpr-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 16px;
          color: #000000;
        }

        @media (max-width: 960px) {
          .cpr-container {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          .cpr-card {
            width: 100%;
            max-width: 400px;
          }
        }
      `}</style>

      <section className="cpr-section" id="pricing">
        {/* Pricing Heading */}
        <div className="cpr-header">
          <h2 className="cpr-title">Pricing</h2>
        </div>

        <div className="cpr-container">
          {PLANS.map((plan) => (
            <div key={plan.id} className="cpr-card">
              {/* Top Floating Module */}
              <div className="cpr-top-module">
                <div
                  className="cpr-colored-box"
                  style={{ backgroundColor: plan.headerBg }}
                >
                  <span className="cpr-badge">{plan.badge}</span>
                  <div className="cpr-price-wrap">
                    {plan.priceLines.map((line, idx) => (
                      <h3 key={idx} className="cpr-price">
                        {line}
                      </h3>
                    ))}
                  </div>
                </div>

                <div className="cpr-action-area">
                  <p className="cpr-subtext">{plan.subtext}</p>
                  <Link href="/register" className="cpr-btn">
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Features List */}
              <div className="cpr-features-area">
                <ul className="cpr-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
