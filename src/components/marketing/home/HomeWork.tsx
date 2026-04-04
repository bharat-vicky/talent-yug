"use client";

import Image from "next/image";

const WORK_CARDS = [
  {
    icon: "/home-img/landing/Folder.svg",
    title: "Create an Event",
    points: [
      "Set event details, capacity & dates",
      "Build custom pre-registration forms",
      "Set approval rules for attendees",
    ],
  },
  {
    icon: "/home-img/landing/Stat.png",
    title: "Manage Guests",
    points: [
      "Review & approve submissions",
      "Generate QR passes automatically",
      "Send confirmations with one click",
    ],
  },
  {
    icon: "/home-img/landing/User.png",
    title: "Scan & Analyse",
    points: [
      "Scan QR codes for instant check-in",
      "Monitor live attendance in real time",
      "Export placement reports post-event",
    ],
  },
];

export default function HomeWork() {
  return (
    <section style={{ padding: "30px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "auto", padding: "0 clamp(20px,4vw,40px)" }}>
        {/* Section title banner */}
        <div
          style={{
            background: "#2180A8",
            color: "white",
            textAlign: "center",
            padding: "15px",
            borderRadius: "20px 20px 0 0",
            margin: "40px 0 0",
            fontSize: 22,
          }}
        >
          How It Works
        </div>
        <div
          style={{
            background: "#2180A8",
            color: "white",
            textAlign: "center",
            padding: "15px",
            borderRadius: "0 0 20px 20px",
            margin: "0 0 40px",
            fontSize: 14,
            opacity: 0.85,
          }}
        >
          Three simple steps to run your placement drive
        </div>

        <div style={{ display: "flex", gap: 30, justifyContent: "center", flexWrap: "wrap" }}>
          {WORK_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                width: 320,
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 20,
                padding: 25,
                boxShadow: "15px 15px 10px 0px rgba(0,0,0,0.15)",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)")}
              onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")}
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={60}
                height={60}
                style={{ display: "block", marginBottom: 15, objectFit: "contain" }}
              />
              <h3 style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
                {card.title}
              </h3>
              <ul style={{ marginTop: 20, marginBottom: 20, paddingLeft: 0, textAlign: "left", listStyle: "none" }}>
                {card.points.map((p) => (
                  <li
                    key={p}
                    style={{ marginBottom: 10, fontSize: 14, position: "relative", paddingLeft: 20 }}
                  >
                    <span style={{ position: "absolute", left: 0 }}>–</span>
                    {p}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  padding: 10,
                  border: "none",
                  background: "#2180A8",
                  color: "white",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0c6e98"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2180A8"; }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
