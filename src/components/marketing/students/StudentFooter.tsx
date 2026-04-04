import Image from "next/image";
import Link from "next/link";

export default function StudentFooter() {
  return (
    <>
      {/* Footer spacer with skyline image */}
      <section
        style={{
          backgroundColor: "#ffffff",
          position: "relative",
          overflow: "hidden",
          zIndex: 11,
          paddingTop: "clamp(60px,12vw,200px)",
        }}
        id="footer"
      >
        <div style={{ lineHeight: 0 }}>
          <Image
            src="/student-img/students/footerr.png"
            alt="Footer Background"
            width={1920}
            height={400}
            style={{ width: "100%", display: "block", margin: 0, height: "auto" }}
          />
        </div>
      </section>

      {/* Footer content */}
      <section style={{ backgroundColor: "#FFBABA", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            padding: "10px 20px 40px",
            color: "#f8ffff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {/* Social */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ fontSize: "clamp(18px,2vw,25px)", fontWeight: 700, margin: 0 }}>Social</h3>
              <Link href="https://www.instagram.com/talentyug.in" target="_blank" rel="noopener" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>Instagram</Link>
              <Link href="https://x.com/talentyugpvtltd" target="_blank" rel="noopener" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>Twitter(X)</Link>
              <Link href="https://www.linkedin.com/company/talentyug-private-limited/" target="_blank" rel="noopener" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>LinkedIn</Link>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>Facebook</Link>
            </div>

            {/* Quick Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ fontSize: "clamp(18px,2vw,25px)", fontWeight: 700, margin: 0 }}>Quick Links</h3>
              <Link href="/colleges" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>For Colleges</Link>
              <Link href="/companies" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>For Companies</Link>
              <Link href="/students" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>For Students</Link>
              <Link href="#footer" style={{ fontSize: 18, color: "#f8ffff", textDecoration: "none" }}>About Us</Link>
            </div>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }} id="contact">
              <h3 style={{ fontSize: "clamp(18px,2vw,25px)", fontWeight: 700, margin: 0 }}>Contacts</h3>
              <p style={{ fontSize: 18, color: "#f8ffff", margin: 0 }}>Call <a href="tel:+918210597576" style={{ color: "#f8ffff" }}>+91 8210597576</a></p>
              <p style={{ fontSize: 18, color: "#f8ffff", margin: 0 }}>Email <a href="mailto:connect@talentyug.in" style={{ color: "#f8ffff" }}>connect@talentyug.in</a></p>
              <p style={{ fontSize: 18, color: "#f8ffff", margin: 0 }}>Bihta, Patna, Bihar-801103</p>
            </div>

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src="/student-img/logo.png" alt="TalentYug" width={60} height={60} style={{ maxWidth: 60 }} />
              <span style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "#1F3F68" }}>TalentYug</span>
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: 18, paddingTop: 10 }}>
            Copyright 2026-27 | All Rights Reserved | Privacy Policy | Terms Of Service
          </div>
        </div>
      </section>
    </>
  );
}
