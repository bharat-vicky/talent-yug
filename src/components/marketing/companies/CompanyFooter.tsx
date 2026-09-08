"use client";

import Image from "next/image";
import Link from "next/link";

export default function CompanyFooter() {
  return (
    <>
      <style>{`
        .cfoot-wrapper {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          width: 100%;
        }

        /* Skyline Graphic */
        .cfoot-skyline-wrap {
          width: 100%;
          line-height: 0;
          position: relative;
          background: #ffffff;
        }

        .cfoot-skyline-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          max-height: 220px;
        }

        /* Footer Main Content */
        .cfoot-main {
          background-color: #2280a8;
          padding: 24px 24px 36px;
          color: #083a50;
        }

        .cfoot-container {
          max-width: 1140px;
          margin: 0 auto;
        }

        .cfoot-columns {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          flex-wrap: wrap;
          padding-bottom: 36px;
        }

        .cfoot-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cfoot-col-title {
          font-size: 19px;
          font-weight: 800;
          color: #062b3c;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }

        .cfoot-link {
          font-size: 14.5px;
          font-weight: 550;
          color: #0a3f56;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .cfoot-link:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        /* Right Brand Block */
        .cfoot-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 320px;
          overflow: visible;
        }

        .cfoot-brand-logo {
          width: 215px;
          height: auto;
          display: block;
          margin-bottom: 2px;
          max-width: 100%;
        }

        .cfoot-tagline {
          font-size: 14px;
          line-height: 1.5;
          color: #093c52;
          font-weight: 500;
          margin: 0;
        }

        /* Bottom Copyright Bar */
        .cfoot-bottom-bar {
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #083a50;
          padding-top: 24px;
          border-top: 1px solid rgba(8, 58, 80, 0.15);
        }

        .cfoot-legal-link {
          color: #083a50;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .cfoot-legal-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .cfoot-columns {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 36px;
          }
          .cfoot-brand-col {
            grid-column: span 2;
            max-width: 100%;
          }
        }

        @media (max-width: 540px) {
          .cfoot-columns {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .cfoot-brand-col {
            grid-column: span 1;
          }
        }
      `}</style>

      <footer className="cfoot-wrapper" id="footer">
        {/* Skyline transition graphic */}
        <div className="cfoot-skyline-wrap">
          <Image
            src="/company-img/companies/skyline_blue_v3.png"
            alt="City Skyline"
            width={2048}
            height={360}
            className="cfoot-skyline-img"
            priority
            unoptimized
          />
        </div>

        {/* Footer main links & branding */}
        <div className="cfoot-main">
          <div className="cfoot-container">
            <div className="cfoot-columns">
              {/* Column 1: PLATFORM */}
              <div className="cfoot-col">
                <h4 className="cfoot-col-title">PLATFORM</h4>
                <Link href="/colleges" className="cfoot-link">
                  For Colleges
                </Link>
                <Link href="/companies" className="cfoot-link">
                  For Companies
                </Link>
                <Link href="/students" className="cfoot-link">
                  For Students
                </Link>
                <Link href="/#about" className="cfoot-link">
                  About US
                </Link>
              </div>

              {/* Column 2: Features */}
              <div className="cfoot-col">
                <h4 className="cfoot-col-title">Features</h4>
                <Link href="/colleges" className="cfoot-link">
                  Event Management
                </Link>
                <Link href="/students" className="cfoot-link">
                  QR Check-In
                </Link>
                <Link href="/companies" className="cfoot-link">
                  Analytics
                </Link>
              </div>

              {/* Column 3: ACCOUNT */}
              <div className="cfoot-col">
                <h4 className="cfoot-col-title">ACCOUNT</h4>
                <Link href="/login" className="cfoot-link">
                  Sign Up
                </Link>
                <Link href="/login" className="cfoot-link">
                  Log In
                </Link>
                <Link href="/login" className="cfoot-link">
                  Reset Password
                </Link>
              </div>

              {/* Column 4: Brand Logo & Tagline */}
              <div className="cfoot-brand-col">
                <Image
                  src="/company-img/companies/footer_logo_v3.png"
                  alt="TalentYug"
                  width={424}
                  height={130}
                  className="cfoot-brand-logo"
                  unoptimized
                />
                <p className="cfoot-tagline">
                  Connecting Students, Colleges, And
                  <br />
                  Companies Through Seamless
                  <br />
                  Campus Recruitment Events.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="cfoot-bottom-bar">
              Copyright 2026-27 | All Rights Reserved |{" "}
              <Link href="/privacy" className="cfoot-legal-link">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/terms" className="cfoot-legal-link">
                Terms Of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
