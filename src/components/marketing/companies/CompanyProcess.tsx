"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  { n:"step1", icon:"/company-img/companies/step1.png", title:"Create Job Posting", desc:"Company fills standardized form — Role name, description, skills required — Salary band, location, job type — Interview timeline, rounds start date — Form gets distributed to college network", bg:"#7AE2CF", label:"#308175", pos:{ top:34, left:0 } },
  { n:"step2", icon:"/company-img/companies/step2.png", title:"Receive Candidate Pool", desc:"TalentYug AI matches candidates across colleges — Candidates ranked by fit — Candidate profiles include CGPA, skills, projects, preferences", bg:"#A7FFF2", label:"#1B8E7D", pos:{ top:35, right:0 } },
  { n:"step3", icon:"/company-img/companies/step3.png", title:"Interview and Shortlist", desc:"Company shortlists candidates on platform — Interviews scheduled automatically — Real-time status visible to all stakeholders", bg:"#7AE2CF", label:"#308175", pos:{ top:240, left:"35%" } },
  { n:"step4", icon:"/company-img/companies/step4.png", title:"Make Offers", desc:"Offer generated + sent via platform — Candidate accepts/rejects — Offer tracked with deadline — Salary documented automatically", bg:"#A7FFF2", label:"#1B8E7D", pos:{ top:470, left:0 } },
  { n:"step5", icon:"/company-img/companies/step5.png", title:"Hire and Onboard", desc:"Confirmed hire list exported — Joining date tracked — Post-hire feedback on new employee performance", bg:"#7AE2CF", label:"#308175", pos:{ top:470, right:0 } },
  { n:"step6", icon:"/company-img/companies/step6.png", title:"Analytics and Insights", desc:"Time-to-hire metrics — Cost-per-hire — Quality of hires tracking — College/batch performance — Repeat hiring rates", bg:"#A7FFF2", label:"#1B8E7D", pos:{ top:690, left:"35%" } },
];

const SVG_PATHS = [
  "M350 240 H999","M1060 250 V410","M1060 410 H250",
  "M250 412 V549","M280 590 H990","M1060 600 V770","M1060 770 H650",
];

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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cop-card { transition: transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.55s ease; }
        .cop-card:hover { transform: scale(1.06) translateY(-6px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important; }
        @media (max-width: 1200px) {
          .cop-section { height: auto !important; padding: 80px 20px !important; }
          .cop-container { display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .cop-card { position: relative !important; left: auto !important; right: auto !important; top: auto !important; max-width: 100% !important; width: 100% !important; }
          .cop-svg-d { display: none !important; }
          .cop-svg-m { display: block !important; }
        }
        @media (min-width: 1201px) { .cop-svg-m { display: none !important; } }
      `}</style>
      <section
        ref={sectionRef}
        className="cop-section"
        style={{ position:"relative", padding:"180px 0", background:"#E4FBF8", zIndex:11, overflow:"hidden", height:1100 }}
      >
        <Image src="/company-img/Union.png" alt="" width={1025} height={800} style={{ position:"absolute", top:"55%", left:"50%", transform:"translate(-50%,-50%)", maxWidth:1025, width:"100%", height:"auto", opacity:0.9, zIndex:1, pointerEvents:"none" }} />

        <svg className="cop-svg-m" viewBox="0 0 100 1400" preserveAspectRatio="none" style={{ position:"absolute", left:"45%", top:0, height:"100%", width:80, zIndex:0, display:"none" }}>
          <path d="M40 130 V1200" stroke="#006F5F" strokeWidth={4} strokeDasharray="6 6" strokeLinecap="round" fill="none" />
          <circle r={9} fill="#00B69B" />
        </svg>

        <div className="cop-container" style={{ position:"relative", maxWidth:1300, margin:"auto", zIndex:2, height:"100%" }}>
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="cop-card"
              style={{ position:"absolute", maxWidth:380, padding:"24px 24px 24px 65px", borderRadius:28, background:step.bg, boxShadow:"0 10px 25px rgba(0,0,0,0.12)", zIndex:2, ...(step.pos as React.CSSProperties) }}
            >
              <div style={{ position:"absolute", left:15, top:"50%", transform:"rotate(180deg)", background:step.label, color:"white", writingMode:"vertical-rl", padding:"25px 8px", borderRadius:20, fontSize:14, fontWeight:600 }}>
                Step-{idx + 1}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <Image src={step.icon} alt={step.title} width={24} height={24} style={{ objectFit:"contain" }} />
                <h3 style={{ margin:0, fontSize:20, fontWeight:700 }}>{step.title}</h3>
              </div>
              <p style={{ fontSize:12.5, lineHeight:1.4, margin:0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <svg
          ref={svgRef}
          className="cop-svg-d"
          viewBox="0 0 1300 900"
          preserveAspectRatio="none"
          style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", zIndex:1, pointerEvents:"none" }}
        >
          {SVG_PATHS.map((d, i) => (
            <path key={i} d={d} stroke="#000" strokeWidth={3} strokeDasharray="8 8" strokeLinecap="round" fill="none" />
          ))}
          <circle ref={dotRef} r={9} fill="#00B69B" style={{ filter:"drop-shadow(0 0 6px #00b69bcc)" }} />
        </svg>
      </section>
    </>
  );
}
