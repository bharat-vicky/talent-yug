"use client";

const WORK_CARDS = [
  {
    key: "colleges",
    headline: "AI-Powered Campus Hiring.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="url(#blueGrad)">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A8B9C" />
            <stop offset="100%" stopColor="#2E6B82" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      "Upload Company Requirements",
      "AI Matches Students To Roles",
      "Track Placements Via Dashboard",
      "Get Real-Time Analytics",
    ],
    btnLabel: "For Colleges",
    href: "/colleges",
  },
  {
    key: "companies",
    headline: "Hire Faster From Campuses.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="url(#blueGrad2)">
        <path d="M11 2v8.55c0 .5.4.95.9.95H22c0-5.52-4.48-10-10-10zm1.5 11.55V22c5.24 0 9.5-4.26 9.5-9.5h-8.55c-.5 0-.95.45-.95.95zM2 12c0 5.52 4.48 10 10 10V3.5C6.48 3.5 2 7.98 2 12z" />
        <defs>
          <linearGradient id="blueGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5CA6BA" />
            <stop offset="100%" stopColor="#35788F" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      "Post Job Requirements In Template",
      "Receive Curated Student Pool",
      "Conduct Interviews Via Platform",
      "Manage Offers & Acceptance",
    ],
    btnLabel: "For Companies",
    href: "/companies",
  },
  {
    key: "students",
    headline: "Prepare, Apply, Get Hired.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="url(#blueGrad3)">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        <defs>
          <linearGradient id="blueGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A8B9C" />
            <stop offset="100%" stopColor="#1E4D5E" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      "Discover Relevant Opportunities",
      "Apply To Role-Matched Jobs",
      "Access Mock Interview Prep",
      "Track Application Status",
    ],
    btnLabel: "For Students",
    href: "/students",
  },
];

export default function HomeWork() {
  return (
    <section style={{ background: "#ffffff", padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .hwk-header-bar {
          background: #477E95;
          color: white;
          text-align: center;
          padding: 16px 20px;
          border-radius: 12px;
          margin: 0 auto 50px;
          max-width: 1100px;
          box-shadow: 0 8px 24px rgba(71,126,149,0.25);
        }
        .hwk-header-bar h2 {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 500;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .hwk-grid {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
        }

        .hwk-card {
          flex: 1;
          min-width: 280px;
          max-width: 340px;
          background: #ffffff;
          border-radius: 20px;
          padding: 40px 30px 30px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hwk-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.06);
        }

        .hwk-icon-wrap {
          margin-bottom: 24px;
          filter: drop-shadow(0 4px 12px rgba(74,139,156,0.3));
        }

        .hwk-headline {
          font-size: 19px;
          font-weight: 700;
          color: #000;
          margin: 0 0 24px;
          line-height: 1.3;
        }

        .hwk-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .hwk-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 13.5px;
          color: #222;
          font-weight: 400;
          line-height: 1.4;
        }
        .hwk-bullets li::before {
          content: "-";
          color: #222;
          font-weight: 500;
        }

        .hwk-btn {
          display: block;
          width: 100%;
          padding: 14px 0;
          background: #477E95;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hwk-btn:hover {
          background: #39677A;
        }

        @media (max-width: 960px) {
          .hwk-grid { flex-direction: column; align-items: center; gap: 30px; }
          .hwk-card { max-width: 100%; width: 100%; }
        }
      `}</style>

      {/* Top Banner */}
      <div className="hwk-header-bar">
        <h2>See How TalentYug Works</h2>
      </div>

      {/* Cards Grid */}
      <div className="hwk-grid">
        {WORK_CARDS.map((card) => (
          <div key={card.key} className="hwk-card">
            <div className="hwk-icon-wrap">
              {card.icon}
            </div>

            <h3 className="hwk-headline">{card.headline}</h3>

            <ul className="hwk-bullets">
              {card.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <a href={card.href} className="hwk-btn">
              {card.btnLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div className="hwk-header-bar" style={{ marginTop: 50, marginBottom: 0 }}>
        <h2>Select Your Role To Explore</h2>
      </div>
    </section>
  );
}
