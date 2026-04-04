"use client";

import { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    img: "/company-img/testimonials/s2.jpeg",
    name: "Abhay Chourasia",
    role: "Web Developer",
    text: "TalentYug genuinely simplifies campus hiring. The platform is structured and removes the chaos of managing candidates and interviews.",
  },
  {
    img: "/company-img/testimonials/U2.webp",
    name: "Rahul Verma",
    role: "Final Year Student (B.Tech)",
    text: "The mock interviews and clear tracking boosted my confidence. I knew exactly where I stood in every hiring process.",
  },
  {
    img: "/company-img/testimonials/U3.webp",
    name: "Dr. Anil Kumar",
    role: "Training & Placement Officer",
    text: "TalentYug brought structure and transparency to our placement process. Everything is now centralized and efficient.",
  },
  {
    img: "/company-img/testimonials/U1.webp",
    name: "Neha Singh",
    role: "HR Manager · Infosys",
    text: "Hiring from Tier 2/3 colleges used to be chaotic. TalentYug helped us shortlist better candidates, manage drives smoothly, and close offers faster.",
  },
];

export default function CompanyTestimonials() {
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      style={{
        padding: "clamp(60px,8vw,160px) 0",
        background: "#E4FBF8",
        position: "relative",
        zIndex: 11,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .cot-inner { gap: 30px !important; flex-direction: column !important; }
          .cot-left { max-width: 100% !important; }
          .cot-card-wrap { min-width: 100% !important; }
        }
      `}</style>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 100, padding: "0 20px" }}>
        <p style={{ fontSize: 28, color: "#666" }}>Client Stories</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, margin: "10px 0 20px" }}>
          Companies that hired smarter with TalentYug
        </h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
          <Image src="/company-img/companies/comma.png" alt="star" width={34} height={34} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>4.8</span>
          <span style={{ color: "#006F5F" }}>from 300+ company reviews</span>
        </div>
      </div>

      <div
        className="cot-inner"
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
        <div className="cot-left" style={{ maxWidth: 280, flexShrink: 0 }}>
          <Image
            src="/company-img/companies/comma.png"
            alt="quote"
            width={90}
            height={90}
            style={{ marginBottom: 20, opacity: 0.8 }}
          />
          <p style={{ fontSize: 26, lineHeight: 1.4 }}>
            Real companies. Real hires. Real results.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 22, marginTop: 30 }}>
            <span
              onClick={() => setPage(Math.max(0, page - 1))}
              style={{ cursor: "pointer", opacity: page === 0 ? 0.3 : 1, userSelect: "none" }}
            >←</span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#006F5F" }}>
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
              <div key={t.name} className="cot-card-wrap" style={{ minWidth: 300, flex: 1 }}>
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
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 13, color: "#006F5F", margin: 0 }}>{t.role}</p>
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
