export default function CollegePricing() {
  return (
    <>
      <style>{`
        .clp2-section {
          position: relative;
          padding: 220px 0 160px;
          background: #FEF2DD;
          overflow: hidden;
          text-align: center;
          z-index: 11;
          transform: scale(0.95);
          transform-origin: top center;
        }

        .clp2-bg-text {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          font-weight: 800;
          color: #CFAE74;
          opacity: 0.66;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        .clp2-wrapper {
          position: relative;
          max-width: 1200px;
          margin: auto;
          display: flex;
          justify-content: center;
          gap: 40px;
          z-index: 2;
        }

        .clp2-card {
          max-width: 360px;
          background: #ffffff;
          border-radius: 38px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          transition: all 0.35s ease;
          flex: 1;
        }

        .clp2-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.18);
        }

        .clp2-up {
          background: #ffffff;
          border-radius: 50px;
          padding-bottom: 30px;
          margin: 0px;
          position: relative;
          z-index: 2;
          box-shadow:
            0 10px 10px rgba(0, 0, 0, 0.3),
            0 10px 10px rgba(0, 0, 0, 0.09);
          transition: all 0.3s ease;
        }

        .clp2-top {
          padding: 50px 30px 35px;
          border-radius: 35px;
          margin: 10px;
        }

        .clp2-top-mint   { background: #F7E396; color: #000000; }
        .clp2-top-orange { background: #FF9F43; color: #000000; }
        .clp2-top-dark   { background: #FFB976; color: #000000; }

        .clp2-badge {
          background: #ffffff;
          padding: 8px 22px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 18px;
        }

        .clp2-top h3 {
          font-size: 32px;
          font-weight: 800;
          margin: 10px 0;
        }

        .clp2-caption {
          padding: 0 20px;
        }

        .clp2-sub {
          font-size: 19px;
          font-weight: 500;
          margin-bottom: 28px;
        }

        .clp2-cta {
          display: inline-block;
          margin-top: 10px;
          padding: 16px 80px;
          background: #FF9700;
          color: #000000;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: none;
        }

        .clp2-cta:hover {
          background: #e38f12;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        .clp2-bottom {
          padding: 30px 40px 45px;
          text-align: left;
          background: #ffffff;
        }

        .clp2-bottom ul {
          list-style: disc;
          padding-left: 18px;
          line-height: 1.9;
          font-size: 15px;
          color: #000000;
        }

        @media (max-width: 900px) {
          .clp2-section {
            padding: 120px 20px;
            transform: none;
          }
          .clp2-wrapper {
            flex-direction: column;
            align-items: center;
          }
          .clp2-card {
            width: 100%;
            max-width: 420px;
          }
          .clp2-bg-text {
            font-size: 90px;
          }
        }

        @media (max-width: 500px) {
          .clp2-section { padding: 70px 0 70px; }
          .clp2-bg-text { font-size: 65px; }
          .clp2-card { border-radius: 25px; }
          .clp2-cta {
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

      <section className="clp2-section">
        <h1 className="clp2-bg-text">Pricing plans</h1>

        <div className="clp2-wrapper">

          {/* Starter */}
          <div className="clp2-card">
            <div className="clp2-up">
              <div className="clp2-top clp2-top-mint">
                <div className="clp2-badge">Starter</div>
                <h3>₹2L / year</h3>
              </div>
              <div className="clp2-caption">
                <p className="clp2-sub">Best for small colleges</p>
                <button className="clp2-cta">Get Started</button>
              </div>
            </div>
            <div className="clp2-bottom">
              <ul>
                <li>College Size: Under 500 students</li>
                <li>Placement dashboard</li>
                <li>Up to 20 company connections</li>
                <li>Basic placement analytics</li>
                <li>Email support</li>
              </ul>
            </div>
          </div>

          {/* Professional */}
          <div className="clp2-card">
            <div className="clp2-up">
              <div className="clp2-top clp2-top-orange">
                <div className="clp2-badge">Professional</div>
                <h3>₹4L / year</h3>
              </div>
              <div className="clp2-caption">
                <p className="clp2-sub">Ideal for growing institutions</p>
                <button className="clp2-cta">Get Started</button>
              </div>
            </div>
            <div className="clp2-bottom">
              <ul>
                <li>College Size: 500 – 2,000 students</li>
                <li>Up to 50 company connections</li>
                <li>Advanced analytics &amp; reports</li>
                <li>Priority support</li>
                <li>Phone + Email support</li>
              </ul>
            </div>
          </div>

          {/* Enterprise */}
          <div className="clp2-card">
            <div className="clp2-up">
              <div className="clp2-top clp2-top-dark">
                <div className="clp2-badge">Enterprise</div>
                <h3>₹5–6L / year</h3>
              </div>
              <div className="clp2-caption">
                <p className="clp2-sub">For large institutions &amp; universities</p>
                <button className="clp2-cta">Get Started</button>
              </div>
            </div>
            <div className="clp2-bottom">
              <ul>
                <li>College Size: Above 2,000 students</li>
                <li>Unlimited company connections</li>
                <li>Custom analytics &amp; reporting</li>
                <li>Dedicated account manager</li>
                <li>24/7 dedicated support</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
