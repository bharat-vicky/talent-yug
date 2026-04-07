import Image from "next/image";

export default function StudentFeatures() {
  return (
    <>
      <style>{`
        .sft-section {
          position: relative;
          z-index: 11;
          padding: 190px 0 160px;
          background: #FEF2F2;
          height: auto;
          overflow: hidden;
        }

        .sft-bg {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          font-weight: 700;
          color: #B44D4D;
          opacity: 0.66;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .sft-container {
          max-width: 1250px;
          width: 90%;
          margin: 0 auto;
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .sft-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sft-row {
          display: flex;
          gap: 20px;
        }

        /* LIGHT CARD */
        .sft-light {
          position: relative;
          height: 430px;
          padding: 56px;
          border-radius: 28px;
          background: #EE6983;
          color: #ffffff;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .sft-light::before {
          content: "";
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url("/student-img/iuy0.png") no-repeat right 40px bottom 0px;
          background-size: 200px auto;
          opacity: 0.25;
          pointer-events: none;
        }

        /* LIGHTER CARD */
        .sft-lighter {
          background: #FFBABA;
          padding: 40px;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* DARK CARD */
        .sft-dark {
          background: #520000;
          color: #ffffff;
          padding: 70px;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* MID CARD */
        .sft-mid {
          background: #FFBABA;
          color: #6C0202;
          height: 365px;
          flex: 1;
          padding: 40px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        /* TEAL CARD */
        .sft-teal {
          background: #7E0101;
          color: #FFA6A6;
          height: 365px;
          flex: 1;
          padding: 40px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .sft-card-h3 {
          font-size: 32px;
          margin-bottom: 25px;
        }

        .sft-card-ul {
          list-style: disc;
          padding-left: 20px;
          line-height: 1.6;
          font-size: 16px;
        }

        .sft-card:hover {
          transform: translateY(-6px);
        }

        @media (max-width: 1024px) {
          .sft-section { padding: 120px 20px; }
          .sft-container { flex-direction: column; }
          .sft-row { flex-direction: column; }
          .sft-light { height: auto; }
          .sft-mid, .sft-teal { height: auto; }
          .sft-bg { font-size: 90px; }
        }

        @media (max-width: 500px) {
          .sft-section { padding: 60px 0 80px; }
          .sft-bg { font-size: 65px; }
          .sft-card-h3 { font-size: 22px; }
          .sft-card-ul { font-size: 14px; }
        }
      `}</style>

      <section className="sft-section" id="features">
        <div className="sft-bg">Features</div>

        <div className="sft-container">

          {/* LEFT COLUMN */}
          <div className="sft-col">

            {/* Notifications & Alerts — light card */}
            <div className="sft-light">
              <h3 className="sft-card-h3">Notifications &amp;<br /> Alerts</h3>
              <ul className="sft-card-ul">
                <li>Interview scheduled → Get notification</li>
                <li>Offer received → Get notification</li>
                <li>New job matching skills → Get alert</li>
                <li>Company updates → Get notification</li>
              </ul>
            </div>

            {/* Interview Preparation — lighter card */}
            <div className="sft-lighter">
              <h3 className="sft-card-h3" style={{ color: "#520000" }}>Interview Preparation</h3>
              <ul className="sft-card-ul" style={{ color: "#520000" }}>
                <li>Practice mock interviews (role-specific)</li>
                <li>Get instant AI feedback</li>
                <li>Access interview tips &amp; resources</li>
                <li>Submit questions to TalentYug team</li>
              </ul>
              <div style={{ position: "absolute", bottom: 0, right: 10, pointerEvents: "none" }}>
                <Image
                  src="/student-img/sofa.webp"
                  alt=""
                  width={160}
                  height={120}
                  style={{ display: "block", height: "auto" }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="sft-col">

            {/* Job Discovery — dark card */}
            <div className="sft-dark">
              <h3 className="sft-card-h3">Job Discovery</h3>
              <ul className="sft-card-ul">
                <li>Browse all open positions</li>
                <li>Filter by role, company, salary, location</li>
                <li>Save jobs to favourites</li>
                <li>Get job recommendations (AI based)</li>
              </ul>
            </div>

            {/* Row: Profile & Applications + Offers & Acceptance */}
            <div className="sft-row">

              <div className="sft-mid">
                <h3 className="sft-card-h3">Profile &amp;<br />Applications</h3>
                <ul className="sft-card-ul">
                  <li>View/edit student profile</li>
                  <li>See all applications (status: pending, interviewed, offered, rejected)</li>
                  <li>Upload resume/projects</li>
                  <li>Update skills &amp; certifications</li>
                </ul>
              </div>

              <div className="sft-teal">
                <h3 className="sft-card-h3" style={{ color: "#FFA6A6" }}>Offers &amp;<br />Acceptance</h3>
                <ul className="sft-card-ul">
                  <li>View all received offers</li>
                  <li>Compare offers (salary, role, benefits)</li>
                  <li>Accept/reject offers</li>
                  <li>Download offer letter</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
