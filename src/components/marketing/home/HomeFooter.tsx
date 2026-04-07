import Image from "next/image";
import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>
      {/* Footer background image - above footer content */}
      <div style={{ position: "relative", width: "100%", height: 300 }}>
        <Image
          src="/home-img/landing/foot.png"
          alt="Footer background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
      </div>

      {/* Footer content section with links and company info */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "60px 40px",
          color: "#fff",
          background: "#2180A8",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Image
                src="/home-img/logo.png"
                alt="TalentYug"
                width={40}
                height={40}
                style={{ height: 40, width: "auto" }}
              />
              <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
                TalentYug
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
              }}
            >
              Connecting students, colleges, and companies through seamless
              campus recruitment events.
            </p>
          </div>

          {/* Links */}
          {[
            {
              heading: "Platform",
              links: [
                { label: "For Students", href: "/students" },
                { label: "For Colleges", href: "/colleges" },
                { label: "For Companies", href: "/companies" },
              ],
            },
            {
              heading: "Features",
              links: [
                { label: "Event Management", href: "/login" },
                { label: "QR Check-in", href: "/login" },
                { label: "Analytics", href: "/login" },
              ],
            },
            {
              heading: "Account",
              links: [
                { label: "Sign Up", href: "/register" },
                { label: "Log In", href: "/login" },
                { label: "Reset Password", href: "/forgot-password" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 10 }}>
                    <Link
                      href={l.href}
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <p>© {new Date().getFullYear()} TalentYug. All rights reserved.</p>
          <p>Built for campus recruitment excellence.</p>
        </div>
      </div>
    </footer>
  );
}
