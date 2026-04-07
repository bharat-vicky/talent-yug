import Link from "next/link";

export default function AboutHero() {
  return (
    <>
      <style>{`
        .ab-hero::after {
          content: "";
          position: absolute;
          right: 30px;
          top: 120px;
          width: 900px;
          height: 650px;
          background: #2563eb;
          filter: blur(80px);
          opacity: 0.15;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        .ab-gradient-text {
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-cta {
          display: inline-block;
          margin-top: 32px;
          padding: 14px 48px;
          background: #1d4ed8;
          color: #fff;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .ab-cta:hover {
          background: #1e40af;
          transform: translateY(-2px);
          box-shadow: 5px 5px 14px rgba(29,78,216,0.3);
        }
        .ab-warning-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fefce8;
          border: 1.5px solid #facc15;
          border-radius: 10px;
          padding: 10px 18px;
          margin-bottom: 28px;
          font-size: 14px;
          font-weight: 600;
          color: #854d0e;
        }
        .ab-img-placeholder {
          width: 100%;
          max-width: 520px;
          height: 400px;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .ab-img-placeholder::before {
          content: "";
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 90px;
          background: #93c5fd;
          border-radius: 50%;
        }
        .ab-img-placeholder::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(180deg, transparent 0%, #60a5fa 100%);
          border-radius: 0 0 24px 24px;
        }
        .ab-stats-row {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        .ab-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        @media (max-width: 768px) {
          .ab-hero { padding: 30px 20px 60px !important; flex-direction: column !important; text-align: center; }
          .ab-hero-right { display: none !important; }
          .ab-hero-left { min-width: unset !important; width: 100% !important; }
          .ab-stats-row { justify-content: center !important; gap: 24px !important; }
          .ab-cta { padding: 14px 40px !important; }
          .ab-warning-box { margin: 0 auto 24px !important; }
        }
      `}</style>

      {/* Spacer for fixed nav */}
      <div style={{ height: 60, background: "#ffffff" }} />

      <section
        className="ab-hero"
        style={{
          position: "relative",
          zIndex: 5,
          background: "#ffffff",
          width: "100%",
          maxWidth: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px clamp(20px,8vw,100px) 80px",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* Left text */}
        <div className="ab-hero-left" style={{ flex: 1, minWidth: 280, zIndex: 10 }}>
          {/* Warning box */}
          <div className="ab-warning-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            The problem we couldn&apos;t ignore
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Built by students,{" "}
            <span className="ab-gradient-text">for students</span>
            <br />
            who deserve more.
          </h1>

          <p
            style={{
              marginTop: 28,
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            As students at IIT Patna, we watched bright peers struggle with placement anxiety —
            and we kept asking: if it&apos;s this hard here, what happens at Tier 2 and 3 colleges?
            Students with equal drive but no brand name, no structured support, no real pathway.
            They weren&apos;t lacking talent. They were lacking a system.
          </p>

          <Link href="#story" className="ab-cta">
            Read More
          </Link>

          {/* Stats row */}
          <div className="ab-stats-row">
            {[
              { val: "5,000+", label: "Talent target colleges across India" },
              { val: "100+", label: "Equal partner companies" },
              { val: "IIT Patna", label: "Where it all started" },
              { val: "1 mission", label: "Equal access to opportunity" },
            ].map((s) => (
              <div className="ab-stat-item" key={s.label}>
                <span
                  style={{
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#1e40af 0%,#2563eb 60%,#1d4ed8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.val}
                </span>
                <span style={{ fontSize: 13, color: "#64748b", maxWidth: 110 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image placeholder */}
        <div
          className="ab-hero-right"
          style={{
            flex: 1,
            minWidth: 280,
            display: "flex",
            justifyContent: "flex-end",
            paddingLeft: 40,
            zIndex: 10,
          }}
        >
          <div className="ab-img-placeholder">
            {/* Decorative SVG illustration inside */}
            <svg
              width="260"
              height="260"
              viewBox="0 0 260 260"
              fill="none"
              style={{ position: "relative", zIndex: 1 }}
            >
              {/* Mortarboard */}
              <polygon points="130,60 200,95 130,130 60,95" fill="#1d4ed8" opacity="0.7" />
              <polygon points="130,130 200,95 200,130 130,165" fill="#1e40af" opacity="0.6" />
              <polygon points="130,130 60,95 60,130 130,165" fill="#2563eb" opacity="0.6" />
              {/* Tassel */}
              <line x1="200" y1="95" x2="200" y2="145" stroke="#1e40af" strokeWidth="3" />
              <circle cx="200" cy="148" r="6" fill="#1d4ed8" />
              {/* Book stack */}
              <rect x="80" y="175" width="100" height="14" rx="3" fill="#3b82f6" opacity="0.8" />
              <rect x="84" y="163" width="92" height="14" rx="3" fill="#60a5fa" opacity="0.8" />
              <rect x="88" y="151" width="84" height="14" rx="3" fill="#93c5fd" opacity="0.8" />
              {/* Arrow up */}
              <path d="M130 40 L145 60 L135 60 L135 80 L125 80 L125 60 L115 60 Z" fill="#1e40af" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
