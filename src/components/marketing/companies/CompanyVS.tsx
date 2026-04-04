"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LEFT_DOTS = [
  { src: "/company-img/companies/manual placement.png",    alt: "Manual Placement",     top: 150, left: 240, maxWidth: 350 },
  { src: "/company-img/companies/analytics.png",           alt: "No Analytics",         top: 245, left: 305, maxWidth: 350 },
  { src: "/company-img/companies/weak netwrk.png",         alt: "Weak Network",         top: 350, left: 325, maxWidth: 260 },
  { src: "/company-img/companies/50-60 pacemnt.png",       alt: "Slow Pace",            top: 465, left: 305, maxWidth: 290 },
  { src: "/company-img/companies/unstructured stdnt.png",  alt: "Unstructured Process", top: 570, left: 240, maxWidth: 350 },
];

const RIGHT_DOTS = [
  { src: "/company-img/companies/str 7 step.png",           alt: "Strategic 7 Step Process", top: 150, right: 240, maxWidth: 350 },
  { src: "/company-img/companies/real time.png",            alt: "Real-Time Analytics",      top: 245, right: 305, maxWidth: 350 },
  { src: "/company-img/companies/unified dig.png",          alt: "Unified Digital Platform", top: 360, right: 325, maxWidth: 350 },
  { src: "/company-img/companies/ai powered.png",           alt: "AI Powered Matching",      top: 465, right: 305, maxWidth: 300 },
  { src: "/company-img/companies/integrated intervoew.png", alt: "Integrated Interview",     top: 570, right: 240, maxWidth: 300 },
];

export default function CompanyVS() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 100,
        background: "#E4FBF8",
        overflow: "hidden",
        boxShadow: "0 -60px 80px rgba(0,0,0,0.15)",
        paddingBottom: 80,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .covs-container { height: 420px !important; }
          .covs-dot { display: none !important; }
          .covs-backdrop { max-width: min(160px,42vw) !important; }
        }
      `}</style>
      {/* Title */}
      <div
        ref={titleRef}
        style={{
          position: "relative",
          marginTop: 100,
          textAlign: "center",
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(80px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
          padding: "0 20px",
        }}
      >
        <h2 style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 700 }}>
          Redefining Campus Hiring
        </h2>
        <p style={{ marginTop: 15, fontSize: "clamp(16px,2vw,22px)", color: "#555" }}>
          Making hiring smarter, faster, and more transparent with TalentYug.
        </p>
      </div>

      {/* VS layout */}
      <div
        className="covs-container"
        style={{
          position: "relative",
          height: 760,
          maxWidth: "100%",
          overflow: "hidden",
          marginTop: 60,
        }}
      >
        {/* Left backdrop */}
        <Image
          src="/company-img/companies/left.png"
          alt="Without TalentYug"
          width={800}
          height={700}
          className="covs-backdrop"
          style={{
            position: "absolute",
            top: 90,
            left: 0,
            maxWidth: "min(360px,38vw)",
            height: "auto",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />

        {/* Right backdrop */}
        <Image
          src="/company-img/companies/right.png"
          alt="With TalentYug"
          width={800}
          height={700}
          className="covs-backdrop"
          style={{
            position: "absolute",
            top: 90,
            right: 0,
            maxWidth: "min(360px,38vw)",
            height: "auto",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />

        {/* Center divider */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 120,
            height: 550,
            width: 3,
            background: "#8a8a8a",
          }}
        />

        {/* VS badge */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 380,
            transform: "translate(-50%,-50%)",
            width: 90,
            height: 90,
            background: "#ececec",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 18,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          VS
        </div>

        {/* Left dots */}
        {LEFT_DOTS.map((d) => (
          <Image
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={350}
            height={200}
            className="covs-dot"
            style={{
              position: "absolute",
              top: d.top,
              left: d.left,
              maxWidth: d.maxWidth,
              height: "auto",
            }}
          />
        ))}

        {/* Right dots */}
        {RIGHT_DOTS.map((d) => (
          <Image
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={350}
            height={200}
            className="covs-dot"
            style={{
              position: "absolute",
              top: d.top,
              right: d.right,
              maxWidth: d.maxWidth,
              height: "auto",
            }}
          />
        ))}
      </div>
    </section>
  );
}
