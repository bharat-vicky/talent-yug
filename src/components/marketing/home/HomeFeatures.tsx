const FEATURES = [
  {
    n: "01",
    title: "AI Matching Algorithm",
    subtitle: "Role-Matched, Not Mass Applications",
  },
  {
    n: "02",
    title: "Integrated Dashboard",
    subtitle: "All Data In One Place",
  },
  {
    n: "03",
    title: "Structured Process",
    subtitle: "7-Step Repeatable Workflow",
  },
  {
    n: "04",
    title: "Real-Time Analytics",
    subtitle: "Placement Outcomes Tracked",
  },
];

export default function HomeFeatures() {
  return (
    <section
      style={{
        padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)",
        background: "#f9fafb",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .hf-grid { grid-template-columns: 1fr !important; }
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
            Select Your Role To Explore
          </h2>
        </div>

        {/* 2x2 feature grid */}
        <div
          className="hf-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 28,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.n}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 16,
                padding: "28px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden",
                gap: 20,
              }}
            >
              {/* Large background number */}
              <span
                style={{
                  fontSize: 100,
                  fontWeight: 900,
                  color: "#ede9fe",
                  position: "absolute",
                  left: -8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                  letterSpacing: -4,
                }}
              >
                {f.n}
              </span>

              {/* Text content offset to the right of the large number */}
              <div style={{ marginLeft: 68, zIndex: 1 }}>
                <h4
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1e3a8a",
                    margin: "0 0 6px 0",
                    textAlign: "left",
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    margin: 0,
                    textAlign: "left",
                    fontWeight: 500,
                  }}
                >
                  {f.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
