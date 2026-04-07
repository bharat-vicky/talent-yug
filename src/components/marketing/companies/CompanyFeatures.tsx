import Image from "next/image";

export default function CompanyFeatures() {
  return (
    <>
      <style>{`
        .cft-section {
          position: relative;
          z-index: 11;
          padding: 190px 0 160px;
          background: #E4FBF8;
          height: auto;
          overflow: hidden;
        }

        .cft-bg {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          font-weight: 700;
          color: #2D6F66;
          opacity: 0.66;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .cft-container {
          max-width: 1250px;
          width: 90%;
          margin: 0 auto;
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .cft-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cft-row {
          display: flex;
          gap: 20px;
        }

        /* LIGHT CARD */
        .cft-light {
          position: relative;
          height: 455px;
          padding: 60px;
          border-radius: 28px;
          background: #72D8C4;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .cft-light::before {
          content: "";
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url("/company-img/iuy0.png") no-repeat right 40px bottom 0px;
          background-size: 200px auto;
          opacity: 0.25;
          pointer-events: none;
        }

        /* LIGHTER CARD */
        .cft-lighter {
          background: #A7FFF2;
          padding: 40px;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* DARK CARD */
        .cft-dark {
          background: #004137;
          color: #ffffff;
          padding: 70px;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* MID CARD */
        .cft-mid {
          background: #A7FFF2;
          color: #006556;
          flex: 1;
          padding: 40px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* TEAL CARD */
        .cft-teal {
          background: #07989C;
          color: #f8ffff;
          flex: 1;
          padding: 40px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .cft-card-h3 {
          font-size: 32px;
          margin-bottom: 25px;
        }

        .cft-card-ul {
          list-style: disc;
          padding-left: 20px;
          line-height: 1.6;
          font-size: 16px;
        }

        @media (max-width: 1024px) {
          .cft-section { padding: 120px 20px; }
          .cft-container { flex-direction: column; }
          .cft-row { flex-direction: column; }
          .cft-light { height: auto; }
          .cft-bg { font-size: 90px; }
        }

        @media (max-width: 768px) {
          .cft-section { padding: 80px 16px; }
          .cft-container { width: 100%; }
          .cft-light { padding: 36px; }
          .cft-dark { padding: 36px; }
        }

        @media (max-width: 500px) {
          .cft-section { padding: 60px 12px 80px; }
          .cft-bg { font-size: 60px; }
          .cft-card-h3 { font-size: 22px; }
          .cft-card-ul { font-size: 14px; }
        }
      `}</style>

      <section className="cft-section" id="features">
        <div className="cft-bg">Features</div>

        <div className="cft-container">

          {/* LEFT COLUMN */}
          <div className="cft-col">

            {/* Analytics & Reporting — light card */}
            <div className="cft-light">
              <h3 className="cft-card-h3">Analytics &amp;<br />Reporting</h3>
              <ul className="cft-card-ul">
                <li>Time-to-hire by role/college</li>
                <li>Candidate quality scores — Hiring funnel (Applied → Interviewed → Offered → Accepted → Joined)</li>
                <li>ROI: Cost-per-hire vs traditional recruiting</li>
                <li>College performance (which colleges send best candidates)</li>
              </ul>
            </div>

            {/* Interview Scheduling — lighter card */}
            <div className="cft-lighter">
              <h3 className="cft-card-h3" style={{ color: "#004137" }}>Interview Scheduling</h3>
              <ul className="cft-card-ul" style={{ color: "#004137" }}>
                <li>Auto-schedule interviews (no emails)</li>
                <li>Send interview links (video call integration)</li>
                <li>Set up interview rounds</li>
                <li>Receive candidate confirmations</li>
              </ul>
              <div style={{ position: "absolute", bottom: 0, right: 10, pointerEvents: "none" }}>
                <Image
                  src="/company-img/sofa.webp"
                  alt=""
                  width={160}
                  height={120}
                  style={{ display: "block", height: "auto", width: "auto" }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="cft-col">

            {/* Candidate Management — dark card */}
            <div className="cft-dark">
              <h3 className="cft-card-h3">Candidate Management</h3>
              <ul className="cft-card-ul">
                <li>Browse candidate pool</li>
                <li>Filter by skills, CGPA, location, batch</li>
                <li>View candidate profiles (resume, projects, certifications)</li>
                <li>Shortlist candidates</li>
              </ul>
            </div>

            {/* Row: Offer Management + Job Management */}
            <div className="cft-row">

              <div className="cft-mid">
                <h3 className="cft-card-h3">Offer Management</h3>
                <ul className="cft-card-ul">
                  <li>Generate offer letters (template-based)</li>
                  <li>Send to candidates via platform</li>
                  <li>Track offer acceptance/rejection</li>
                  <li>Manage offers with expiry dates</li>
                </ul>
              </div>

              <div className="cft-teal">
                <h3 className="cft-card-h3">Job Management</h3>
                <ul className="cft-card-ul">
                  <li>Create new job postings</li>
                  <li>View past postings</li>
                  <li>Manage multiple open positions</li>
                  <li>Duplicate &amp; edit templates</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
