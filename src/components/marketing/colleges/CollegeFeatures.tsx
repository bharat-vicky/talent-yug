"use client";

import Image from "next/image";

export default function CollegeFeatures() {
  return (
    <>
      <style>{`
        .clf-section {
          background-color: #ffffff;
          padding: 40px 24px 170px;
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .clf-container {
          max-width: 1140px;
          margin: 0 auto;
        }
        .clf-title {
          font-size: clamp(52px, 6.5vw, 82px);
          font-weight: 800;
          color: #053b50;
          text-align: center;
          letter-spacing: -0.03em;
          margin: 0 0 52px;
        }
        .clf-grid {
          display: flex;
          gap: 24px;
          align-items: stretch;
        }
        .clf-left-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .clf-right-col {
          flex: 1.05;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Card 1: Student Management */
        .clf-card-student {
          background-color: #c8e4fc;
          border-radius: 24px;
          padding: 34px 30px;
          position: relative;
          overflow: hidden;
          min-height: 275px;
          box-shadow: 0 12px 32px rgba(5, 59, 80, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clf-card-student:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(5, 59, 80, 0.1);
        }

        /* Card 2: Company Network */
        .clf-card-network {
          background-color: #1e6e8c;
          border-radius: 24px;
          padding: 34px 30px;
          color: #ffffff;
          box-shadow: 0 12px 32px rgba(5, 59, 80, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clf-card-network:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(5, 59, 80, 0.14);
        }

        /* Card 3: Interview Scheduling */
        .clf-card-interview {
          background-color: #45a3cb;
          border-radius: 24px;
          padding: 34px 30px;
          position: relative;
          overflow: hidden;
          color: #ffffff;
          min-height: 295px;
          box-shadow: 0 12px 32px rgba(5, 59, 80, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clf-card-interview:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(5, 59, 80, 0.12);
        }

        /* Sub-row for Card 4 & 5 */
        .clf-sub-row {
          display: flex;
          gap: 22px;
          flex: 1;
        }

        /* Card 4: Real-time Analytics */
        .clf-card-analytics {
          flex: 1;
          background-color: #dbeaf5;
          border-radius: 24px;
          padding: 28px 24px 20px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 12px 32px rgba(5, 59, 80, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clf-card-analytics:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(5, 59, 80, 0.1);
        }

        /* Card 5: Reporting & Exports */
        .clf-card-reporting {
          flex: 1;
          background-color: #b6d5ec;
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 12px 32px rgba(5, 59, 80, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clf-card-reporting:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(5, 59, 80, 0.1);
        }

        .clf-card-title-dark {
          font-size: 26px;
          font-weight: 800;
          color: #053b50;
          margin: 0 0 16px;
          line-height: 1.22;
        }
        .clf-card-title-white {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 16px;
          line-height: 1.22;
        }

        .clf-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .clf-bullet-item {
          font-size: 14.5px;
          line-height: 1.45;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .clf-bullet-dot {
          font-weight: 700;
          margin-right: 2px;
        }

        .clf-text-dark {
          color: #1e3a4b;
          font-weight: 500;
        }
        .clf-text-white {
          color: rgba(255, 255, 255, 0.94);
          font-weight: 500;
        }
        .clf-text-light {
          color: #e0f2fe;
          font-weight: 500;
        }

        .clf-content-limit {
          max-width: 62%;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 860px) {
          .clf-grid {
            flex-direction: column;
          }
          .clf-content-limit {
            max-width: 75%;
          }
          .clf-sub-row {
            flex-direction: column;
          }
        }
      `}</style>

      <section className="clf-section" id="features">
        <div className="clf-container">
          <h2 className="clf-title">Features</h2>

          <div className="clf-grid">
            {/* Left Column: Student Management & Interview Scheduling */}
            <div className="clf-left-col">
              {/* Card 1: Student Management */}
              <div className="clf-card-student">
                <div className="clf-content-limit">
                  <h3 className="clf-card-title-dark">
                    Student
                    <br />
                    Management
                  </h3>
                  <ul className="clf-bullet-list clf-text-dark">
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Upload student database (CSV import)</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Student profiles (CGPA, skills, preferences)</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Batch management</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Search & filter students</span>
                    </li>
                  </ul>
                </div>
                {/* Boy with spreadsheet clipboard illustration */}
                <div
                  style={{
                    position: "absolute",
                    right: 14,
                    bottom: 0,
                    width: 148,
                    height: "auto",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src="/college-img/college/std_c.png"
                    alt="Student Management database"
                    width={148}
                    height={230}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>

              {/* Card 3: Interview Scheduling */}
              <div className="clf-card-interview">
                <div className="clf-content-limit">
                  <h3 className="clf-card-title-white">Interview Scheduling</h3>
                  <ul className="clf-bullet-list clf-text-white">
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Auto-sync with company calendars</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Reminder notifications for students</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Drive management</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Attendance tracking</span>
                    </li>
                  </ul>
                </div>
                {/* Person sitting in armchair with laptop illustration */}
                <div
                  style={{
                    position: "absolute",
                    right: 18,
                    bottom: 0,
                    width: 135,
                    height: "auto",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src="/college-img/college/sofa_c.png"
                    alt="Interview Scheduling candidate"
                    width={135}
                    height={155}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Company Network & Sub-row (Analytics & Exports) */}
            <div className="clf-right-col">
              {/* Card 2: Company Network */}
              <div className="clf-card-network">
                <h3 className="clf-card-title-white">Company Network</h3>
                <ul className="clf-bullet-list clf-text-light">
                  <li className="clf-bullet-item">
                    <span className="clf-bullet-dot">•</span>
                    <span>View all connected companies</span>
                  </li>
                  <li className="clf-bullet-item">
                    <span className="clf-bullet-dot">•</span>
                    <span>Company details & hiring history</span>
                  </li>
                  <li className="clf-bullet-item">
                    <span className="clf-bullet-dot">•</span>
                    <span>Job openings from each company</span>
                  </li>
                  <li className="clf-bullet-item">
                    <span className="clf-bullet-dot">•</span>
                    <span>Company feedback on students</span>
                  </li>
                </ul>
              </div>

              {/* Sub-row: Card 4 & Card 5 */}
              <div className="clf-sub-row">
                {/* Card 4: Real-time Analytics */}
                <div className="clf-card-analytics">
                  <div>
                    <h3 className="clf-card-title-dark">
                      Real-time
                      <br />
                      Analytics
                    </h3>
                    <ul className="clf-bullet-list clf-text-dark">
                      <li className="clf-bullet-item">
                        <span className="clf-bullet-dot">•</span>
                        <span>Placement funnel</span>
                      </li>
                      <li className="clf-bullet-item">
                        <span className="clf-bullet-dot">•</span>
                        <span>Conversion rates</span>
                      </li>
                      <li className="clf-bullet-item">
                        <span className="clf-bullet-dot">•</span>
                        <span>Average salary by role/company</span>
                      </li>
                      <li className="clf-bullet-item">
                        <span className="clf-bullet-dot">•</span>
                        <span>Placement timeline tracking</span>
                      </li>
                      <li className="clf-bullet-item">
                        <span className="clf-bullet-dot">•</span>
                        <span>Department-wise breakdown</span>
                      </li>
                    </ul>
                  </div>

                  {/* Character looking at rising bar chart */}
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 140,
                      margin: "16px auto 0",
                      display: "block",
                    }}
                  >
                    <Image
                      src="/college-img/college/das_c.png"
                      alt="Real-time Analytics chart"
                      width={140}
                      height={95}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* Card 5: Reporting & Exports */}
                <div className="clf-card-reporting">
                  <h3 className="clf-card-title-dark">
                    Reporting
                    <br />
                    & Exports
                  </h3>
                  <ul className="clf-bullet-list clf-text-dark">
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Annual placement reports (PDF)</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Student outcome tracking</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>Salary certificates</span>
                    </li>
                    <li className="clf-bullet-item">
                      <span className="clf-bullet-dot">•</span>
                      <span>AICTE/NAAC compliance reports</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
