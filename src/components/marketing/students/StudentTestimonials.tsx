"use client";

import { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    img: "/student-img/testimonials/s2.jpeg",
    name: "Ananya Kapoor",
    role: "Software Engineer · Google",
    text: "I got placed through a TalentYug campus drive. Registration to QR check-in — the whole experience was seamless.",
  },
  {
    img: "/student-img/testimonials/U2.webp",
    name: "Karan Singh",
    role: "Data Analyst · Flipkart",
    text: "The real-time status updates were a game changer. I always knew where I stood in the process.",
  },
  {
    img: "/student-img/testimonials/U3.webp",
    name: "Deepika Nair",
    role: "Product Manager · Razorpay",
    text: "No more manual queues or lost attendance sheets. TalentYug just works.",
  },
  {
    img: "/student-img/testimonials/U1.webp",
    name: "Arjun Patel",
    role: "Backend Developer · Zepto",
    text: "Getting my QR pass was instant. Walked in, scanned, and was in the interview room within minutes.",
  },
];

export default function StudentTestimonials() {
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      style={{
        padding: "clamp(60px,8vw,160px) 0",
        background: "#FEF2F2",
        position: "relative",
        zIndex: 11,
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .st-inner { gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .st-header { margin-bottom: 50px !important; }
          .st-inner { gap: 30px !important; flex-direction: column !important; }
          .st-left { max-width: 100% !important; }
          .st-card-wrap { min-width: unset !important; width: 100% !important; }
        }
      `}</style>
      {/* Header */}
      <div className="st-header" style={{ textAlign: "center", marginBottom: 100, padding: "0 20px" }}>
        <p style={{ fontSize: 28, color: "#666" }}>Student Stories</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, margin: "10px 0 20px" }}>
          Students who made it with TalentYug
        </h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
          <Image src="/student-img/testimonials/star.png" alt="star" width={34} height={34} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>4.9</span>
          <span style={{ color: "#7E0000" }}>from 500+ student reviews</span>
        </div>
      </div>

      <div
        className="st-inner"
        style={{
          maxWidth: 1310,
          margin: "auto",
          display: "flex",
          gap: 80,
          padding: "0 clamp(20px,4vw,40px)",
          flexWrap: "wrap",
        }}
      >
        {/* Left quote */}
        <div className="st-left" style={{ maxWidth: 280, flexShrink: 0 }}>
          <Image
            src="/student-img/students/comma.png"
            alt="quote"
            width={90}
            height={90}
            style={{ marginBottom: 20, opacity: 0.8, width: "auto" }}
          />
          <p style={{ fontSize: 26, lineHeight: 1.4 }}>
            Real students. Real placements. Real results.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 22, marginTop: 30 }}>
            <span
              onClick={() => setPage(Math.max(0, page - 1))}
              style={{ cursor: "pointer", opacity: page === 0 ? 0.3 : 1, userSelect: "none" }}
            >←</span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#7E0000" }}>
              {String(page + 1).padStart(2, "0")}
            </span>
            <span style={{ color: "#aaa" }}>/ {String(totalPages).padStart(2, "0")}</span>
            <span
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              style={{ cursor: "pointer", opacity: page === totalPages - 1 ? 0.3 : 1, userSelect: "none" }}
            >→</span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
            {visible.map((t) => (
              <div key={t.name} className="st-card-wrap" style={{ minWidth: 300, flex: 1 }}>
                <div
                  style={{
                    background: "#fff",
                    padding: 35,
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "20px 20px 20px 0",
                    boxShadow: "10px 10px 10px 0 rgba(0,0,0,0.4)",
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
                <div style={{ display: "flex", alignItems: "center", gap: 15, marginTop: 16 }}>
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={50}
                    height={50}
                    style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</p>
                    <p style={{ fontSize: 13, color: "#7E0000" }}>{t.role}</p>
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
