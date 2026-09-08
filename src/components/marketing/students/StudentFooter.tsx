import Image from "next/image";
import Link from "next/link";

export default function StudentFooter() {
  return (
    <>
      <style>{`
        .sfoot-wrapper {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          width: 100%;
        }

        /* Skyline Graphic */
        .sfoot-skyline-wrap {
          width: 100%;
          line-height: 0;
          position: relative;
          background: #ffffff;
        }

        .sfoot-skyline-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          max-height: 220px;
        }

        /* Footer Main Content */
        .sfoot-main {
          background-color: #2280a8;
          padding: 24px 24px 36px;
          color: #083a50;
        }

        .sfoot-container {
          max-width: 1140px;
          margin: 0 auto;
        }

        .sfoot-columns {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          flex-wrap: wrap;
          padding-bottom: 36px;
        }

        .sfoot-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sfoot-col-title {
          font-size: 19px;
          font-weight: 800;
          color: #062b3c;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }

        .sfoot-link {
          font-size: 14.5px;
          font-weight: 550;
          color: #0a3f56;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .sfoot-link:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        /* Right Brand Block */
        .sfoot-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 320px;
          overflow: visible;
        }

        .sfoot-brand-logo {
          width: 215px;
          height: auto;
          display: block;
          margin-bottom: 2px;
          max-width: 100%;
        }

        .sfoot-tagline {
          font-size: 14px;
          line-height: 1.5;
          color: #093c52;
          font-weight: 500;
          margin: 0;
        }

        /* Bottom Copyright Bar */
        .sfoot-bottom-bar {
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #083a50;
          padding-top: 24px;
          border-top: 1px solid rgba(8, 58, 80, 0.15);
        }

        .sfoot-legal-link {
          color: #083a50;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .sfoot-legal-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .sfoot-columns {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 36px;
          }
          .sfoot-brand-col {
            grid-column: span 2;
            max-width: 100%;
          }
        }

        @media (max-width: 540px) {
          .sfoot-columns {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .sfoot-brand-col {
            grid-column: span 1;
          }
        }
      `}</style>

      <footer className="sfoot-wrapper" id="footer">
        {/* Skyline transition graphic */}
        <div className="sfoot-skyline-wrap">
          <Image
            src="/student-img/students/skyline_blue_v3.png"
            alt="City Skyline"
            width={2048}
            height={360}
            className="sfoot-skyline-img"
            priority
            unoptimized
          />
        </div>

        {/* Footer main links & branding */}
        <div className="sfoot-main">
          <div className="sfoot-container">
            <div className="sfoot-columns">
              {/* Column 1: PLATFORM */}
              <div className="sfoot-col">
                <h4 className="sfoot-col-title">PLATFORM</h4>
                <Link href="/colleges" className="sfoot-link">For Colleges</Link>
                <Link href="/companies" className="sfoot-link">For Companies</Link>
                <Link href="/students" className="sfoot-link">For Students</Link>
                <Link href="/#about" className="sfoot-link">About US</Link>
              </div>

              {/* Column 2: Features */}
              <div className="sfoot-col">
                <h4 className="sfoot-col-title">Features</h4>
                <Link href="/colleges" className="sfoot-link">Event Management</Link>
                <Link href="/students" className="sfoot-link">QR Check-In</Link>
                <Link href="/companies" className="sfoot-link">Analytics</Link>
              </div>

              {/* Column 3: ACCOUNT */}
              <div className="sfoot-col">
                <h4 className="sfoot-col-title">ACCOUNT</h4>
                <Link href="/login" className="sfoot-link">Sign Up</Link>
                <Link href="/login" className="sfoot-link">Log In</Link>
                <Link href="/login" className="sfoot-link">Reset Password</Link>
              </div>

              {/* Column 4: Brand Logo & Tagline */}
              <div className="sfoot-brand-col">
                <Image
                  src="/student-img/students/footer_logo_v3.png"
                  alt="TalentYug"
                  width={424}
                  height={130}
                  className="sfoot-brand-logo"
                  unoptimized
                />
                <p className="sfoot-tagline">
                  Connecting Students, Colleges, And<br />
                  Companies Through Seamless<br />
                  Campus Recruitment Events.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="sfoot-bottom-bar">
              Copyright 2026-27 | All Rights Reserved |{" "}
              <Link href="/privacy" className="sfoot-legal-link">Privacy Policy</Link> |{" "}
              <Link href="/terms" className="sfoot-legal-link">Terms Of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
