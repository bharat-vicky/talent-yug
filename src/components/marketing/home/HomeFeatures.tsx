export default function HomeFeatures() {
  return (
    <section
      style={{
        padding: "clamp(40px,5vw,80px) clamp(20px,5vw,60px)",
        background: "#ffffff",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .hf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
        className="hf-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 40,
        }}
      >
        {[
          {
            n: "1",
            title: "Event Management",
            desc: "Create and manage campus recruitment drives with full lifecycle control — from draft to post-event analytics.",
          },
          {
            n: "2",
            title: "QR-Based Check-in",
            desc: "Generate branded QR passes for every attendee. Scan instantly on arrival for contactless, error-free check-ins.",
          },
          {
            n: "3",
            title: "Pre-Registration Forms",
            desc: "Build custom forms with drag-and-drop. Collect exactly the data you need and manage approvals with one click.",
          },
          {
            n: "4",
            title: "Real-Time Analytics",
            desc: "Track placements, attendance trends, and candidate pipelines with live dashboards and exportable reports.",
          },
        ].map((f) => (
          <div
            key={f.n}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "15px 15px 10px 0px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: 125,
                fontWeight: "bold",
                color: "#DDDDDD",
                position: "absolute",
                left: 0,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {f.n}
            </span>
            <div style={{ marginLeft: 60 }}>
              <h4
                style={{
                  textAlign: "left",
                  color: "#005070",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {f.title}
              </h4>
              <p style={{ fontSize: 16, marginTop: 5, textAlign: "left", color: "#555" }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
