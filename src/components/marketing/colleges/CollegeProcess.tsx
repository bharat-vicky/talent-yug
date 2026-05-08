"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  { n: "step1", icon: "/college-img/college/step1_c.png", title: "Onboard Your College", desc: "TPO registers + uploads student data - Basic college info - Student database structure", bg: "#F7E396", label: "#98853D", pos: { top: 0, left: 40 } },
  { n: "step2", icon: "/college-img/college/step2_c.png", title: "Connect with Companies", desc: "We bring 50+ pre-vetted companies - Companies post job requirements - Structured templates", bg: "#FF9F43", label: "#8F5F31", pos: { top: 0, left: 720 } },
  { n: "step3", icon: "/college-img/college/step3_c.png", title: "AI Matches Students", desc: "Our algorithm analyzes student profiles - Matches students to relevant roles - NOT mass blast - precision matching", bg: "#F7E396", label: "#98853D", pos: { top: 150, left: 380 } },
  { n: "step4", icon: "/college-img/college/step4_c.png", title: "Students Apply", desc: "Students see role-matched opportunities - Apply with 1-click - Access preparation resources", bg: "#FF9F43", label: "#8F5F31", pos: { top: 300, left: 40 } },
  { n: "step5", icon: "/college-img/college/step5_c.png", title: "Interview Management", desc: "Companies conduct interviews via platform - TPO tracks progress in real-time - Interview schedules auto-sync", bg: "#F7E396", label: "#98853D", pos: { top: 300, left: 720 } },
  { n: "step6", icon: "/college-img/college/step6_c.png", title: "Offer & Acceptance", desc: "Companies send offer via platform - Students accept/reject - Placement confirmed + salary documented", bg: "#FF9F43", label: "#8F5F31", pos: { top: 450, left: 720 } },
  { n: "step7", icon: "/college-img/college/step7_c.png", title: "Analytics & Reporting", desc: "TPO sees placement funnel - Conversion rates by company/role - Student salary distributions - Export reports for annual reporting", bg: "#F7E396", label: "#98853D", pos: { top: 450, left: 40 } },
];

const DESKTOP_PATH = "M 200 65 L 800 65 L 800 215 L 280 215 L 280 365 L 1060 365 L 1060 515 L 200 515";

export default function CollegeProcess() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!svg || !dot) return;

    function animateSignal() {
      const p = svg!.querySelector("path");
      if (!p) return;
      const totalLength = p.getTotalLength();
      const duration = 14000; // 14 seconds per loop (slightly longer for 7 steps)
      const startTime = performance.now();
      
      function move(now: number) {
        let progress = ((now - startTime) % duration) / duration;
        const pt = p!.getPointAtLength(totalLength * progress);
        dot!.setAttribute("cx", String(pt.x));
        dot!.setAttribute("cy", String(pt.y));
        requestAnimationFrame(move);
      }
      requestAnimationFrame(move);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animatedRef.current) {
            animateSignal();
            animatedRef.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cp-section {
          position: relative;
          min-height: 100vh;
          background: #FEF5E7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          overflow: hidden;
          z-index: 11;
          font-family: 'Inter', sans-serif;
        }
        .cp-container {
          position: relative;
          width: 1080px;
          height: 600px;
          max-width: 100%;
          z-index: 2;
        }
        .cp-card {
          position: absolute;
          width: 320px;
          padding: 16px 16px 16px 54px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          z-index: 2;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .cp-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
        }
        .cp-pill {
          position: absolute;
          left: 8px;
          top: 8px;
          bottom: 8px;
          width: 30px;
          border-radius: 15px;
          color: white;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .cp-svg-d {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: visible; /* allows line to extend outside bounds slightly */
        }
        @media (max-width: 1120px) {
          .cp-section { min-height: auto; padding: 80px 20px; }
          .cp-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
            height: auto !important;
            width: 100%;
            align-items: center;
          }
          .cp-container::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 20px;
            bottom: 20px;
            border-left: 2px dashed #111;
            transform: translateX(-50%);
            z-index: 0;
          }
          .cp-card {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            width: 100%;
            max-width: 360px;
          }
          .cp-svg-d { display: none; }
        }
      `}</style>

      <section ref={sectionRef} className="cp-section">
        {/* Background blob matching Figma */}
        <Image 
          src="/college-img/college/Union_c.png" 
          alt="" 
          width={1025} 
          height={800} 
          style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%,-50%)", 
            maxWidth: 1025, 
            width: "100%", 
            height: "auto", 
            opacity: 0.9, 
            zIndex: 1, 
            pointerEvents: "none" 
          }} 
        />

        <div className="cp-container">
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="cp-card"
              style={{ background: step.bg, ...(step.pos as React.CSSProperties) }}
            >
              <div className="cp-pill" style={{ background: step.label }}>
                Step-{idx + 1}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Image src={step.icon} alt={step.title} width={20} height={20} style={{ objectFit: "contain" }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111" }}>{step.title}</h3>
              </div>
              <p style={{ fontSize: 11.5, fontWeight: 500, color: "#222", lineHeight: 1.45, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}

          {/* Desktop connecting dashed lines */}
          <svg
            ref={svgRef}
            className="cp-svg-d"
            viewBox="0 0 1080 600"
          >
            <path 
              d={DESKTOP_PATH} 
              stroke="#111" 
              strokeWidth={2} 
              strokeDasharray="6 6" 
              fill="none" 
            />
            <circle 
              ref={dotRef} 
              r={7} 
              fill="#000" 
              style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.3))" }} 
            />
          </svg>
        </div>
      </section>
    </>
  );
}
