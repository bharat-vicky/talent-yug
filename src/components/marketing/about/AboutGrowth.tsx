const MILESTONES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: "Concept to Launch",
    body: "What started as a corridor conversation at IIT Patna became a structured pilot. We mapped our own batchmates' skills, tracked readiness gaps, and proved the model with real placement outcomes.",
    highlight: true,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        <path d="M3 20h18"/>
      </svg>
    ),
    title: "70% Placement Success Goal",
    body: "Our core commitment: 70 out of every 100 students at partner colleges secure a meaningful placement or internship — with a structured roadmap for the remaining 30%.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "5,000+ Target Colleges",
    body: "We are building infrastructure to serve thousands of Tier 2 and Tier 3 colleges across India — institutions that have been underserved by traditional placement platforms.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "100+ Partner Companies",
    body: "Over 100 companies have committed to treating every college as an equal hiring partner — accessing pre-vetted, skill-mapped talent from across India, not just tier-one campuses.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "100% Retention So Far",
    body: "Every college that has partnered with TalentYug has continued with us. That trust is our most important metric — and the clearest sign that our model delivers real results.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: "Stronger Student Outcomes",
    body: "Higher starting salaries, reduced time-to-hire, and measurable skill improvements — every data point connects directly to a student's real-world opportunity.",
  },
];

export default function AboutGrowth() {
  return (
    <>
      <style>{`
        .abg-section {
          background: #ffffff;
          padding: 80px clamp(24px, 6vw, 100px);
          width: 100%;
        }
        .abg-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #e0f4fb;
          border: 1.5px solid #7dd3f0;
          border-radius: 8px;
          padding: 6px 16px;
          margin-bottom: 16px;
          font-size: 13px;
          font-weight: 600;
          color: #005F73;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .abg-heading {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          color: #005F73;
          margin: 0 0 16px;
          line-height: 1.2;
        }
        .abg-subtext {
          font-size: clamp(14px, 1.4vw, 16px);
          color: #475569;
          line-height: 1.75;
          max-width: 720px;
          margin: 0 0 52px;
        }
        /* Horizontal scroll grid matching Figma */
        .abg-grid {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          border: 1.5px solid #e2f4fc;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 4px 24px rgba(33,128,168,0.08);
        }
        .abg-grid::-webkit-scrollbar { display: none; }
        .abg-card {
          flex-shrink: 0;
          min-width: 220px;
          padding: 32px 24px;
          border-right: 1.5px solid #e2f4fc;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.3s ease;
          cursor: default;
        }
        .abg-card:last-child { border-right: none; }
        .abg-card.abg-highlight {
          background: #29ABE2;
          border-radius: 18px 0 0 18px;
          border-right: none;
        }
        .abg-card.abg-highlight .abg-card-title { color: #003545; }
        .abg-card.abg-highlight .abg-card-body { color: rgba(0,53,69,0.85); }
        .abg-card:not(.abg-highlight):hover { background: #f0f9ff; }
        .abg-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #e0f4fb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .abg-card.abg-highlight .abg-icon-circle {
          background: rgba(255,255,255,0.25);
        }
        .abg-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #005F73;
          line-height: 1.3;
          margin: 0;
        }
        .abg-card-body {
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .abg-grid { flex-direction: column; overflow-x: visible; border-radius: 16px; }
          .abg-card { border-right: none; border-bottom: 1.5px solid #e2f4fc; border-radius: 0; min-width: unset; }
          .abg-card:last-child { border-bottom: none; }
          .abg-card.abg-highlight { border-radius: 16px 16px 0 0; }
        }
      `}</style>

      <section className="abg-section" id="story">
        {/* Header */}
        <div className="abg-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2180A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          Milestones
        </div>

        <h2 className="abg-heading">Our Growth &amp; Impact</h2>

        <p className="abg-subtext">
          From early validation to measurable placement outcomes, our journey reflects a focused effort
          to build a stronger, more transparent, and outcome-driven ecosystem for students and institutions.
        </p>

        {/* Horizontal cards grid — matches Figma layout */}
        <div className="abg-grid">
          {MILESTONES.map((m) => (
            <div className={`abg-card${m.highlight ? " abg-highlight" : ""}`} key={m.title}>
              <div className="abg-icon-circle">{m.icon}</div>
              <h3 className="abg-card-title">{m.title}</h3>
              <p className="abg-card-body">{m.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
