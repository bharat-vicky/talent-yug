"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Left side: problem images  Right side: solution images
const LEFT_DOTS = [
  { src: "/student-img/students/1st.png",  alt: "Manual Placement",       cls: { top: 150, left: 230, maxWidth: 350 } },
  { src: "/student-img/students/5th.png",  alt: "No Analytics",           cls: { top: 245, left: 300, maxWidth: 350 } },
  { src: "/student-img/students/3rd.png",  alt: "Weak Network",           cls: { top: 350, left: 320, maxWidth: 280 } },
  { src: "/student-img/students/4th.png",  alt: "Slow Pace",              cls: { top: 465, left: 305, maxWidth: 290 } },
  { src: "/student-img/students/2nd.png",  alt: "Unstructured Process",   cls: { top: 570, left: 240, maxWidth: 350 } },
];

const RIGHT_DOTS = [
  { src: "/student-img/students/1st_s.png", alt: "Strategic 7 Step Process", cls: { top: 150, right: 230, maxWidth: 370 } },
  { src: "/student-img/students/5th_s.png", alt: "Real-Time Analytics",      cls: { top: 245, right: 300, maxWidth: 360 } },
  { src: "/student-img/students/3rd_s.png", alt: "Unified Digital Platform", cls: { top: 360, right: 320, maxWidth: 320 } },
  { src: "/student-img/students/4th_s.png", alt: "AI Powered Matching",      cls: { top: 465, right: 305, maxWidth: 350 } },
  { src: "/student-img/students/2nd_s.png", alt: "Integrated Interview",     cls: { top: 570, right: 240, maxWidth: 300 } },
];

export default function StudentVS() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  // Fade-in on scroll for title
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
        background: "#FEF2F2",
        overflow: "hidden",
        boxShadow: "0 -60px 80px rgba(0,0,0,0.15)",
        paddingBottom: 80,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .svs-container { height: 420px !important; }
          .svs-dot { display: none !important; }
          .svs-backdrop { max-width: min(160px,42vw) !important; }
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
          Before vs After
        </h2>
        <p style={{ marginTop: 15, fontSize: "clamp(16px,2vw,22px)", color: "#555" }}>
          See how TalentYug transforms the campus placement experience for students
        </p>
      </div>

      {/* Problem / Solution big backdrop images + floating comparison dots */}
      <div
        className="svs-container"
        style={{
          position: "relative",
          height: 760,
          maxWidth: "100%",
          overflow: "hidden",
          marginTop: 60,
        }}
      >
        {/* Left big problem backdrop */}
        <Image
          src="/student-img/students/problem.png"
          alt="Without TalentYug"
          width={800}
          height={700}
          className="svs-backdrop"
          style={{
            position: "absolute",
            top: 90,
            left: 0,
            maxWidth: "min(360px,38vw)",
            height: "auto",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />

        {/* Right big solution backdrop */}
        <Image
          src="/student-img/students/Solution.png"
          alt="With TalentYug"
          width={800}
          height={700}
          className="svs-backdrop"
          style={{
            position: "absolute",
            top: 90,
            right: 0,
            maxWidth: "min(360px,38vw)",
            height: "auto",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />

        {/* Center divider line */}
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

        {/* Floating left dot images */}
        {LEFT_DOTS.map((d) => (
          <Image
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={350}
            height={200}
            className="svs-dot"
            style={{
              position: "absolute",
              top: d.cls.top,
              left: d.cls.left,
              maxWidth: d.cls.maxWidth,
              height: "auto",
              transition: "all 0.1s linear",
            }}
          />
        ))}

        {/* Floating right dot images */}
        {RIGHT_DOTS.map((d) => (
          <Image
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={370}
            height={200}
            className="svs-dot"
            style={{
              position: "absolute",
              top: d.cls.top,
              right: d.cls.right,
              maxWidth: d.cls.maxWidth,
              height: "auto",
              transition: "all 0.1s linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}
