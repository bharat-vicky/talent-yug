"use client";

const CHALLENGES = [
  "Manual Placement Processes (Excel/WhatsApp)",
  "Lack of Analytics and Optimization",
  "Weak Network Infrastructure",
  "50–60% placement success rate",
  "Unstructured student preparation",
];

const SOLUTIONS = [
  "Structured 7-step placement model",
  "Real-Time Company & Student Data",
  "Unified digital dashboard",
  "AI-powered talent matching",
  "Integrated interview and prep support",
];

export default function CollegeVS() {
  return (
    <>
      <style>{`
        .clvs-section {
          background-color: #ffffff;
          padding: 40px 24px 160px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .clvs-outer-card {
          width: 100%;
          max-width: 1120px;
          background: #edf6fc;
          border: 1.5px solid #d3e7f2;
          border-radius: 30px;
          padding: 28px;
          box-shadow: 0 18px 48px rgba(5, 59, 80, 0.08);
          display: flex;
          align-items: stretch;
          gap: 32px;
        }
        .clvs-dark-card {
          background: #053b50;
          border-radius: 20px;
          padding: 40px 30px;
          flex: 0 0 265px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
        }
        .clvs-dark-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0;
          color: #ffffff;
          letter-spacing: -0.2px;
        }
        .clvs-dark-desc {
          font-size: 15px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.9);
          margin: 64px 0 0;
        }
        .clvs-col {
          flex: 1;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
        }
        .clvs-col-title {
          font-size: 22px;
          font-weight: 800;
          color: #053b50;
          line-height: 1.25;
          margin: 0 0 24px;
          letter-spacing: -0.2px;
        }
        .clvs-col-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 18px;
        }
        .clvs-item {
          font-size: 15px;
          font-weight: 600;
          color: #053b50;
          line-height: 1.45;
          margin: 0;
        }
        .clvs-divider {
          width: 1.5px;
          background: #b5d5e8;
          margin: 8px 0;
          align-self: stretch;
        }
        @media (max-width: 860px) {
          .clvs-outer-card {
            flex-direction: column;
            padding: 18px;
            gap: 20px;
          }
          .clvs-dark-card {
            flex: none;
            width: 100%;
            padding: 26px 20px;
          }
          .clvs-dark-desc {
            margin-top: 24px;
          }
          .clvs-divider {
            width: 100%;
            height: 1.5px;
            margin: 4px 0;
          }
          .clvs-col {
            padding: 8px 10px;
          }
        }
      `}</style>

      <section className="clvs-section">
        <div className="clvs-outer-card">
          {/* Left Dark Card */}
          <div className="clvs-dark-card">
            <h3 className="clvs-dark-title">
              Redefining
              <br />
              Campus
              <br />
              Placements
            </h3>
            <p className="clvs-dark-desc">
              Making hiring smarter, faster, and more transparent with
              TalentYug.
            </p>
          </div>

          {/* Middle Column: Current Placement Challenges */}
          <div className="clvs-col">
            <h4 className="clvs-col-title">
              Current Placement
              <br />
              Challenges
            </h4>
            <div className="clvs-col-list">
              {CHALLENGES.map((item, idx) => (
                <p key={idx} className="clvs-item">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="clvs-divider" aria-hidden="true" />

          {/* Right Column: Our Integrated Solution */}
          <div className="clvs-col">
            <h4 className="clvs-col-title">
              Our Integrated
              <br />
              Solution
            </h4>
            <div className="clvs-col-list">
              {SOLUTIONS.map((item, idx) => (
                <p key={idx} className="clvs-item">
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
