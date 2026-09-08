"use client";

const CHALLENGES = [
  "High graduate unemployment rate",
  "Random job applications via portals",
  "Frequent rejections above 90%",
  "Lack of structured preparation",
  "Entry-level salaries averaging ₹2–3L"
];

const SOLUTIONS = [
  "Role-matched job opportunities",
  "Precision job matching system",
  "Mock interview preparation",
  "Expert tips & learning resources",
  "Real-time application tracking"
];

export default function StudentVS() {
  return (
    <>
      <style>{`
        .sc-section {
          background-color: #ffffff;
          padding: 40px 24px 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .sc-outer-card {
          width: 100%;
          max-width: 1020px;
          background: #edf6fc;
          border: 1.5px solid #d3e7f2;
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 16px 44px rgba(8, 55, 77, 0.07);
          display: flex;
          align-items: stretch;
          gap: 24px;
        }
        .sc-dark-card {
          background: #08374d;
          border-radius: 18px;
          padding: 36px 28px;
          flex: 0 0 240px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
        }
        .sc-dark-title {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
          color: #ffffff;
        }
        .sc-dark-desc {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.88);
          margin: 50px 0 0;
        }
        .sc-col {
          flex: 1;
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
        }
        .sc-col-title {
          font-size: 20px;
          font-weight: 800;
          color: #08374d;
          line-height: 1.25;
          margin: 0 0 24px;
        }
        .sc-col-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 20px;
        }
        .sc-item {
          font-size: 14px;
          font-weight: 600;
          color: #08374d;
          line-height: 1.35;
          margin: 0;
        }
        .sc-divider {
          width: 1.5px;
          background: #b5d5e8;
          margin: 8px 0;
          align-self: stretch;
        }
        @media (max-width: 860px) {
          .sc-outer-card {
            flex-direction: column;
            padding: 18px;
            gap: 20px;
          }
          .sc-dark-card {
            flex: none;
            width: 100%;
            padding: 26px 20px;
          }
          .sc-dark-desc {
            margin-top: 24px;
          }
          .sc-divider {
            width: 100%;
            height: 1.5px;
            margin: 4px 0;
          }
          .sc-col {
            padding: 8px 12px;
          }
        }
      `}</style>

      <section className="sc-section">
        <div className="sc-outer-card">
          {/* Left Dark Card */}
          <div className="sc-dark-card">
            <h3 className="sc-dark-title">
              From Campus<br />
              to Career<br />
              Excellence
            </h3>
            <p className="sc-dark-desc">
              Your bridge from<br />
              learning to earning<br />
              with TalentYug.
            </p>
          </div>

          {/* Middle Column: Current Career Challenges */}
          <div className="sc-col">
            <h4 className="sc-col-title">
              Current Career<br />
              Challenges
            </h4>
            <div className="sc-col-list">
              {CHALLENGES.map((item, i) => (
                <p key={`challenge-${i}`} className="sc-item">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="sc-divider" />

          {/* Right Column: Our Integrated Solution */}
          <div className="sc-col">
            <h4 className="sc-col-title">
              Our Integrated<br />
              Solution
            </h4>
            <div className="sc-col-list">
              {SOLUTIONS.map((item, i) => (
                <p key={`solution-${i}`} className="sc-item">
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
