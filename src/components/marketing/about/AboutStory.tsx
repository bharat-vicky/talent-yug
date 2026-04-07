export default function AboutStory() {
  const stats = [
    { val: "5,000+", label: "Talent target colleges across India" },
    { val: "100+", label: "Equal partner companies" },
    { val: "IIT Patna", label: "Where it all started" },
    { val: "1 mission", label: "Equal access to opportunity" },
  ];

  const cards = [
    {
      title: "From corridor idea to real impact",
      body: "We started small — mapping our own batchmates' skills, tracking readiness, curating gaps. When our pilot at IIT Patna showed real results, the Director of IIT Patna took notice, calling it a 'meaningful intervention.' That validation gave us the confidence to do something bigger: take this structured, AI-powered model to the colleges that needed it most.",
    },
    {
      title: "Building India's placement infrastructure",
      body: "Today, Talent Yug is an end-to-end, AI-powered placement ecosystem — connecting students, colleges, and companies through smart skill-mapping, real-time tracking, and role-matched hiring. We're not building a campus job portal. We're building the infrastructure that ensures every student who walks into college with hope, walks out with an opportunity.",
    },
  ];

  return (
    <>
      <style>{`
        .ab-story-card {
          background: #ffffff;
          border-left: 5px solid #1d4ed8;
          border-radius: 16px;
          padding: 36px 32px;
          flex: 1;
          min-width: 280px;
          box-shadow: 0 4px 24px rgba(29,78,216,0.08);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ab-story-card:hover {
          box-shadow: 0 8px 36px rgba(29,78,216,0.16);
          transform: translateY(-4px);
        }
        .ab-story-stat-val {
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @media (max-width: 768px) {
          .ab-story-cards { flex-direction: column !important; }
          .ab-story-stats { justify-content: center !important; gap: 20px !important; }
        }
      `}</style>

      <section
        id="story"
        style={{
          background: "#f8faff",
          padding: "80px clamp(20px,8vw,100px)",
          width: "100%",
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#dbeafe",
            border: "1.5px solid #93c5fd",
            borderRadius: 8,
            padding: "6px 16px",
            marginBottom: 48,
            fontSize: 13,
            fontWeight: 600,
            color: "#1e40af",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Our Story
        </div>

        {/* Cards */}
        <div
          className="ab-story-cards"
          style={{ display: "flex", gap: 28, flexWrap: "wrap", marginBottom: 72 }}
        >
          {cards.map((card) => (
            <div className="ab-story-card" key={card.title}>
              {/* Arrow icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              <h2
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 16,
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  color: "#475569",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row repeated */}
        <div
          className="ab-story-stats"
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            justifyContent: "flex-start",
            borderTop: "1px solid #dbeafe",
            paddingTop: 40,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="ab-story-stat-val">{s.val}</span>
              <span style={{ fontSize: 13, color: "#64748b", maxWidth: 120 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
