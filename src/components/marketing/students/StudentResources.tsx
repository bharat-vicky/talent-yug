"use client";

export default function StudentResources() {
  return (
    <>
      <style>{`
        .sres-section {
          position: relative;
          background: #ffffff;
          padding: 70px 24px 110px;
          overflow: hidden;
          text-align: center;
        }

        .sres-header {
          text-align: center;
          margin-bottom: 44px;
          position: relative;
          z-index: 5;
        }

        .sres-title {
          font-size: clamp(64px, 10vw, 120px);
          font-weight: 800;
          color: #005070;
          line-height: 1;
          letter-spacing: -0.025em;
          margin: 0;
          display: inline-block;
        }

        .sres-wrapper {
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 32px;
          z-index: 2;
        }

        .sres-card {
          flex: 1;
          max-width: 370px;
          background: #ffffff;
          border-radius: 32px;
          border: 1px solid rgba(0, 50, 80, 0.08);
          box-shadow: 0 16px 40px rgba(0, 50, 80, 0.08);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
        }

        .sres-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 55px rgba(0, 50, 80, 0.16);
        }

        /* Upper floating shelf */
        .sres-up {
          background: #ffffff;
          border-radius: 28px;
          margin: 10px;
          padding: 10px 10px 24px 10px;
          box-shadow: 0 10px 25px rgba(0, 50, 80, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top colored banner */
        .sres-top {
          width: 100%;
          border-radius: 22px;
          padding: 24px 20px 32px;
          text-align: left;
          box-sizing: border-box;
        }

        .sres-top-card1 { background: #aacced; }
        .sres-top-card2 { background: #55abce; }
        .sres-top-card3 { background: #257291; }

        .sres-badge {
          background: #ffffff;
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          display: inline-block;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .sres-top h3 {
          font-size: 25px;
          font-weight: 800;
          color: #0f172a;
          margin: 36px 0 0;
          line-height: 1.2;
          letter-spacing: -0.015em;
        }

        /* Subtitle and button container */
        .sres-caption {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 16px 0;
        }

        .sres-sub {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px;
          text-align: center;
        }

        .sres-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2280a8;
          color: #ffffff;
          padding: 10px 36px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 14.5px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(34, 128, 168, 0.3);
        }

        .sres-cta:hover {
          background: #196687;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(34, 128, 168, 0.4);
        }

        /* Lower list section */
        .sres-bottom {
          padding: 24px 32px 36px;
          text-align: left;
          flex: 1;
        }

        .sres-bottom ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sres-bottom li {
          position: relative;
          padding-left: 16px;
          font-size: 13.5px;
          font-weight: 700;
          color: #000000;
          line-height: 1.5;
        }

        .sres-bottom li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 16px;
          color: #000000;
        }

        @media (max-width: 960px) {
          .sres-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 36px;
          }
          .sres-card {
            width: 100%;
            max-width: 400px;
          }
        }
      `}</style>

      <section className="sres-section" id="pricing">
        {/* Clearly visible Resources heading */}
        <div className="sres-header">
          <h2 className="sres-title">Resources</h2>
        </div>

        <div className="sres-wrapper">
          {/* Card 1: Practice Interviews */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-card1">
                <div className="sres-badge">Mock Interview</div>
                <h3>Practice Interviews</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Real Interview Simulation</p>
                <button className="sres-cta">Start Practice</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>Role-Specific Questions (SE, PM, Sales)</li>
                <li>AI Feedback On Answers</li>
                <li>Unlimited Practice</li>
                <li>Interview Timer Simulation</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Interview Tips */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-card2">
                <div className="sres-badge">Preparation Guides</div>
                <h3>Interview Tips</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Smart Preparation Resources</p>
                <button className="sres-cta">Read Guides</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>How To Prepare For Placements</li>
                <li>Top 10 Tech Interview Questions</li>
                <li>Salary Negotiation Tips</li>
                <li>First 30-Day Success Guide</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Company Profiles */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-card3">
                <div className="sres-badge">Company Insights</div>
                <h3>Company Profiles</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Know Before You Apply</p>
                <button className="sres-cta">Explore Companies</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>Company Overview</li>
                <li>Interview Process</li>
                <li>Commonly Asked Questions</li>
                <li>Real Salary Ranges From Past Hires</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
