"use client";
import Link from "next/link";
import Image from "next/image";

const STATS = [
  { val: "5,000+", label: "target colleges\nacross India" },
  { val: "100+", label: "partner\ncompanies" },
  { val: "IIT Patna", label: "where it all\nstarted" },
  { val: "1 mission", label: "equal access to\nopportunity" },
];

export default function AboutHero() {
  return (
    <>
      <style>{`
        .ab-hero-section {
          background: #ffffff;
          width: 100%;
          padding: clamp(100px, 10vw, 140px) clamp(24px, 6vw, 100px) 0;
          position: relative;
          overflow: hidden;
        }
        .ab-hero-inner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          padding-bottom: 60px;
        }
        .ab-hero-left { flex: 1; min-width: 0; max-width: 620px; }
        .ab-problem-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff8e1;
          border: 1.5px solid #f59e0b;
          border-radius: 8px;
          padding: 8px 18px;
          margin-bottom: 28px;
          font-size: 14px;
          font-weight: 700;
          color: #92400e;
        }
        .ab-main-title {
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 800;
          color: #005F73;
          line-height: 1.15;
          margin: 0 0 20px;
        }
        .ab-subtitle {
          font-size: clamp(14px, 1.4vw, 16px);
          color: #475569;
          line-height: 1.75;
          margin: 0 0 32px;
          max-width: 540px;
        }
        .ab-problem-heading {
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 700;
          color: #005F73;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ab-story-text {
          font-size: clamp(13px, 1.3vw, 15px);
          color: #475569;
          line-height: 1.8;
          margin: 0 0 32px;
          max-width: 540px;
        }
        .ab-read-more {
          display: inline-block;
          padding: 14px 36px;
          background: #2180A8;
          color: #fff;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .ab-read-more:hover {
          background: #005F73;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(33,128,168,0.35);
        }
        /* Right photo collage */
        .ab-photo-collage {
          flex-shrink: 0;
          position: relative;
          width: clamp(300px, 38vw, 520px);
          height: clamp(320px, 36vw, 460px);
        }
        .ab-photo-back {
          position: absolute;
          top: 0;
          right: 0;
          width: 76%;
          height: 82%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
        }
        .ab-photo-front {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60%;
          height: 70%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2);
          border: 4px solid #ffffff;
        }
        /* Stats bar */
        .ab-stats-bar {
          background: #ffffff;
          border-top: 1.5px solid #e2e8f0;
          padding: 28px clamp(24px, 6vw, 100px);
          display: flex;
          gap: clamp(20px, 4vw, 80px);
          flex-wrap: wrap;
          max-width: 100%;
        }
        .ab-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ab-stat-val {
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800;
          color: #005F73;
        }
        .ab-stat-label {
          font-size: 13px;
          color: #64748b;
          white-space: pre-line;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .ab-hero-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-bottom: 40px;
          }
          .ab-hero-left { max-width: 100%; }
          .ab-problem-badge { margin: 0 auto 24px; }
          .ab-subtitle, .ab-story-text { margin-left: auto; margin-right: auto; }
          .ab-problem-heading { justify-content: center; }
          .ab-photo-collage {
            width: min(400px, 90vw);
            height: 280px;
          }
          .ab-stats-bar { justify-content: center; gap: 24px; }
        }
        @media (max-width: 480px) {
          .ab-photo-collage { height: 220px; }
          .ab-stats-bar { gap: 16px; }
        }
      `}</style>

      <section className="ab-hero-section">
        <div className="ab-hero-inner">
          {/* Left text */}
          <div className="ab-hero-left">
            <div className="ab-main-title">
              Built by students,<br />
              for students who deserve more.
            </div>

            <p className="ab-subtitle">
              We didn&apos;t set out to build a startup. We set out to fix something
              that was clearly broken.
            </p>

            <div className="ab-problem-heading">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#f59e0b"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              The problem we couldn&apos;t ignore
            </div>

            <p className="ab-story-text">
              As students at IIT Patna, we watched bright peers struggle with placement anxiety — and
              we kept asking: if it&apos;s this hard here, what about students in Tier-2 and Tier-3 colleges?
              Students with equal drive but no brand name, no structured support, no real pathway. They
              weren&apos;t lacking talent. They were lacking a system.
            </p>

            <Link href="#story" className="ab-read-more">
              Read More
            </Link>
          </div>

          {/* Right — photo collage */}
          <div className="ab-photo-collage">
            <div className="ab-photo-back">
              <Image
                src="/home-img/landing/l3.webp"
                alt="Campus building"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width:900px) 90vw, 400px"
                priority
              />
            </div>
            <div className="ab-photo-front">
              <Image
                src="/home-img/landing/l1.webp"
                alt="Students collaborating"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width:900px) 60vw, 280px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="ab-stats-bar">
          {STATS.map((s) => (
            <div className="ab-stat-item" key={s.val}>
              <span className="ab-stat-val">{s.val}</span>
              <span className="ab-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
