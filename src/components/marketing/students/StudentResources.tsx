export default function StudentResources() {
  return (
    <>
      <style>{`
        .sres-section {
          position: relative;
          padding: 220px 0 160px;
          background: #FEF2F2;
          overflow: hidden;
          text-align: center;
          z-index: 11;
        }

        .sres-bg-text {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          font-weight: 800;
          color: #B44D4D;
          opacity: 0.66;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        .sres-wrapper {
          position: relative;
          max-width: 1200px;
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          gap: 40px;
          z-index: 2;
        }

        .sres-card {
          max-width: 360px;
          flex: 1;
          background: #ffffff;
          border-radius: 38px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          transition: all 0.35s ease;
        }

        .sres-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.18);
        }

        .sres-up {
          background: #ffffff;
          border-radius: 50px;
          padding-bottom: 30px;
          position: relative;
          z-index: 2;
          box-shadow:
            0 10px 10px rgba(0, 0, 0, 0.3),
            0 10px 10px rgba(0, 0, 0, 0.09);
          transition: all 0.3s ease;
        }

        .sres-top {
          padding: 50px 30px 35px;
          border-radius: 35px;
          margin: 10px;
        }

        .sres-top-mint   { background: #EE6983; color: #9F0000; }
        .sres-top-light  { background: #FFBABA; color: #CE0000; }
        .sres-top-dark   { background: #7E0101; color: #FF6B6B; }

        .sres-badge {
          background: #ffffff;
          padding: 8px 22px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 18px;
          color: #000000;
        }

        .sres-top h3 {
          font-size: 32px;
          font-weight: 800;
          margin: 10px 0;
        }

        .sres-caption {
          padding: 0 20px;
        }

        .sres-sub {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 28px;
        }

        .sres-cta {
          display: inline-block;
          margin-top: 10px;
          padding: 16px 80px;
          background: #7E0000;
          color: #ffffff;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: none;
        }

        .sres-cta:hover {
          background: #8e0101;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        .sres-bottom {
          padding: 30px 40px 45px;
          text-align: left;
          background: #ffffff;
        }

        .sres-bottom ul {
          list-style: disc;
          padding-left: 18px;
          line-height: 1.9;
          font-size: 15px;
          color: #000000;
        }

        @media (max-width: 900px) {
          .sres-section { padding: 120px 20px; }
          .sres-wrapper { flex-direction: column; align-items: center; }
          .sres-card { width: 100%; max-width: 420px; }
          .sres-bg-text { font-size: 90px; }
        }

        @media (max-width: 500px) {
          .sres-section { padding: 70px 0 70px; }
          .sres-bg-text { font-size: 65px; }
          .sres-card { border-radius: 25px; }
          .sres-cta { display: block; width: 100%; max-width: 260px; margin: 18px auto; padding: 14px 0; text-align: center; font-size: 14px; }
        }
      `}</style>

      <section className="sres-section" id="priceplan">
        <h1 className="sres-bg-text">Resources</h1>

        <div className="sres-wrapper">

          {/* Mock Interview */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-mint">
                <div className="sres-badge">Mock Interview</div>
                <h3>Practice Interviews</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Real interview simulation</p>
                <button className="sres-cta">Start Practice</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>Role-specific questions (SE, PM, Sales)</li>
                <li>AI feedback on answers</li>
                <li>Unlimited practice</li>
                <li>Interview timer simulation</li>
              </ul>
            </div>
          </div>

          {/* Interview Tips */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-light">
                <div className="sres-badge">Preparation Guides</div>
                <h3>Interview Tips</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Smart preparation resources</p>
                <button className="sres-cta">Read Guides</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>How to prepare for placements</li>
                <li>Top 10 tech interview questions</li>
                <li>Salary negotiation tips</li>
                <li>First 30-day success guide</li>
              </ul>
            </div>
          </div>

          {/* Company Profiles */}
          <div className="sres-card">
            <div className="sres-up">
              <div className="sres-top sres-top-dark">
                <div className="sres-badge">Company Insights</div>
                <h3>Company Profiles</h3>
              </div>
              <div className="sres-caption">
                <p className="sres-sub">Know before you apply</p>
                <button className="sres-cta">Explore Companies</button>
              </div>
            </div>
            <div className="sres-bottom">
              <ul>
                <li>Company overview</li>
                <li>Interview process</li>
                <li>Commonly asked questions</li>
                <li>Real salary ranges from past hires</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
