"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  {
    n: "step1",
    icon: "/college-img/college/step1_c.png",
    title: "Onboard Your College",
    desc: "TPO registers + uploads student data — Basic college info — Student database structure",
    bg: "#F7E396",
    label: "#98853D",
    pos: { top: 34, left: 0 },
  },
  {
    n: "step2",
    icon: "/college-img/college/step2_c.png",
    title: "Connect with Companies",
    desc: "We bring 50+ pre-vetted companies — Companies post job requirements — Structured templates",
    bg: "#FF9F43",
    label: "#8F5F31",
    pos: { top: 35, right: 0 },
  },
  {
    n: "step3",
    icon: "/college-img/college/step3_c.png",
    title: "AI Matches Students",
    desc: "Our algorithm analyzes student profiles — Matches students to relevant roles — NOT mass blast — precision matching",
    bg: "#F7E396",
    label: "#98853D",
    pos: { top: 240, left: "35%" },
  },
  {
    n: "step4",
    icon: "/college-img/college/step4_c.png",
    title: "Students Apply",
    desc: "Students see role-matched opportunities — Apply with 1-click — Access preparation resources",
    bg: "#FF9F43",
    label: "#8F5F31",
    pos: { top: 470, left: 0 },
  },
  {
    n: "step5",
    icon: "/college-img/college/step5_c.png",
    title: "Interview Management",
    desc: "Companies conduct interviews via platform — TPO tracks progress in real-time — Interview schedules auto-sync",
    bg: "#F7E396",
    label: "#98853D",
    pos: { top: 470, right: 0 },
  },
  {
    n: "step6",
    icon: "/college-img/college/step6_c.png",
    title: "Offer and Acceptance",
    desc: "Companies send offer via platform — Students accept/reject — Placement confirmed + salary documented",
    bg: "#FF9F43",
    label: "#8F5F31",
    pos: { top: 690, right: 0 },
  },
  {
    n: "step7",
    icon: "/college-img/college/step7_c.png",
    title: "Analytics and Reporting",
    desc: "TPO sees placement funnel — Conversion rates by company/role — Student salary distributions — Export reports for annual reporting",
    bg: "#F7E396",
    label: "#98853D",
    pos: { top: 690, left: 0 },
  },
];

const SVG_PATHS = [
  "M350 240 H999",
  "M1060 250 V410",
  "M1060 410 H350",
  "M350 412 V549",
  "M280 590 H1090",
  "M1090 590 V790",
  "M1060 770 H350",
];

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
      const paths = Array.from(svg!.querySelectorAll<SVGPathElement>("path"));
      let totalLength = 0;
      const pathData: { element: SVGPathElement; length: number }[] = [];
      paths.forEach((p) => {
        const len = p.getTotalLength();
        pathData.push({ element: p, length: len });
        totalLength += len;
      });
      const duration = 8000;
      const startTime = performance.now();
      function move(now: number) {
        const progress = Math.min((now - startTime) / duration, 1);
        let dist = totalLength * progress;
        for (let i = 0; i < pathData.length; i++) {
          if (dist <= pathData[i].length) {
            const pt = pathData[i].element.getPointAtLength(dist);
            dot!.setAttribute("cx", String(pt.x));
            dot!.setAttribute("cy", String(pt.y));
            break;
          }
          dist -= pathData[i].length;
        }
        if (progress < 1) requestAnimationFrame(move);
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
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cp-card { transition: transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.55s ease; }
        .cp-card:hover { transform: scale(1.06) translateY(-6px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important; }
        @media (max-width: 1200px) {
          .cp-section { height: auto !important; padding: 80px 20px !important; transform: none !important; }
          .cp-container { display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .cp-card { position: relative !important; left: auto !important; right: auto !important; top: auto !important; max-width: 100% !important; width: 100% !important; }
          .cp-svg-d { display: none !important; }
          .cp-svg-m { display: block !important; }
        }
        @media (min-width: 1201px) { .cp-svg-m { display: none !important; } }
      `}</style>
      <section
        ref={sectionRef}
        className="cp-section"
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          padding: "150px 0",
          background: "#FEF2DD",
          zIndex: 11,
          overflow: "hidden",
          height: 1100,
          transform: "scale(0.85)",
          transformOrigin: "top center",
        }}
      >
        <Image
          src="/college-img/college/Union_c.png"
          alt=""
          width={105}
          height={800}
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            maxWidth: 1025,
            width: "100%",
            height: "auto",
            opacity: 0.9,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <svg
          className="cp-svg-m"
          viewBox="0 0 100 1400"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "45%",
            top: 0,
            height: "100%",
            width: 80,
            zIndex: 0,
            display: "none",
          }}
        >
          <path
            d="M40 130 V1200"
            stroke="#8F5F31"
            strokeWidth={4}
            strokeDasharray="6 6"
            strokeLinecap="round"
            fill="none"
          />
          <circle r={9} fill="#CFAE74" />
        </svg>

        <div
          className="cp-container"
          style={{
            position: "relative",
            maxWidth: 1300,
            margin: "auto",
            zIndex: 2,
            height: "100%",
          }}
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="cp-card"
              style={{
                position: "absolute",
                maxWidth: 380,
                padding: "24px 24px 24px 65px",
                borderRadius: 28,
                background: step.bg,
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                zIndex: 2,
                ...(step.pos as React.CSSProperties),
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 15,
                  top: "18%",
                  transform: "rotate(180deg)",
                  background: step.label,
                  color: "white",
                  writingMode: "vertical-rl",
                  padding: "25px 8px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Step-{idx + 1}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                  {step.title}
                </h3>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.4, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <svg
          ref={svgRef}
          className="cp-svg-d"
          viewBox="0 0 1300 900"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {SVG_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="#000"
              strokeWidth={3}
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
            />
          ))}
          <circle
            ref={dotRef}
            r={9}
            fill="#CFAE74"
            style={{ filter: "drop-shadow(0 0 6px rgba(207,174,116,0.8))" }}
          />
        </svg>
      </section>
    </>
  );
}
