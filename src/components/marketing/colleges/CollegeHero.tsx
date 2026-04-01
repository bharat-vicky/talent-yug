import Image from "next/image";
import Link from "next/link";

const COL1 = ["1st", "2nd", "3rd", "4th", "5th"];
const COL2 = ["6th", "7th", "8th", "9th", "10th"];
const COL3 = ["11th", "13th", "14th", "12th", "15th"];

export default function CollegeHero() {
  return (
    <>
      <style>{`
        .c-hero::after {
          content: "";
          position: absolute;
          left: 200px;
          top: 100px;
          width: 600px;
          height: 500px;
          background: #FAD075;
          filter: blur(100px);
          opacity: 0.2;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        .c-gradient-text {
          color: #f89d46;
        }
        .c-cta {
          display: inline-block;
          margin-top: 80px;
          padding: 16px 80px;
          background: #f89d46;
          color: #fff;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .c-cta:hover {
          background: #e7852a;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0,0,0,0.15);
        }
        @keyframes scrollDownCollege {
          0%   { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .c-col-track {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 10px 0;
          animation: scrollDownCollege 20s linear infinite;
        }
        .c-col-track.speed2 { animation-duration: 10s; }
        .c-col-track.speed3 { animation-duration: 5s; }
        @media (max-width: 768px) {
          .c-hero { padding: 30px 20px 60px !important; flex-direction: column !important; text-align: center; }
          .c-hero-marquee { display: none !important; }
          .c-hero-left { min-width: unset !important; width: 100% !important; }
          .c-stats { justify-content: center !important; gap: 24px !important; }
          .c-cta { padding: 14px 48px !important; margin-top: 32px !important; }
        }
      `}</style>

      <div style={{ height: 60 }} />

      <section
        className="c-hero"
        style={{
          position: "relative",
          zIndex: 5,
          background: "#FFFAF6",
          width: "100%",
          maxWidth: 1728,
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px 100px 100px",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* Left text */}
        <div style={{ flex: 1, minWidth: 280, zIndex: 10 }}>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Turn Placements Into Your{" "}
            <span className="c-gradient-text">Competitive Advantage.</span>
          </h1>

          <p style={{ marginTop: 70, fontSize: "clamp(16px,2vw,25px)", color: "#333" }}>
            70%+ Placement Success Rate Data-Driven • Scalable Infrastructure
          </p>

          <Link href="/register" className="c-cta">
            Register
          </Link>

          {/* Stats */}
          <div style={{ display: "flex", gap: 50, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { val: "500+", label: "Colleges Onboarded" },
              { val: "1200+", label: "Hiring Companies" },
              { val: "70%+", label: "Placement Rate" },
            ].map((s) => (
              <div key={s.label}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f89d46", margin: 0 }}>
                  {s.val}
                </h3>
                <p style={{ fontSize: 14, marginTop: 4, color: "#666" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — scrolling image marquee */}
        <div
          style={{
            flex: 1,
            minWidth: 280,
            display: "flex",
            gap: 20,
            height: 700,
            overflow: "hidden",
            justifyContent: "flex-end",
          }}
        >
          {/* Column 1 */}
          <div style={{ width: 220, overflow: "hidden", position: "relative" }}>
            <div className="c-col-track speed1">
              {[...COL1, ...COL1].map((n, i) => (
                <Image
                  key={`c1-${i}`}
                  src={`/college-img/college/landing/${n}.webp`}
                  alt={n}
                  width={220}
                  height={160}
                  style={{ width: "100%", height: "auto", borderRadius: 12 }}
                />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ width: 220, overflow: "hidden", position: "relative" }}>
            <div className="c-col-track speed2">
              {[...COL2, ...COL2].map((n, i) => (
                <Image
                  key={`c2-${i}`}
                  src={`/college-img/college/landing/${n}.webp`}
                  alt={n}
                  width={220}
                  height={160}
                  style={{ width: "100%", height: "auto", borderRadius: 12 }}
                />
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div style={{ width: 220, overflow: "hidden", position: "relative" }}>
            <div className="c-col-track speed3">
              {[...COL3, ...COL3, ...COL3].map((n, i) => (
                <Image
                  key={`c3-${i}`}
                  src={`/college-img/college/landing/${n}.webp`}
                  alt={n}
                  width={220}
                  height={160}
                  style={{ width: "100%", height: "auto", borderRadius: 12 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
