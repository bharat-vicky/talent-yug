import Image from "next/image";

export default function CollegeFeatures() {
  return (
    <>
      <style>{`
        .clf2-section {
          position: relative;
          z-index: 11;
          padding: clamp(80px, 12vw, 210px) 0 clamp(60px, 10vw, 160px);
          background: #FEF2DD;
          overflow: hidden;
          transform: scale(0.85);
          transform-origin: top center;
        }
        .clf2-bg {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(60px, 12vw, 200px);
          font-weight: 700;
          color: #CFAE74;
          opacity: 0.66;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .clf2-container {
          max-width: min(90%, 1250px);
          margin: 0 auto;
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 2;
        }
        .clf2-left, .clf2-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .clf2-row {
          display: flex;
          gap: 20px;
        }
        .clf2-card {
          padding: 40px;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .clf2-card h3 {
          font-size: clamp(22px, 2.5vw, 32px);
          margin-bottom: 25px;
        }
        .clf2-card ul {
          list-style: disc;
          padding-left: 20px;
          line-height: 1.6;
          font-size: 17px;
        }
        .clf2-light { background: #F7E396; color: #987900; height: 430px; padding: 55px; }
        .clf2-light h3 { color: #000; font-size: clamp(28px, 3vw, 40px); }
        .clf2-lighter { background: #FFB976; color: #924700; }
        .clf2-lighter h3 { color: #000; }
        .clf2-dark { background: #5C3B00; color: #fff; height: 270px; }
        .clf2-mid { background: #FFB976; color: #5B2D00; height: 415px; }
        .clf2-mid h3 { color: #8B4400; font-size: clamp(20px, 2vw, 32px); }
        .clf2-mid ul { font-size: 17px; line-height: 1.3; }
        .clf2-teal { background: #FF9F43; color: #3F1F00; height: 415px; }
        .clf2-teal h3 { font-size: clamp(20px, 2vw, 32px); color: #824100; }
        .clf2-card:hover { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.10); transition: all 0.3s ease; }
        @media (max-width: 1024px) {
          .clf2-section { padding: 120px 20px; transform: none !important; }
          .clf2-container { flex-direction: column; }
          .clf2-row { flex-direction: column; }
          .clf2-light, .clf2-mid, .clf2-teal { height: auto; }
          .clf2-bg { font-size: 90px; }
        }
        @media (max-width: 768px) {
          .clf2-section { padding: 80px 16px 60px; }
          .clf2-card { padding: 28px; }
          .clf2-container { width: 100%; }
        }
        @media (max-width: 500px) {
          .clf2-section { padding: 60px 12px 60px; }
          .clf2-bg { font-size: 60px; }
          .clf2-card h3 { font-size: 20px; margin-bottom: 16px; }
          .clf2-card ul { font-size: 14px; }
        }
      `}</style>

      <section className="clf2-section" id="features">
        <div className="clf2-bg">Features</div>

        <div className="clf2-container">
          {/* LEFT COLUMN */}
          <div className="clf2-left">
            {/* Student Management */}
            <div
              className="clf2-card clf2-light"
              style={{
                backgroundImage: "url('/college-img/college/std_c.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 100px bottom 0px",
                backgroundSize: "130px auto",
              }}
            >
              <h3>Student<br />Management</h3>
              <ul>
                <li>Upload student database (CSV import)</li>
                <li>Student profiles (CGPA, skills, preferences)</li>
                <li>Batch management</li>
                <li>Search &amp; filter students</li>
              </ul>
            </div>

            {/* Interview Scheduling */}
            <div className="clf2-card clf2-lighter" style={{ position: "relative" }}>
              <h3>Interview Scheduling</h3>
              <ul>
                <li>Auto-sync with company calendars</li>
                <li>Reminder notifications for students</li>
                <li>Drive management</li>
                <li>Attendance tracking</li>
              </ul>
              <Image
                src="/college-img/sofa.webp"
                alt="Sofa"
                width={200}
                height={140}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 75,
                  maxWidth: "25%",
                  height: "auto",
                  width: "auto",
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="clf2-right">
            {/* Company Network */}
            <div className="clf2-card clf2-dark" style={{ padding: 50 }}>
              <h3>Company Network</h3>
              <ul>
                <li>View all connected companies</li>
                <li>Company details &amp; hiring history</li>
                <li>Job openings from each company</li>
                <li>Company feedback on students</li>
              </ul>
            </div>

            {/* Row: Real-time Analytics + Reporting */}
            <div className="clf2-row">
              <div
                className="clf2-card clf2-mid"
                style={{
                  backgroundImage: "url('/college-img/college/das_c.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 30px bottom 0px",
                  backgroundSize: "220px auto",
                }}
              >
                <h3>Real-time Analytics</h3>
                <ul>
                  <li>Placement funnel</li>
                  <li>Conversion rates</li>
                  <li>Average salary by role/company</li>
                  <li>Placement timeline tracking</li>
                  <li>Department-wise breakdown</li>
                </ul>
              </div>

              <div className="clf2-card clf2-teal">
                <h3>Reporting &amp; Exports</h3>
                <ul>
                  <li>Annual placement reports (PDF)</li>
                  <li>Student outcome tracking</li>
                  <li>Salary certificates</li>
                  <li>AICTE/NAAC compliance reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
