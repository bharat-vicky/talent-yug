import Image from "next/image";
import Link from "next/link";

export default function StudentHero() {
  return (
    <>
      <style>{`
        .s-hero::after {
          content:"";
          position:absolute;
          right:30px;
          top:120px;
          width:900px;
          height:650px;
          background:#DB7B7B;
          filter:blur(70px);
          opacity:0.2;
          border-radius:50%;
          z-index:0;
          pointer-events:none;
        }
        .s-gradient-text {
          background: linear-gradient(0deg, #C80101 6%, #7E0000 78%, #E40101 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .s-cta {
          display:inline-block;
          margin-top:40px;
          padding:16px 80px;
          background:#7E0000;
          color:#fff;
          border-radius:30px;
          text-decoration:none;
          font-weight:600;
          font-size:16px;
          transition:all 0.3s ease;
        }
        .s-cta:hover {
          background:#8e0101;
          transform:translateY(-2px);
          box-shadow:5px 5px 10px rgba(0,0,0,0.15);
        }
        @media (max-width: 768px) {
          .s-hero { padding: 30px 20px 60px !important; flex-direction: column !important; text-align: center; }
          .s-hero-right { display: none !important; }
          .s-hero-left { min-width: unset !important; width: 100% !important; }
          .s-stats { justify-content: center !important; gap: 24px !important; }
          .s-cta { padding: 14px 48px !important; }
        }
      `}</style>

      {/* Spacer for fixed nav */}
      <div style={{ height: 60 }} />

      <section
        className="s-hero"
        style={{
          position: "relative",
          zIndex: 5,
          background: "#FEF2F2",
          width: "100%",
          maxWidth: 1728,
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px clamp(20px,8vw,100px) 100px",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* Left text */}
        <div className="s-hero-left" style={{ flex: 1, minWidth: 280, zIndex: 10 }}>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Land Your{" "}
            <span className="s-gradient-text">Dream Job</span>
            <br />
            Faster
          </h1>

          <p style={{ marginTop: 40, fontSize: "clamp(16px,2vw,25px)", color: "#333" }}>
            Discover placement drives, register with a single click, and walk
            into your interview with a personalised QR pass.
          </p>

          <Link href="/register" className="s-cta">
            Get Started
          </Link>

          {/* Stats */}
          <div className="s-stats" style={{ display: "flex", gap: 50, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { val: "10K+", label: "Students Placed" },
              { val: "1200+", label: "Hiring Companies" },
              { val: "95%", label: "Satisfaction Rate" },
            ].map((s) => (
              <div key={s.label}>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    background: "linear-gradient(0deg,#C80101 6%,#7E0000 78%,#E40101 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.val}
                </h3>
                <p style={{ fontSize: 14, marginTop: 4, color: "#666" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div
          className="s-hero-right"
          style={{
            flex: 1,
            minWidth: 280,
            display: "flex",
            justifyContent: "flex-end",
            paddingLeft: 40,
            zIndex: 10,
          }}
        >
          <Image
            src="/student-img/students/landing.webp"
            alt="Student landing"
            width={760}
            height={520}
            priority
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 24,
            }}
          />
        </div>
      </section>
    </>
  );
}
