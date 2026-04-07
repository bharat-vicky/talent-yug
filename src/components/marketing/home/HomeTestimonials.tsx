"use client";

import { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    img: "/home-img/testimonials/s2.jpeg",
    name: "Aryan Singh",
    role: "Student · IIT Patna",
    text: "TalentYug reduced our placement event chaos by 80%. QR check-ins that used to take 2 hours now finish in 15 minutes.",
  },
  {
    img: "/home-img/testimonials/U2.webp",
    name: "Rahul Mehta",
    role: "HR Head · Infosys",
    text: "The pre-registration forms and analytics saved our team hours of manual work each campus season.",
  },
  {
    img: "/home-img/testimonials/U3.webp",
    name: "Vikram Nair",
    role: "Final Year · IIT Patna",
    text: "The QR pass made check-in super smooth. I didn't have to wait in long queues at all!",
  },
  {
    img: "/home-img/testimonials/U1.webp",
    name: "Anjali Verma",
    role: "Final Year · IIT Patna",
    text: "We hired 300 engineers across 20 campuses in one season using TalentYug. Scale and quality — unmatched.",
  },
];

export default function HomeTestimonials() {
  const [page, setPage] = useState(0);
  const visible = TESTIMONIALS.slice(page * 2, page * 2 + 2);
  const total = Math.ceil(TESTIMONIALS.length / 2);

  return (
    <section
      style={{
        padding: "clamp(60px,8vw,160px) 0",
        background: "#ffffff",
        position: "relative",
        zIndex: 11,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ht-inner { gap: 30px !important; flex-direction: column !important; }
          .ht-left { max-width: 100% !important; }
          .ht-card-wrap { min-width: 100% !important; }
        }
      `}</style>
      <div style={{ textAlign: "center", marginBottom: 100 }}>
        <h2
          style={{
            fontSize: "clamp(22px,3.5vw,42px)",
            fontWeight: 800,
            margin: "0 0 16px",
            color: "#1e3a8a",
          }}
        >
          Read Reviews, ride with Confidence
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            src="/home-img/testimonials/star.png"
            alt="star"
            width={28}
            height={28}
          />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#374151" }}>
            4.2/5
          </span>
          <span style={{ color: "#6b7280", fontSize: 15 }}>
            Based on 2026 reviews.
          </span>
        </div>
      </div>

      <div
        className="ht-inner"
        style={{
          maxWidth: 1310,
          margin: "auto",
          display: "flex",
          gap: 80,
          padding: "0 clamp(20px,4vw,40px)",
          flexWrap: "wrap",
        }}
      >
        {/* Left quote side */}
        <div className="ht-left" style={{ maxWidth: 280, flexShrink: 0 }}>
          <Image
            src="/home-img/landing/commaa.png"
            alt="quote"
            width={90}
            height={90}
            style={{ marginBottom: 20, opacity: 0.8, width: "auto" }}
          />
          <p style={{ fontSize: 26, lineHeight: 1.4 }}>
            Real stories from real people using TalentYug every placement
            season.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              fontSize: 22,
              marginTop: 30,
            }}
          >
            <span
              onClick={() => setPage(Math.max(0, page - 1))}
              style={{
                cursor: "pointer",
                userSelect: "none",
                opacity: page === 0 ? 0.3 : 1,
              }}
            >
              ←
            </span>
            <span style={{ fontSize: 36, fontWeight: 800 }}>
              {String(page + 1).padStart(2, "0")}
            </span>
            <span style={{ color: "#aaa" }}>
              / {String(total).padStart(2, "0")}
            </span>
            <span
              onClick={() => setPage(Math.min(total - 1, page + 1))}
              style={{
                cursor: "pointer",
                userSelect: "none",
                opacity: page === total - 1 ? 0.3 : 1,
              }}
            >
              →
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 30,
              transition: "0.6s ease",
              flexWrap: "wrap",
            }}
          >
            {visible.map((t) => (
              <div
                key={t.name}
                className="ht-card-wrap"
                style={{ minWidth: 300, flex: 1 }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: 35,
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "20px 20px 20px 0px",
                    boxShadow: "10px 10px 10px 0px rgba(0,0,0,0.2)",
                    minHeight: 180,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: "#333",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {t.text}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    marginTop: 16,
                  }}
                >
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={50}
                    height={50}
                    style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</p>
                    <p style={{ fontSize: 13, color: "#666" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
