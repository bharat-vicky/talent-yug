"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LEFT_DOTS = [
  { src: "/college-img/college/1st_c.png",  alt: "Manual Placement",     top: 150, left: 230, maxWidth: 420 },
  { src: "/college-img/college/2nd_c.png",  alt: "Analytics",            top: 245, left: 300, maxWidth: 290 },
  { src: "/college-img/college/3rd_c.png",  alt: "Weak Network",         top: 345, left: 320, maxWidth: 330 },
  { src: "/college-img/college/4th_c.png",  alt: "50-60 Pace",           top: 465, left: 305, maxWidth: 320 },
  { src: "/college-img/college/5th_c.png",  alt: "Unstructured Student", top: 570, left: 250, maxWidth: 400 },
];

const RIGHT_DOTS = [
  { src: "/college-img/college/1st_cs.png", alt: "Strategic 7 Step Process", top: 150, right: 230, maxWidth: 330 },
  { src: "/college-img/college/2nd_cs.png", alt: "Real-Time Analytics",      top: 245, right: 295, maxWidth: 360 },
  { src: "/college-img/college/3rd_cs.png", alt: "Unified Digital Platform", top: 345, right: 320, maxWidth: 260 },
  { src: "/college-img/college/4th_cs.png", alt: "AI Powered Matching",      top: 465, right: 305, maxWidth: 290 },
  { src: "/college-img/college/5th_cs.png", alt: "Integrated Interview",     top: 570, right: 250, maxWidth: 355 },
];

export default function CollegeVS() {
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
        background: "#FEF2DD",
        overflow: "hidden",
        boxShadow: "0 -60px 80px rgba(0,0,0,0.15)",
        paddingBottom: 80,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .cvs-container { height: 420px !important; }
          .cvs-dot { display: none !important; }
          .cvs-backdrop { max-width: min(160px,42vw) !important; }
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
          Redefining Campus Placements
        </h2>
        <p style={{ marginTop: 15, fontSize: "clamp(16px,2vw,22px)", color: "#555" }}>
          Making hiring smarter, faster, and more transparent with TalentYug.
        </p>
      </div>

      {/* VS layout */}
      <div
        className="cvs-container"
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
          src="/college-img/college/prblm_c.png"
          alt="Without TalentYug"
          width={800}
          height={700}
          className="cvs-backdrop"
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
          src="/college-img/college/Solution.png"
          alt="With TalentYug"
          width={800}
          height={700}
          className="cvs-backdrop"
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
            width={420}
            height={200}
            className="cvs-dot"
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
            width={360}
            height={200}
            className="cvs-dot"
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
