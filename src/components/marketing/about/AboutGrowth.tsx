const MILESTONES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.13 2.13l-1.06 1.06a7.5 7.5 0 0 0-2.12 5.3v.53l-.53.53a3 3 0 0 1-2.12.88H6a1 1 0 0 0-.71.29L2.12 13.88a1 1 0 0 0 0 1.41l7.07 7.07a1 1 0 0 0 1.41 0l3.18-3.18a1 1 0 0 0 .29-.71V17a3 3 0 0 1 .88-2.12l.53-.53v-.53a7.5 7.5 0 0 0 5.3-2.12l1.06-1.06a1 1 0 0 0 0-1.41l-7.07-7.07a1 1 0 0 0-1.41 0zm-3.53 8.48a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
      </svg>
    ),
    title: "Concept to Launch",
    body: "The idea was conceptualized and tested over the past year, followed by formal product development and pilot implementation in the last 6-8 months.",
    highlight: true,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-11h-2v2h2v4h2v-4h2v-2h-2V7h-2z"/>
      </svg>
    ),
    title: "70% Placement Success Goal",
    body: "We aim to help 70 out of every 100 students secure placements or internships, while the remaining students continue...",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7h2v12h16V7h2L12 2zm0 2.5l7 3.5v12H5V8l7-3.5zM10 10h4v4h-4v-4zm-4 0h2v4H6v-4zm8 0h2v4h-2v-4z"/>
      </svg>
    ),
    title: "5,000+ Target Colleges",
    body: "Thousands of colleges across India continue to face placement challenges, forming the core market...",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: "100+ Partner Companies",
    body: "With partners such as PW, Inglu, Embrizon, Prodesk, and many others, we are building a stronger network of hiring...",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    title: "100% Retention So Far",
    body: "Every college that has used the system so far continues to stay engaged with the platform, reinforcing early...",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d3b54" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
      </svg>
    ),
    title: "Stronger Student Outcomes",
    body: "Students matched through our platform show nearly 70% interview-to-offer conversion, along with...",
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
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .abg-heading {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: #0c3e56;
          margin: 0 0 20px;
          line-height: 1.2;
        }
        .abg-subtext {
          font-size: clamp(15px, 1.4vw, 18px);
          color: #64748b;
          line-height: 1.6;
          max-width: 900px;
          margin: 0 auto 60px;
        }
        /* Horizontal scroll grid matching Figma */
        .abg-grid {
          display: flex;
          gap: 0;
          width: 100%;
          max-width: 1300px;
          overflow-x: auto;
          scrollbar-width: none;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .abg-grid::-webkit-scrollbar { display: none; }
        .abg-card {
          flex: 1;
          min-width: 200px;
          padding: 40px 24px;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .abg-card:last-child { border-right: none; }
        .abg-card.abg-highlight {
          background: #3fbcec;
          position: relative;
          overflow: hidden;
          color: #082d40;
          border-radius: 23px 0 0 23px;
          border-right: none;
        }
        /* Concentric circles in bottom-left for highlight card */
        .abg-card.abg-highlight::after {
          content: "";
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          box-shadow: 0 0 0 20px rgba(255,255,255,0.1),
                      0 0 0 40px rgba(255,255,255,0.08),
                      0 0 0 60px rgba(255,255,255,0.06),
                      0 0 0 80px rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .abg-card.abg-highlight .abg-card-title { color: #082d40; }
        .abg-card.abg-highlight .abg-card-body { color: rgba(8, 45, 64, 0.85); position: relative; z-index: 2; }
        .abg-card.abg-highlight .abg-icon-circle { position: relative; z-index: 2; }
        .abg-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0c3e56;
          line-height: 1.3;
          margin: 0;
          position: relative;
          z-index: 2;
        }
        .abg-card-body {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        .abg-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .abg-card.abg-highlight .abg-icon-circle {
          background: #ffffff;
        }
        .abg-card.abg-highlight svg {
          fill: #3fbcec; /* Match background color */
        }

        @media (max-width: 900px) {
          .abg-grid { flex-direction: column; overflow-x: visible; border-radius: 16px; }
          .abg-card { border-right: none; border-bottom: 1.5px solid #e2e8f0; border-radius: 0; min-width: unset; }
          .abg-card:last-child { border-bottom: none; }
          .abg-card.abg-highlight { border-radius: 16px 16px 0 0; }
        }
      `}</style>

      <section className="abg-section" id="story">
        <h2 className="abg-heading">Our Growth &amp; Impact</h2>

        <p className="abg-subtext">
          From early validation to measurable placement outcomes, our journey reflects a focused effort to build a stronger, more transparent, and outcome-driven ecosystem for students and institutions.
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
