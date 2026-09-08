"use client";

import Image from "next/image";
import Link from "next/link";

export default function StudentHero() {
  return (
    <>
      <style>{`
        .sh-wrapper {
          position: relative;
          background: #ffffff;
          width: 100%;
          overflow: hidden;
        }
        .sh-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 130px clamp(24px, 5vw, 64px) 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }
        .sh-left {
          flex: 1;
          max-width: 520px;
          z-index: 2;
        }
        .sh-title {
          font-size: clamp(38px, 4.6vw, 56px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .sh-title-accent {
          color: #0e4c6e;
          display: block;
        }
        .sh-subtitle {
          margin-top: 28px;
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 600;
          color: #1e293b;
          line-height: 1.45;
        }
        .sh-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 36px;
          padding: 13px 32px;
          background: #1f7d9e;
          color: #ffffff;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 14px rgba(31, 125, 158, 0.28);
          transition: all 0.25s ease;
        }
        .sh-cta:hover {
          background: #176682;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(31, 125, 158, 0.35);
        }
        .sh-right {
          flex: 1.1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 2;
        }
        .sh-illustration {
          width: 100%;
          max-width: 580px;
          height: auto;
          object-fit: contain;
        }
        @media (max-width: 860px) {
          .sh-container {
            flex-direction: column;
            padding: 110px 24px 40px;
            gap: 36px;
          }
          .sh-left {
            max-width: 100%;
            text-align: left;
          }
          .sh-right {
            width: 100%;
            justify-content: center;
          }
          .sh-illustration {
            max-width: 480px;
          }
        }
      `}</style>

      <section className="sh-wrapper">
        <div className="sh-container">
          {/* Left copy */}
          <div className="sh-left">
            <h1 className="sh-title">
              Discover<br />
              Your<br />
              <span className="sh-title-accent">Right-Fit Job.</span>
            </h1>

            <p className="sh-subtitle">
              Role-Matched Opportunities | 5.5L<br />
              Average Salary | Interview Prep
            </p>

            <Link href="/register" className="sh-cta">
              Browse Opportunities
            </Link>
          </div>

          {/* Right illustration */}
          <div className="sh-right">
            <Image
              src="/student-img/students/student-hero-illustration.png"
              alt="Discover Your Right-Fit Job Illustration"
              width={580}
              height={290}
              priority
              className="sh-illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
}
