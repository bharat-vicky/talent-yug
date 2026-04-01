import Image from "next/image";

const TEMPLATES = [
  {
    bg: "/home-img/landing/College.png",
    icon: "/home-img/landing/col.png",
    title: "For Colleges",
    bullets: [
      "Manage all placement drives in one place",
      "Verify & shortlist students easily",
      "Real-time placement analytics",
    ],
    href: "/colleges",
  },
  {
    bg: "/home-img/landing/Company.png",
    icon: "/home-img/landing/com.png",
    title: "For Companies",
    bullets: [
      "Access pre-screened campus talent",
      "Smart candidate filtering",
      "Run multi-campus drives at scale",
    ],
    href: "/companies",
  },
  {
    bg: "/home-img/landing/student.png",
    icon: "/home-img/landing/stu.png",
    title: "For Students",
    bullets: [
      "Discover placement drives",
      "One-click pre-registration",
      "Get your QR pass instantly",
    ],
    href: "/students",
  },
];

export default function HomeWhy() {
  return (
    <section
      style={{
        padding: "60px 60px",
        background: "#ffffff",
        minHeight: "80vh",
      }}
    >
      <style>{`
        .template-card {
          position:relative;
          width:330px;
          min-height:170px;
          padding:20px;
          border-radius:40px;
          color:white;
          text-align:left;
          overflow:hidden;
          box-shadow:10px 10px 10px 0px rgba(0,80,112,0.35);
          transition:transform 0.3s;
          background-size:cover;
          background-position:center;
          flex-shrink:0;
        }
        .template-card:hover { transform:translateY(-8px); }
        .template-card::before {
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(27,73,101,0.65),rgba(44,125,160,0.65));
          z-index:1;
          border-radius:40px;
        }
        .template-card * { position:relative; z-index:2; }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h2 style={{ color: "#005070", fontSize: 25, marginBottom: 10 }}>
          Why TalentYug?
        </h2>
        <p style={{ color: "#555", marginBottom: 50 }}>
          One platform for every stakeholder in campus recruitment.
        </p>

        {/* Feature diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 50,
            marginBottom: 80,
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ color: "#005070", fontSize: 25, marginBottom: 16 }}>
              A unified platform
            </h2>
            <p style={{ color: "#555", lineHeight: 1.6, textAlign: "justify" }}>
              TalentYug brings together every part of the campus recruitment journey —
              from event creation and pre-registration to QR-based check-in and
              post-event analytics — into one seamless workflow.
            </p>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Image
              src="/home-img/landing/points.png"
              alt="TalentYug platform diagram"
              width={650}
              height={400}
              style={{ width: "100%", maxWidth: 650, height: "auto" }}
            />
          </div>
        </div>

        {/* Template cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 30,
            flexWrap: "wrap",
            marginBottom: 80,
          }}
        >
          {TEMPLATES.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className="template-card"
              style={{ backgroundImage: `url(${t.bg})` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Image src={t.icon} alt={t.title} width={35} height={35} style={{ objectFit: "contain" }} />
                <h3 style={{ fontSize: 17, margin: 0 }}>{t.title}</h3>
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
                {t.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
