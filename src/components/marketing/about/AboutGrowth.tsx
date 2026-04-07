const milestones = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Concept to Launch",
    body: "What started as a corridor conversation at IIT Patna became a structured pilot. We mapped our own batchmates' skills, tracked readiness gaps, and proved the model with real placement outcomes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M3 20h18" />
      </svg>
    ),
    title: "70% Placement Success Goal",
    body: "Our core commitment: 70 out of every 100 students at partner colleges secure a meaningful placement or internship — with a structured roadmap for the remaining 30%.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "5,000+ Target Colleges",
    body: "We are building the infrastructure to serve thousands of Tier 2 and Tier 3 colleges across India — institutions that have been underserved by traditional placement platforms.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "100+ Partner Companies",
    body: "Over 100 companies have committed to treating every college as an equal hiring partner — accessing pre-vetted, skill-mapped talent from across India, not just tier-one campuses.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "100% Retention So Far",
    body: "Every college that has partnered with TalentYug has continued with us. That trust is our most important metric — and the clearest sign that our model delivers real results.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Stronger Student Outcomes",
    body: "Higher starting salaries, reduced time-to-hire, and measurable skill improvements — every data point on our platform connects directly to a student's real-world opportunity.",
  },
];

export default function AboutGrowth() {
  return (
    <>
      <style>{`
        .ab-growth-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 28px 24px;
          border-left: 4px solid #1d4ed8;
          box-shadow: 0 2px 16px rgba(29,78,216,0.07);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ab-growth-card:hover {
          box-shadow: 0 8px 32px rgba(29,78,216,0.14);
          transform: translateY(-4px);
        }
        .ab-growth-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .ab-growth-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .ab-growth-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        style={{
          background: "#eff6ff",
          padding: "80px clamp(20px,8vw,100px)",
          width: "100%",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: 52 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#dbeafe",
              border: "1.5px solid #93c5fd",
              borderRadius: 8,
              padding: "6px 16px",
              marginBottom: 16,
              fontSize: 13,
              fontWeight: 600,
              color: "#1e40af",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Milestones
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Our Growth &amp; Impact
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: 720,
              margin: 0,
            }}
          >
            From early validation to measurable placement outcomes, our journey reflects a focused
            effort to build a stronger, more transparent, and outcome-driven ecosystem for students
            and institutions.
          </p>
        </div>

        {/* Grid */}
        <div className="ab-growth-grid">
          {milestones.map((m) => (
            <div className="ab-growth-card" key={m.title}>
              {/* Icon box */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {m.icon}
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {m.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
