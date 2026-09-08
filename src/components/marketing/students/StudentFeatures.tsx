"use client";

import Image from "next/image";

export default function StudentFeatures() {
  return (
    <>
      <style>{`
        .sf-section {
          position: relative;
          background: #ffffff;
          padding: 60px 24px 100px;
          overflow: hidden;
        }

        .sf-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 5;
        }

        .sf-title {
          font-size: clamp(64px, 10vw, 120px);
          font-weight: 800;
          color: #005070;
          line-height: 1;
          letter-spacing: -0.025em;
          margin: 0;
          display: inline-block;
        }

        .sf-container {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .sf-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sf-card {
          border-radius: 28px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .sf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 50, 80, 0.12);
        }

        /* Card 1: Notifications & Alerts */
        .sf-card-notifications {
          background: #cae5ff;
          padding: 38px 32px;
          min-height: 380px;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }

        .sf-notif-copy {
          flex: 1;
          max-width: 290px;
          z-index: 2;
        }

        .sf-notif-title {
          font-size: 28px;
          font-weight: 800;
          color: #004868;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .sf-chart-wrapper {
          position: relative;
          width: 175px;
          min-height: 270px;
          align-self: flex-end;
          flex-shrink: 0;
          z-index: 2;
        }

        /* Card 2: Interview Preparation */
        .sf-card-interview {
          background: #55abce;
          padding: 38px 32px;
          min-height: 380px;
          position: relative;
          overflow: hidden;
        }

        .sf-interview-title {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .sf-sofa-wrapper {
          position: absolute;
          bottom: 0;
          right: 20px;
          width: 145px;
          height: 165px;
          pointer-events: none;
          z-index: 2;
        }

        /* Card 3: Job Discovery */
        .sf-card-discovery {
          background: #257291;
          padding: 40px 36px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .sf-discovery-title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        /* Bottom Row */
        .sf-bottom-row {
          display: flex;
          gap: 24px;
        }

        /* Card 4: Profile & Applications */
        .sf-card-profile {
          background: #deeefe;
          padding: 36px 26px;
          flex: 1;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .sf-profile-title {
          font-size: 24px;
          font-weight: 800;
          color: #1f6a89;
          line-height: 1.25;
          margin: 0 0 24px;
        }

        /* Card 5: Offers & Acceptance */
        .sf-card-offers {
          background: #aacced;
          padding: 36px 26px;
          flex: 1;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .sf-offers-title {
          font-size: 24px;
          font-weight: 800;
          color: #1f6a89;
          line-height: 1.25;
          margin: 0 0 24px;
        }

        /* Custom bullet lists */
        .sf-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sf-list li {
          position: relative;
          padding-left: 16px;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.45;
        }

        .sf-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -1px;
          font-size: 16px;
        }

        .sf-list-sm li {
          font-size: 13.5px;
          line-height: 1.4;
          gap: 10px;
        }

        @media (max-width: 960px) {
          .sf-container {
            flex-direction: column;
          }
          .sf-card-notifications,
          .sf-card-interview,
          .sf-card-discovery,
          .sf-card-profile,
          .sf-card-offers {
            min-height: auto;
          }
          .sf-sofa-wrapper {
            position: relative;
            bottom: auto;
            right: auto;
            margin-top: 16px;
            align-self: flex-end;
          }
        }

        @media (max-width: 600px) {
          .sf-bottom-row {
            flex-direction: column;
          }
          .sf-card-notifications {
            flex-direction: column;
            gap: 20px;
          }
          .sf-chart-wrapper {
            align-self: center;
            width: 150px;
            min-height: 220px;
          }
        }
      `}</style>

      <section className="sf-section" id="features">
        {/* Properly visible Features heading */}
        <div className="sf-header">
          <h2 className="sf-title">Features</h2>
        </div>

        <div className="sf-container">
          {/* LEFT COLUMN */}
          <div className="sf-col">
            {/* Card 1: Notifications & Alerts */}
            <div className="sf-card sf-card-notifications">
              <div className="sf-notif-copy">
                <h3 className="sf-notif-title">
                  Notifications<br />&amp; Alerts
                </h3>
                <ul className="sf-list" style={{ color: "#004868" }}>
                  <li>Interview scheduled → Get notification</li>
                  <li>Offer received → Get notification</li>
                  <li>New job matching skills → Get alert</li>
                  <li>Company updates → Get notification</li>
                </ul>
              </div>

              <div className="sf-chart-wrapper">
                <Image
                  src="/student-img/iuy0.png"
                  alt="Analytics and Charts"
                  fill
                  style={{ objectFit: "contain", objectPosition: "bottom right" }}
                />
              </div>
            </div>

            {/* Card 2: Interview Preparation */}
            <div className="sf-card sf-card-interview">
              <h3 className="sf-interview-title">Interview Preparation</h3>
              <ul className="sf-list" style={{ color: "#ffffff", maxWidth: "340px", zIndex: 3, position: "relative" }}>
                <li>Practice mock interviews (role-specific)</li>
                <li>Get instant AI feedback</li>
                <li>Access interview tips &amp; resources</li>
                <li>Submit questions to TalentYug team</li>
              </ul>

              <div className="sf-sofa-wrapper">
                <Image
                  src="/student-img/sofa.webp"
                  alt="Candidate practicing interview on laptop"
                  fill
                  style={{ objectFit: "contain", objectPosition: "bottom right" }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="sf-col">
            {/* Card 3: Job Discovery */}
            <div className="sf-card sf-card-discovery">
              <h3 className="sf-discovery-title">Job Discovery</h3>
              <ul className="sf-list" style={{ color: "#ffffff" }}>
                <li>Browse all open positions</li>
                <li>Filter by role, company, salary, location</li>
                <li>Save jobs to favorites</li>
                <li>Get job recommendations (AI based)</li>
              </ul>
            </div>

            {/* Bottom Row: Profile & Applications + Offers & Acceptance */}
            <div className="sf-bottom-row">
              {/* Card 4: Profile & Applications */}
              <div className="sf-card sf-card-profile">
                <h3 className="sf-profile-title">
                  Profile &amp;<br />Applications
                </h3>
                <ul className="sf-list sf-list-sm" style={{ color: "#1f6a89" }}>
                  <li>View/edit student profile</li>
                  <li>See all applications (status: pending, interviewed, offered, rejected)</li>
                  <li>Upload resume/projects</li>
                  <li>Update skills &amp; certifications</li>
                </ul>
              </div>

              {/* Card 5: Offers & Acceptance */}
              <div className="sf-card sf-card-offers">
                <h3 className="sf-offers-title">
                  Offers &amp;<br />Acceptance
                </h3>
                <ul className="sf-list sf-list-sm" style={{ color: "#1f6a89" }}>
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
