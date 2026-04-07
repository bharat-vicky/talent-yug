import Link from "next/link";

export default function AboutFooter() {
  return (
    <>
      <style>{`
        .ab-footer-link {
          font-size: 18px;
          color: #93c5fd;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ab-footer-link:hover {
          color: #ffffff;
        }
        @media (max-width: 640px) {
          .ab-footer-cols { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>

      {/* Skyline section */}
      <section
        style={{
          backgroundColor: "#eff6ff",
          position: "relative",
          overflow: "hidden",
          zIndex: 11,
          paddingTop: "clamp(60px,10vw,160px)",
        }}
        id="footer"
      >
        {/* City skyline SVG */}
        <div style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: "100%", display: "block", height: "auto" }}
          >
            {/* Sky gradient background */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <rect width="1440" height="200" fill="url(#skyGrad)" />

            {/* Buildings — blue filled */}
            {/* Far background */}
            <rect x="0"    y="120" width="60"  height="80"  fill="#1e40af" opacity="0.5" />
            <rect x="55"   y="100" width="50"  height="100" fill="#1d4ed8" opacity="0.5" />
            <rect x="100"  y="130" width="70"  height="70"  fill="#1e3a8a" opacity="0.5" />
            <rect x="165"  y="90"  width="55"  height="110" fill="#1d4ed8" opacity="0.55" />
            <rect x="215"  y="115" width="80"  height="85"  fill="#1e40af" opacity="0.5" />
            <rect x="290"  y="75"  width="60"  height="125" fill="#1e3a8a" opacity="0.6" />
            <rect x="345"  y="105" width="90"  height="95"  fill="#1d4ed8" opacity="0.5" />
            <rect x="430"  y="85"  width="50"  height="115" fill="#1e40af" opacity="0.55" />
            <rect x="475"  y="60"  width="70"  height="140" fill="#1e3a8a" opacity="0.6" />
            <rect x="540"  y="95"  width="80"  height="105" fill="#1d4ed8" opacity="0.5" />
            <rect x="615"  y="70"  width="55"  height="130" fill="#1e40af" opacity="0.55" />
            <rect x="665"  y="40"  width="90"  height="160" fill="#1e3a8a" opacity="0.65" />
            <rect x="750"  y="80"  width="65"  height="120" fill="#1d4ed8" opacity="0.55" />
            <rect x="810"  y="55"  width="75"  height="145" fill="#1e40af" opacity="0.6" />
            <rect x="880"  y="100" width="60"  height="100" fill="#1e3a8a" opacity="0.5" />
            <rect x="935"  y="70"  width="80"  height="130" fill="#1d4ed8" opacity="0.55" />
            <rect x="1010" y="90"  width="55"  height="110" fill="#1e40af" opacity="0.5" />
            <rect x="1060" y="50"  width="85"  height="150" fill="#1e3a8a" opacity="0.6" />
            <rect x="1140" y="85"  width="60"  height="115" fill="#1d4ed8" opacity="0.55" />
            <rect x="1195" y="110" width="75"  height="90"  fill="#1e40af" opacity="0.5" />
            <rect x="1265" y="75"  width="70"  height="125" fill="#1e3a8a" opacity="0.55" />
            <rect x="1330" y="95"  width="55"  height="105" fill="#1d4ed8" opacity="0.5" />
            <rect x="1380" y="60"  width="60"  height="140" fill="#1e40af" opacity="0.55" />

            {/* Windows */}
            {[
              [480,70],[490,70],[480,82],[490,82],[480,94],[490,94],
              [670,52],[680,52],[670,64],[680,64],[670,76],[680,76],
              [815,65],[825,65],[815,77],[825,77],[815,89],[825,89],
              [1065,60],[1075,60],[1065,72],[1075,72],[1065,84],[1075,84],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="6" height="8" rx="1" fill="#93c5fd" opacity="0.7" />
            ))}

            {/* Ground fill */}
            <rect x="0" y="195" width="1440" height="10" fill="#1e3a8a" />
          </svg>
        </div>
      </section>

      {/* Footer content */}
      <section
        style={{ backgroundColor: "#0f1f4b", overflow: "hidden" }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "auto",
            padding: "48px 20px 36px",
            color: "#93c5fd",
          }}
        >
          <div
            className="ab-footer-cols"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 36,
            }}
          >
            {/* Social */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3
                style={{
                  fontSize: "clamp(16px,2vw,22px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Social
              </h3>
              <Link
                href="https://www.instagram.com/talentyug.in"
                target="_blank"
                rel="noopener"
                className="ab-footer-link"
              >
                Instagram
              </Link>
              <Link
                href="https://x.com/talentyugpvtltd"
                target="_blank"
                rel="noopener"
                className="ab-footer-link"
              >
                Twitter(X)
              </Link>
              <Link
                href="https://www.linkedin.com/company/talentyug-private-limited/"
                target="_blank"
                rel="noopener"
                className="ab-footer-link"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                className="ab-footer-link"
              >
                Facebook
              </Link>
            </div>

            {/* Quick Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3
                style={{
                  fontSize: "clamp(16px,2vw,22px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Quick Links
              </h3>
              <Link href="/colleges" className="ab-footer-link">
                For Colleges
              </Link>
              <Link href="/companies" className="ab-footer-link">
                For Companies
              </Link>
              <Link href="/students" className="ab-footer-link">
                For Students
              </Link>
              <Link href="/about" className="ab-footer-link">
                About Us
              </Link>
            </div>

            {/* Contact */}
            <div
              id="contact"
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <h3
                style={{
                  fontSize: "clamp(16px,2vw,22px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Contacts
              </h3>
              <p style={{ fontSize: 16, color: "#93c5fd", margin: 0 }}>
                Call{" "}
                <a href="tel:+919876543210" style={{ color: "#bfdbfe" }}>
                  +91 9876543210
                </a>
              </p>
              <p style={{ fontSize: 16, color: "#93c5fd", margin: 0 }}>
                Email{" "}
                <a href="mailto:Connect@TalentYug.in" style={{ color: "#bfdbfe" }}>
                  Connect@TalentYug.in
                </a>
              </p>
              <p style={{ fontSize: 16, color: "#93c5fd", margin: 0 }}>Patna, Bihar</p>
            </div>

            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* TalentYug text logo */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "clamp(22px,3vw,36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                TalentYug
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(147,197,253,0.15)",
              marginBottom: 20,
            }}
          />

          <div
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "rgba(147,197,253,0.6)",
              paddingTop: 4,
            }}
          >
            Copyright 2026-27 | All Rights Reserved | Privacy Policy | Terms Of Service
          </div>
        </div>
      </section>
    </>
  );
}
