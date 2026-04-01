import Image from "next/image";
import Link from "next/link";

export default function CompanyHero() {
  return (
    <>
      <style>{`
        .co-hero::after {
          content: "";
          position: absolute;
          right: 30px;
          top: 120px;
          width: 900px;
          height: 650px;
          background: #006F5F;
          filter: blur(70px);
          opacity: 0.2;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        .co-gradient-text {
          background: linear-gradient(180deg, #00B69B 0%, #006F5F 0.01%, #00A189 37.98%, #007665 45.19%, #00AA91 69.71%, #00B197 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .co-cta {
          display: inline-block;
          margin-top: 40px;
          padding: 16px 80px;
          background: #006F5F;
          color: #fff;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .co-cta:hover {
          background: #0FB79C;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0,0,0,0.15);
        }
      `}</style>

      <div style={{ height: 60 }} />

      <section
        className="co-hero"
        style={{
          position: "relative",
          zIndex: 5,
          background: "#E4FBF8",
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
              lineHeight: 1.1,
            }}
          >
            <span className="co-gradient-text">Hire Pre-Filtered</span>
            <br />
            <span className="co-gradient-text">Talent</span> From
            <br />
            Tier 2/3 Colleges.
          </h1>

          <p style={{ marginTop: 40, fontSize: "clamp(16px,2vw,25px)", color: "#333" }}>
            Curated Candidate Pools | Fast Hiring |<br />Reduced Time-to-Hire
          </p>

          <Link href="/register" className="co-cta">
            Register
          </Link>

          {/* Stats */}
          <div style={{ display: "flex", gap: 50, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { val: "1200+", label: "Hiring Companies" },
              { val: "500+", label: "Partner Colleges" },
              { val: "10K+", label: "Placements Done" },
            ].map((s) => (
              <div key={s.label}>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    background: "linear-gradient(180deg,#00B69B 0%,#006F5F 0.01%,#00A189 37.98%,#007665 45.19%,#00AA91 69.71%,#00B197 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: 0,
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
            src="/company-img/companies/landing.webp"
            alt="Company landing"
            width={760}
            height={665}
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
