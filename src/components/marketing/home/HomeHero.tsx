"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Card images from original: l1–l4.webp with flow animation
const CARDS = [
  { src: "/home-img/landing/l1.webp", delay: "0s" },
  { src: "/home-img/landing/l2.webp", delay: "2s" },
  { src: "/home-img/landing/l3.webp", delay: "4s" },
  { src: "/home-img/landing/l4.webp", delay: "6s" },
];

export default function HomeHero() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.querySelector("header") as HTMLElement | null;
    headerRef.current = el;
    const handleScroll = () => {
      if (el) el.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes flow {
          0%   { opacity:0; transform:translateY(-120px) scale(0.9) rotate(0deg); z-index:5; }
          20%  { opacity:1; transform:translateY(0px) scale(1) rotate(0deg); z-index:10; }
          40%  { transform:translateY(10px) scale(0.98) rotate(2deg); }
          70%  { opacity:0.7; transform:translateY(80px) scale(0.95) rotate(6deg); z-index:2; }
          100% { opacity:0; transform:translateY(140px) scale(0.9) rotate(10deg); z-index:1; }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-10px); }
        }
        .card-stack { animation: floatY 6s ease-in-out infinite; }
        .flow-card  { animation: flow 8s infinite; }
        .hero-glow::after {
          content:"";
          position:absolute;
          right:0;
          top:120px;
          width:900px;
          height:650px;
          background:#2180A8;
          filter:blur(100px);
          opacity:0.2;
          border-radius:50%;
          z-index:0;
          pointer-events:none;
        }
        .template-card { transition: transform 0.3s ease; }
        .template-card:hover { transform: translateY(-8px); }
      `}</style>

      <section
        className="hero-glow relative flex justify-between items-center"
        style={{
          padding: "80px 80px",
          height: "100vh",
          background: "#ffffff",
        }}
      >
        {/* Left text */}
        <div style={{ maxWidth: 600, zIndex: 10 }}>
          <h1
            style={{
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 700,
              color: "#005070",
              marginBottom: 20,
              lineHeight: 1.15,
              fontFamily: "Geist, Inter, sans-serif",
            }}
          >
            Where Talent Meets Opportunity
          </h1>
          <p style={{ fontSize: "clamp(16px,2vw,26px)", color: "#555", marginTop: 20 }}>
            Connecting students, colleges and companies through seamless campus
            recruitment, QR check-ins, and real-time placement analytics.
          </p>

          <Link
            href="/register"
            style={{
              display: "inline-block",
              marginTop: 60,
              marginBottom: 60,
              padding: "16px 80px",
              background: "#2180A8",
              color: "#fff",
              border: "none",
              borderRadius: 30,
              cursor: "pointer",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#0c6e98";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2180A8";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Get Started
          </Link>

          {/* Stats */}
          <div style={{ display: "flex", gap: 50 }}>
            {[
              { val: "500+", label: "Colleges" },
              { val: "10K+", label: "Students Placed" },
              { val: "1200+", label: "Companies" },
            ].map((s) => (
              <div key={s.label}>
                <h3 style={{ marginTop: 20, fontSize: 20, fontWeight: 700 }}>
                  {s.val}
                </h3>
                <p style={{ fontSize: 15, marginTop: 5, color: "#555" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — flowing card stack */}
        <div
          style={{
            position: "relative",
            width: "clamp(280px,30vw,420px)",
            height: "clamp(350px,40vw,520px)",
            marginRight: 50,
            flexShrink: 0,
            perspective: "1000px",
            zIndex: 10,
          }}
        >
          <div className="card-stack" style={{ position: "relative", width: "100%", height: "100%" }}>
            {CARDS.map((c, i) => (
              <Image
                key={c.src}
                src={c.src}
                alt={`Placement scene ${i + 1}`}
                fill
                className="flow-card"
                style={{
                  objectFit: "cover",
                  borderRadius: 25,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                  animationDelay: c.delay,
                  position: "absolute",
                }}
                sizes="420px"
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
