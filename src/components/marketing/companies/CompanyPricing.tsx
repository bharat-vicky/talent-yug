export default function CompanyPricing() {
  return (
    <>
      <style>{`
        .cpr-section {
          position: relative;
          padding: 220px 0 160px;
          background: #E4FBF8;
          overflow: hidden;
          text-align: center;
          z-index: 11;
        }

        .cpr-bg-text {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          font-weight: 800;
          color: #2D6F66;
          opacity: 0.66;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        .cpr-wrapper {
          position: relative;
          max-width: 1200px;
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          gap: 40px;
          z-index: 2;
        }

        .cpr-card {
          max-width: 360px;
          flex: 1;
          background: #ffffff;
          border-radius: 38px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          transition: all 0.35s ease;
        }

        .cpr-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.18);
        }

        .cpr-up {
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

        .cpr-top {
          padding: 50px 30px 35px;
          border-radius: 35px;
          margin: 10px;
        }

        .cpr-top-mint   { background: #7AE2CF; }
        .cpr-top-light  { background: #A7FFF2; }
        .cpr-top-dark   { background: #07989C; color: #000000; }

        .cpr-badge {
          background: #ffffff;
          padding: 8px 22px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 18px;
          color: #000000;
        }

        .cpr-top h3 {
          font-size: 30px;
          font-weight: 800;
          margin: 10px 0;
          color: #000000;
        }

        .cpr-caption {
          padding: 0 20px;
        }

        .cpr-sub {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 28px;
          color: #000000;
        }

        .cpr-cta {
          display: inline-block;
          margin-top: 30px;
          padding: 16px 100px;
          background: #006F5F;
          color: #ffffff;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: none;
        }

        .cpr-cta:hover {
          background: #0FB79C;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        .cpr-bottom {
          padding: 30px 40px 45px;
          text-align: left;
          background: #ffffff;
        }

        .cpr-bottom ul {
          list-style: disc;
          padding-left: 18px;
          line-height: 1.9;
          font-size: 15px;
          color: #000000;
        }

        @media (max-width: 900px) {
          .cpr-section { padding: 120px 20px; }
          .cpr-wrapper { flex-direction: column; align-items: center; }
          .cpr-card { width: 100%; max-width: 420px; }
          .cpr-bg-text { font-size: 90px; }
        }

        @media (max-width: 500px) {
          .cpr-section { padding: 70px 0 70px; }
          .cpr-bg-text { font-size: 65px; }
          .cpr-card { border-radius: 25px; }
          .cpr-cta {
            display: block;
            width: 100%;
            max-width: 260px;
            margin: 18px auto;
            padding: 14px 0;
            text-align: center;
            font-size: 14px;
          }
        }
      `}</style>

      <section className="cpr-section" id="priceplan">
        <h1 className="cpr-bg-text">Pricing Plans</h1>

        <div className="cpr-wrapper">

          {/* Commission */}
          <div className="cpr-card">
            <div className="cpr-up">
              <div className="cpr-top cpr-top-mint">
                <div className="cpr-badge">Commission</div>
                <h3>₹15,000 / Hire</h3>
              </div>
              <div className="cpr-caption">
                <p className="cpr-sub">Pay Only When You Hire</p>
                <button className="cpr-cta">Get Started</button>
              </div>
            </div>
            <div className="cpr-bottom">
              <ul>
                <li>Zero Upfront Cost</li>
                <li>Pay Per Successful Hire</li>
                <li>Risk-Free Hiring Model</li>
                <li>Ideal For Hiring 5–50 Candidates / Year</li>
              </ul>
            </div>
          </div>

          {/* Subscription + Commission */}
          <div className="cpr-card">
            <div className="cpr-up">
              <div className="cpr-top cpr-top-light">
                <div className="cpr-badge">Subscription + Commission</div>
                <h3>₹2L / Year + ₹10K / Hire</h3>
              </div>
              <div className="cpr-caption">
                <p className="cpr-sub">Lower Per-Hire Cost</p>
                <button className="cpr-cta">Get Started</button>
              </div>
            </div>
            <div className="cpr-bottom">
              <ul>
                <li>Annual Platform Access</li>
                <li>Reduced ₹10K Per Hire</li>
                <li>Priority Candidate Matching</li>
                <li>Ideal For Hiring 20+ Candidates / Year</li>
                <li>Cost Efficient For Growing Companies</li>
              </ul>
            </div>
          </div>

          {/* Enterprise Contract */}
          <div className="cpr-card">
            <div className="cpr-up">
              <div className="cpr-top cpr-top-dark">
                <div className="cpr-badge">Enterprise Contract</div>
                <h3>Custom Pricing</h3>
              </div>
              <div className="cpr-caption">
                <p className="cpr-sub">For High-Volume Hiring</p>
                <button className="cpr-cta">Get Started</button>
              </div>
            </div>
            <div className="cpr-bottom">
              <ul>
                <li>Custom Pricing Based On Volume</li>
                <li>Dedicated Account Manager</li>
                <li>Priority Candidate Matching</li>
                <li>Fast-Track Hiring Support</li>
                <li>Ideal For Hiring 50+ Candidates / Year</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
