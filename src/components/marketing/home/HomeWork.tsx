"use client";

const WORK_CARDS = [
  {
    key: "colleges",
    accentColor: "#f97316",
    headline: "AI-Powered Campus Hiring, Simplified.",
    bullets: [
      "Upload Company Requirements",
      "AI Matches Students To Roles",
      "Receive Student Pool on Dashboard",
      "Get Real-Time Analytics",
    ],
    btnLabel: "For Colleges",
    href: "/colleges",
  },
  {
    key: "companies",
    accentColor: "#0d9488",
    headline: "Hire Smarter, Faster From Campuses.",
    bullets: [
      "Post Job Requirements In Template",
      "Receive Curated Student Pool",
      "Review, Interview And Place Students",
      "Track Application Status",
    ],
    btnLabel: "For Companies",
    href: "/companies",
  },
  {
    key: "students",
    accentColor: "#e11d48",
    headline: "Prepare, Apply, Get Hired.",
    bullets: [
      "Discover Matched Opportunities",
      "Apply To Pre-Matched Jobs",
      "Attend Interview And Get Offer",
      "Track Application Status",
    ],
    btnLabel: "For Students",
    href: "/students",
  },
];

export default function HomeWork() {
  return (
    <section style={{ background: "#ffffff", padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)" }}>
      <style>{`
        .hwork-card {
          flex: 1;
          min-width: 260px;
          max-width: 360px;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hwork-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.13);
        }
        .hwork-btn {
          display: block;
          width: 100%;
          padding: 11px 0;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          color: #ffffff;
          text-decoration: none;
          text-align: center;
          margin-top: auto;
          transition: filter 0.2s;
        }
        .hwork-btn:hover {
          filter: brightness(0.88);
        }
        @media (max-width: 900px) {
          .hwork-grid { flex-direction: column !important; align-items: center !important; }
          .hwork-card { max-width: 100% !important; width: 100% !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(22px,3vw,36px)",
              fontWeight: 800,
              color: "#1e3a8a",
            }}
          >
            See How TalentYug Works
          </h2>
        </div>

        {/* Cards row */}
        <div
          className="hwork-grid"
          style={{
            display: "flex",
            gap: 28,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {WORK_CARDS.map((card) => (
            <div key={card.key} className="hwork-card">
              {/* Top accent bar */}
              <div
                style={{
                  height: 6,
                  background: card.accentColor,
                  width: "100%",
                }}
              />

              <div style={{ padding: "28px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Headline */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#1e3a8a",
                    marginBottom: 20,
                    lineHeight: 1.4,
                  }}
                >
                  {card.headline}
                </h3>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {card.bullets.map((b, idx) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        color: "#374151",
                        lineHeight: 1.5,
                      }}
                    >
                      {/* Step number badge */}
                      <span
                        style={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: `${card.accentColor}20`,
                          color: card.accentColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {idx + 1}
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <a
                  href={card.href}
                  className="hwork-btn"
                  style={{ background: card.accentColor }}
                >
                  {card.btnLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
