"use client";

import Link from "next/link";

interface PlanItem {
  name: string;
  price: string;
  subtitle: string;
  color: string;
  features: string[];
}

const PLANS: PlanItem[] = [
  {
    name: "Starter",
    price: "₹2L / Year",
    subtitle: "Best For Small Colleges",
    color: "#AACCED",
    features: [
      "College Size: Under 500 Students",
      "Placement Dashboard",
      "Up To 20 Company Connections",
      "Basic Placement Analytics",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: "₹4L / Year",
    subtitle: "Ideal For Growing Institutions",
    color: "#55ABCE",
    features: [
      "College Size: 500 – 2,000 Students",
      "Up To 50 Company Connections",
      "Advanced Analytics & Reports",
      "Priority Support",
      "Phone + Email Support",
    ],
  },
  {
    name: "Enterprise",
    price: "₹5–6L / Year",
    subtitle: "For Large Institutions & Universities",
    color: "#257291",
    features: [
      "College Size: Above 2,000 Students",
      "Unlimited Company Connections",
      "Custom Analytics & Reporting",
      "Dedicated Account Manager",
      "24/7 Dedicated Support",
    ],
  },
];

export default function CollegePricing() {
  return (
    <>
      <style>{`
        .cp-pricing-section {
          background: #ffffff;
          padding: 60px 20px 180px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .cp-pricing-title {
          font-size: 48px;
          font-weight: 800;
          color: #053B50;
          text-align: center;
          margin: 0 0 60px 0;
          letter-spacing: -0.5px;
        }

        .cp-pricing-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 36px;
        }

        .cp-pricing-card {
          flex: 1;
          max-width: 375px;
          background: #ffffff;
          border-radius: 34px;
          box-shadow: 0 16px 38px rgba(5, 59, 80, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .cp-pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(5, 59, 80, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        /* Upper elevated floating white container */
        .cp-card-upper {
          background: #ffffff;
          border-radius: 30px;
          padding: 12px 12px 26px 12px;
          margin: 0;
          box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 2;
        }

        /* Top colored rounded block */
        .cp-card-header {
          border-radius: 24px;
          padding: 18px 20px 26px;
          min-height: 156px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Pill Badge (Starter / Professional / Enterprise) */
        .cp-badge-chip {
          position: absolute;
          left: 18px;
          top: 16px;
          background: #ffffff;
          color: #000000;
          border-radius: 18px;
          padding: 5px 18px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          letter-spacing: -0.1px;
        }

        /* Price text */
        .cp-price-text {
          font-size: 34px;
          font-weight: 800;
          color: #000000;
          margin: 40px 0 0 0;
          letter-spacing: -0.4px;
          text-align: center;
        }

        /* Subtitle below the colored block */
        .cp-card-subtitle {
          font-size: 14.5px;
          font-weight: 700;
          color: #000000;
          text-align: center;
          margin: 18px 8px 18px 8px;
          line-height: 1.35;
        }

        /* CTA Button */
        .cp-card-cta {
          display: block;
          width: 86%;
          margin: 0 auto;
          padding: 12px 0;
          background: #2280A8;
          color: #ffffff;
          border-radius: 24px;
          text-align: center;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(34, 128, 168, 0.28);
          border: none;
          cursor: pointer;
        }

        .cp-card-cta:hover {
          background: #196f94;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(34, 128, 168, 0.4);
        }

        /* Lower Features List */
        .cp-card-features {
          padding: 28px 30px 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .cp-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cp-feature-item {
          display: flex;
          align-items: flex-start;
          font-size: 14.5px;
          font-weight: 700;
          color: #000000;
          line-height: 1.85;
          margin-bottom: 4px;
        }

        .cp-feature-bullet {
          margin-right: 9px;
          font-size: 16px;
          line-height: 1.6;
          color: #000000;
          user-select: none;
        }

        @media (max-width: 960px) {
          .cp-pricing-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }

          .cp-pricing-card {
            width: 100%;
            max-width: 380px;
          }

          .cp-pricing-title {
            font-size: 34px;
            margin-bottom: 40px;
          }
        }
      `}</style>

      <section className="cp-pricing-section" id="pricing">
        <h2 className="cp-pricing-title">Pricing</h2>

        <div className="cp-pricing-wrapper">
          {PLANS.map((plan) => (
            <div key={plan.name} className="cp-pricing-card">
              {/* Upper elevated floating container */}
              <div className="cp-card-upper">
                {/* Header colored block */}
                <div
                  className="cp-card-header"
                  style={{ backgroundColor: plan.color }}
                >
                  <div className="cp-badge-chip">{plan.name}</div>
                  <h3 className="cp-price-text">{plan.price}</h3>
                </div>

                {/* Subtitle */}
                <div className="cp-card-subtitle">{plan.subtitle}</div>

                {/* CTA Button */}
                <Link href="/register" className="cp-card-cta">
                  Get Started
                </Link>
              </div>

              {/* Lower Section (Bullet Points) */}
              <div className="cp-card-features">
                <ul className="cp-features-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="cp-feature-item">
                      <span className="cp-feature-bullet">•</span>
                      <span>{feat}</span>
                    </li>
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
