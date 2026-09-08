"use client";

import Image from "next/image";

export default function CompanyFeatures() {
  return (
    <>
      <style>{`
        .cf-section {
          position: relative;
          background: #ffffff;
          padding: 60px 24px 100px;
          overflow: hidden;
        }

        .cf-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 5;
        }

        .cf-title {
          font-size: clamp(64px, 10vw, 120px);
          font-weight: 800;
          color: #005070;
          line-height: 1;
          letter-spacing: -0.025em;
          margin: 0;
          display: inline-block;
        }

        .cf-container {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .cf-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cf-card {
          border-radius: 28px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 50, 80, 0.12);
        }

        /* Card 1: Analytics & Reporting */
        .cf-card-analytics {
          background: #cae5ff;
          padding: 38px 32px;
          min-height: 380px;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }

        .cf-analytics-copy {
          flex: 1;
          max-width: 320px;
          z-index: 2;
        }

        .cf-analytics-title {
          font-size: 28px;
          font-weight: 800;
          color: #004868;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .cf-chart-wrapper {
          position: relative;
          width: 175px;
          min-height: 270px;
          align-self: flex-end;
          flex-shrink: 0;
          z-index: 2;
        }

        /* Card 2: Interview Scheduling */
        .cf-card-interview {
          background: #55abce;
          padding: 38px 32px;
          min-height: 380px;
          position: relative;
          overflow: hidden;
        }

        .cf-interview-title {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .cf-sofa-wrapper {
          position: absolute;
          bottom: 0;
          right: 20px;
          width: 145px;
          height: 165px;
          pointer-events: none;
          z-index: 2;
        }

        /* Card 3: Candidate Management */
        .cf-card-candidate {
          background: #257291;
          padding: 40px 36px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .cf-candidate-title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        /* Bottom Row */
        .cf-bottom-row {
          display: flex;
          gap: 24px;
        }

        /* Card 4: Offer Management */
        .cf-card-offer {
          background: #deeefe;
          padding: 36px 26px;
          flex: 1;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .cf-offer-title {
          font-size: 24px;
          font-weight: 800;
          color: #1f6a89;
          line-height: 1.25;
          margin: 0 0 24px;
        }

        /* Card 5: Job Management */
        .cf-card-job {
          background: #aacced;
          padding: 36px 26px;
          flex: 1;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .cf-job-title {
          font-size: 24px;
          font-weight: 800;
          color: #1f6a89;
          line-height: 1.25;
          margin: 0 0 24px;
        }

        /* Custom bullet lists */
        .cf-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cf-list li {
          position: relative;
          padding-left: 16px;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.45;
        }

        .cf-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 16px;
        }

        .cf-list-sm li {
          font-size: 13.5px;
          line-height: 1.4;
          gap: 10px;
        }

        @media (max-width: 960px) {
          .cf-container {
            flex-direction: column;
          }
          .cf-card-analytics,
          .cf-card-interview,
          .cf-card-candidate,
          .cf-card-offer,
          .cf-card-job {
            min-height: auto;
          }
          .cf-sofa-wrapper {
            position: relative;
            bottom: auto;
            right: auto;
            margin-top: 16px;
            align-self: flex-end;
          }
        }

        @media (max-width: 600px) {
          .cf-bottom-row {
            flex-direction: column;
          }
          .cf-card-analytics {
            flex-direction: column;
            gap: 20px;
          }
          .cf-chart-wrapper {
            align-self: center;
            width: 150px;
            min-height: 220px;
          }
        }
      `}</style>

      <section className="cf-section" id="features">
        {/* Features heading */}
        <div className="cf-header">
          <h2 className="cf-title">Features</h2>
        </div>

        <div className="cf-container">
          {/* LEFT COLUMN */}
          <div className="cf-col">
            {/* Card 1: Analytics & Reporting */}
            <div className="cf-card cf-card-analytics">
              <div className="cf-analytics-copy">
                <h3 className="cf-analytics-title">
                  Analytics &amp;
                  <br />
                  Reporting
                </h3>
                <ul className="cf-list" style={{ color: "#004868" }}>
                  <li>Time-to-hire by role/college</li>
                  <li>
                    Candidate quality scores - Hiring funnel (Applied → Interviewed → Offered → Accepted → Joined)
                  </li>
                  <li>ROI: Cost-per-hire vs traditional recruiting</li>
                  <li>College performance (which colleges send best candidates)</li>
                </ul>
              </div>

              <div className="cf-chart-wrapper">
                <Image
                  src="/student-img/iuy0.png"
                  alt="Analytics and Reporting"
                  fill
                  style={{ objectFit: "contain", objectPosition: "bottom right" }}
                />
              </div>
            </div>

            {/* Card 2: Interview Scheduling */}
            <div className="cf-card cf-card-interview">
              <h3 className="cf-interview-title">Interview Scheduling</h3>
              <ul
                className="cf-list"
                style={{
                  color: "#ffffff",
                  maxWidth: "340px",
                  zIndex: 3,
                  position: "relative",
                }}
              >
                <li>Auto-schedule interviews (no emails)</li>
                <li>Send interview links (video call integration)</li>
                <li>Set up interview rounds</li>
                <li>Receive candidate confirmations</li>
              </ul>

              <div className="cf-sofa-wrapper">
                <Image
                  src="/student-img/sofa.webp"
                  alt="Interview Scheduling with video call"
                  fill
                  style={{ objectFit: "contain", objectPosition: "bottom right" }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="cf-col">
            {/* Card 3: Candidate Management */}
            <div className="cf-card cf-card-candidate">
              <h3 className="cf-candidate-title">Candidate Management</h3>
              <ul className="cf-list" style={{ color: "#ffffff" }}>
                <li>Browse candidate pool</li>
                <li>Filter by skills, CGPA, location, batch</li>
                <li>View candidate profiles (resume, projects, certifications)</li>
                <li>Shortlist candidates</li>
              </ul>
            </div>

            {/* Bottom Row: Offer Management & Job Management */}
            <div className="cf-bottom-row">
              {/* Card 4: Offer Management */}
              <div className="cf-card cf-card-offer">
                <h3 className="cf-offer-title">
                  Offer
                  <br />
                  Management
                </h3>
                <ul className="cf-list cf-list-sm" style={{ color: "#1f6a89" }}>
                  <li>Generate offer letters (template-based)</li>
                  <li>Send to candidates via platform</li>
                  <li>Track offer acceptance/rejection</li>
                  <li>Manage offers with expiry dates</li>
                </ul>
              </div>

              {/* Card 5: Job Management */}
              <div className="cf-card cf-card-job">
                <h3 className="cf-job-title">
                  Job
                  <br />
                  Management
                </h3>
                <ul className="cf-list cf-list-sm" style={{ color: "#1f6a89" }}>
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
