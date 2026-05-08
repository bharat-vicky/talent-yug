"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  { n: "step1", icon: "/student-img/students/step1_s.png", title: "Sign Up", desc: "Student registers with email/college - Completes profile - Full name, email, phone - College, batch year, CGPA - Skills & certifications - Location preferences - Salary expectations", bg: "#f66d88", label: "#8C0E0F", pos: { top: 0, left: 40 } },
  { n: "step2", icon: "/student-img/students/step2_s.png", title: "Browse Opportunities", desc: "View job listings from 50+ companies - Filter by role, salary, location, skills - See job details + company info - Apply with 1-click (auto-filled profile)", bg: "#FFC2CA", label: "#8C0E0F", pos: { top: 0, left: 720 } },
  { n: "step3", icon: "/student-img/students/step3_s.png", title: "Prepare for Interview", desc: "Access mock interview platform - Practice with role-specific questions - Get AI-generated feedback - Access interview tips & resources - View tips from TalentYug blog", bg: "#f66d88", label: "#8C0E0F", pos: { top: 150, left: 380 } },
  { n: "step4", icon: "/student-img/students/step4_s.png", title: "Interview", desc: "Receive interview notification - Interview link provided (video call integration) - Interview conducted with company - Feedback visible after (from interviewer)", bg: "#FFC2CA", label: "#8C0E0F", pos: { top: 300, left: 40 } },
  { n: "step5", icon: "/student-img/students/step5_s.png", title: "Get Offer", desc: "Receive offer via platform - Accept/reject offer - View offer details (role, salary, joining date, benefits) - Download offer letter", bg: "#f66d88", label: "#8C0E0F", pos: { top: 300, left: 720 } },
  { n: "step6", icon: "/student-img/students/step6_s.png", title: "Track Progress", desc: "Application status tracker - Interview feedback review - Accepted offer details - Post-hire onboarding support", bg: "#FFC2CA", label: "#8C0E0F", pos: { top: 450, left: 380 } },
];

const DESKTOP_PATH = "M 200 65 L 800 65 L 800 215 L 280 215 L 280 365 L 800 365 L 800 515 L 540 515";

export default function StudentProcess() {
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
      const duration = 12000; // 12 seconds per loop
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
        .sp-section {
          position: relative;
          min-height: 100vh;
          background: #FEF2F2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          overflow: hidden;
          z-index: 11;
          font-family: 'Inter', sans-serif;
        }
        .sp-container {
          position: relative;
          width: 1080px;
          height: 600px;
          max-width: 100%;
          z-index: 2;
        }
        .sp-card {
          position: absolute;
          width: 320px;
          padding: 16px 16px 16px 54px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          z-index: 2;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .sp-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
        }
        .sp-pill {
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
        .sp-svg-d {
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
          .sp-section { min-height: auto; padding: 80px 20px; }
          .sp-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
            height: auto !important;
            width: 100%;
            align-items: center;
          }
          .sp-container::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 20px;
            bottom: 20px;
            border-left: 2px dashed #111;
            transform: translateX(-50%);
            z-index: 0;
          }
          .sp-card {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            width: 100%;
            max-width: 360px;
          }
          .sp-svg-d { display: none; }
        }
      `}</style>

      <section ref={sectionRef} className="sp-section">
        {/* Background blob matching Figma */}
        <Image 
          src="/student-img/Union.png" 
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

        <div className="sp-container">
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="sp-card"
              style={{ background: step.bg, ...(step.pos as React.CSSProperties) }}
            >
              <div className="sp-pill" style={{ background: step.label }}>
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
            className="sp-svg-d"
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
