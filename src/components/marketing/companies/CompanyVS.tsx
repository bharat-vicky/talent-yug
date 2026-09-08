"use client";

const CHALLENGES = [
  "Traditional hiring from Tier 2/3 colleges takes 6–9 months",
  "Limited and inconsistent college partnerships",
  "No standardized hiring pipeline",
  "High recruitment and sourcing costs",
  "Inefficient candidate screening leading to high churn",
];

const SOLUTIONS = [
  "Pre-curated talent pools from 50+ partner colleges",
  "Structured & standardized hiring workflow",
  "Streamlined interview scheduling",
  "Complete audit trail with performance reporting",
  "AI-powered candidate matching for the right fit",
];

export default function CompanyVS() {
  return (
    <>
      <style>{`
        .cvs-section {
          background-color: #ffffff;
          padding: 40px 24px 90px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .cvs-outer-card {
          width: 100%;
          max-width: 1040px;
          background: #edf6fc;
          border: 1.5px solid #d3e7f2;
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 16px 44px rgba(5, 59, 80, 0.07);
          display: flex;
          align-items: stretch;
          gap: 28px;
        }
        .cvs-dark-card {
          background: #053b50;
          border-radius: 18px;
          padding: 36px 28px;
          flex: 0 0 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
        }
        .cvs-dark-title {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0;
          color: #ffffff;
        }
        .cvs-dark-desc {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.88);
          margin: 60px 0 0;
        }
        .cvs-col {
          flex: 1;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
        }
        .cvs-col-title {
          font-size: 20px;
          font-weight: 800;
          color: #053b50;
          line-height: 1.25;
          margin: 0 0 24px;
        }
        .cvs-col-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 18px;
        }
        .cvs-item {
          font-size: 14px;
          font-weight: 600;
          color: #053b50;
          line-height: 1.4;
          margin: 0;
        }
        .cvs-divider {
          width: 1.5px;
          background: #b5d5e8;
          margin: 8px 0;
          align-self: stretch;
        }
        @media (max-width: 860px) {
          .cvs-outer-card {
            flex-direction: column;
            padding: 18px;
            gap: 20px;
          }
          .cvs-dark-card {
            flex: none;
            width: 100%;
            padding: 26px 20px;
          }
          .cvs-dark-desc {
            margin-top: 24px;
          }
          .cvs-divider {
            width: 100%;
            height: 1.5px;
            margin: 4px 0;
          }
          .cvs-col {
            padding: 8px 10px;
          }
        }
      `}</style>

      <section className="cvs-section">
        <div className="cvs-outer-card">
          {/* Left Dark Card */}
          <div className="cvs-dark-card">
            <h3 className="cvs-dark-title">
              Redefining
              <br />
              Campus
              <br />
              Hiring
            </h3>
            <p className="cvs-dark-desc">
              Making hiring smarter, faster, and more transparent with
              TalentYug.
            </p>
          </div>

          {/* Middle Column: Current Hiring Challenges */}
          <div className="cvs-col">
            <h4 className="cvs-col-title">
              Current Hiring
              <br />
              Challenges
            </h4>
            <div className="cvs-col-list">
              {CHALLENGES.map((item, i) => (
                <p key={`challenge-${i}`} className="cvs-item">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="cvs-divider" />

          {/* Right Column: Our Integrated Solution */}
          <div className="cvs-col">
            <h4 className="cvs-col-title">
              Our Integrated
              <br />
              Solution
            </h4>
            <div className="cvs-col-list">
              {SOLUTIONS.map((item, i) => (
                <p key={`solution-${i}`} className="cvs-item">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
