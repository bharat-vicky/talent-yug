"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  { n: "step1", icon: "/company-img/companies/step1.png", title: "Create Job Posting", desc: "Company fills standardized form - Role name, description, skills required - Salary band, location, job type - Interview timeline, rounds - Start date - Form gets distributed to college network", bg: "#7AE2CF", label: "#308175", pos: { top: 0, left: 0 } },
  { n: "step2", icon: "/company-img/companies/step2.png", title: "Receive Candidate Pool", desc: "TalentYug AI matches candidates across colleges - Candidates ranked by fit - Candidate profiles include CGPA, skills, projects, preferences", bg: "#A7FFF2", label: "#1B8E7D", pos: { top: 0, left: 680 } },
  { n: "step3", icon: "/company-img/companies/step3.png", title: "Interview & Shortlist", desc: "Company shortlists candidates on platform - Interviews scheduled automatically (no back-and-forth) - Interview feedback recorded on platform - Real-time status visible to all stakeholders", bg: "#7AE2CF", label: "#308175", pos: { top: 180, left: 340 } },
  { n: "step4", icon: "/company-img/companies/step4.png", title: "Make Offers", desc: "Offer generated + sent via platform - Candidate accepts/rejects - Offer tracked with deadline - Salary documented automatically", bg: "#A7FFF2", label: "#1B8E7D", pos: { top: 360, left: 0 } },
  { n: "step5", icon: "/company-img/companies/step5.png", title: "Hire & Onboard", desc: "Confirmed hire list exported - Joining date tracked - Post-hire feedback on new employee performance", bg: "#7AE2CF", label: "#308175", pos: { top: 360, left: 680 } },
  { n: "step6", icon: "/company-img/companies/step6.png", title: "Analytics & Insights", desc: "Time-to-hire metrics - Cost-per-hire - Quality of hires (performance tracking) - College/batch performance - Repeat hiring rates", bg: "#A7FFF2", label: "#1B8E7D", pos: { top: 540, left: 340 } },
];

const DESKTOP_PATH = "M 160 65 L 760 65 L 760 245 L 240 245 L 240 425 L 760 425 L 760 605 L 500 605";

export default function CompanyProcess() {
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
        const progress = ((now - startTime) % duration) / duration;
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
        .cop-section {
          position: relative;
          min-height: 100vh;
          background: #EAFCF9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          overflow: hidden;
          z-index: 11;
          font-family: 'Inter', sans-serif;
        }
        .cop-container {
          position: relative;
          width: 1000px;
          height: 680px;
          max-width: 100%;
          z-index: 2;
        }
        .cop-card {
          position: absolute;
          width: 320px;
          padding: 16px 16px 16px 54px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          z-index: 2;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .cop-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
        }
        .cop-pill {
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
        .cop-svg-d {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .cop-section { min-height: auto; padding: 80px 20px; }
          .cop-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
            height: auto !important;
            width: 100%;
            align-items: center;
          }
          .cop-container::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 20px;
            bottom: 20px;
            border-left: 2px dashed #111;
            transform: translateX(-50%);
            z-index: 0;
          }
          .cop-card {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            width: 100%;
            max-width: 360px;
          }
          .cop-svg-d { display: none; }
        }
      `}</style>

      <section ref={sectionRef} className="cop-section">
        {/* Background blob matching Figma */}
        <Image
          src="/company-img/Union.png"
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

        <div className="cop-container">
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="cop-card"
              style={{ background: step.bg, ...(step.pos as React.CSSProperties) }}
            >
              <div className="cop-pill" style={{ background: step.label }}>
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
            className="cop-svg-d"
            viewBox="0 0 1000 680"
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
              fill="#00B69B"
              style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))" }}
            />
          </svg>
        </div>
      </section>
    </>
  );
}
