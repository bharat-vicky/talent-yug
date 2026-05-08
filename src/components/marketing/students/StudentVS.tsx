"use client";

import { useEffect, useRef, useState } from "react";

const LEFT_ITEMS = [
  "High graduate unemployment rate",
  "Random job applications via portals",
  "Frequent rejections above 90%",
  "Lack of structured preparation",
  "Entry-level salaries averaging ₹2–3L"
];

const RIGHT_ITEMS = [
  "Role-matched job opportunities",
  "Precision job matching system",
  "Mock interview preparation",
  "Expert tips & learning resources",
  "Real-time application tracking"
];

export default function StudentVS() {
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
    <section className="covs-wrapper">
      <style>{`
        .covs-wrapper {
          background-color: #FEF2F2;
          padding: 40px 20px;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .covs-header {
          text-align: center;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(.22,1,.36,1);
        }
        .covs-header.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .covs-header h2 {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #000;
          margin: 0 0 12px;
        }
        .covs-header p {
          font-size: clamp(16px, 2vw, 20px);
          color: #333;
          margin: 0;
        }

        /* Layout */
        .covs-layout {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 500px;
          width: 100%;
        }

        /* Center Divider */
        .covs-divider {
          position: absolute;
          left: 50%;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background-color: #c9bcab;
          transform: translateX(-50%);
          z-index: 10;
        }
        .covs-vs-badge {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #fff;
          border: 2px solid #c9bcab;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #8c8378;
        }

        /* Sides */
        .covs-side {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .covs-side.left {
          justify-content: flex-start;
          padding-left: 260px;
          padding-right: 40px;
        }
        .covs-side.right {
          justify-content: flex-end;
          padding-right: 260px;
          padding-left: 40px;
        }

        /* Big Circles */
        .covs-big-circle {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 12px solid #ffffff;
          box-shadow: 0 8px 40px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          z-index: 1;
        }
        .covs-big-circle.left {
          background-color: #8C0E0F;
          left: -260px;
          justify-content: flex-end;
          padding-right: 60px;
          text-align: left;
        }
        .covs-big-circle.right {
          background-color: #E7627D;
          right: -260px;
          justify-content: flex-start;
          padding-left: 60px;
          text-align: center;
        }

        /* Items List */
        .covs-items {
          display: flex;
          flex-direction: column;
          gap: 36px;
          width: 100%;
          z-index: 2;
        }
        .covs-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .covs-item.left {
          flex-direction: row;
        }
        .covs-item.right {
          flex-direction: row;
          text-align: right;
        }

        .covs-dot {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .covs-dot.left { background-color: #8C0E0F; }
        .covs-dot.right { background-color: #E7627D; }

        .covs-item p {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #111;
          line-height: 1.4;
          flex: 1;
          max-width: 250px;
        }

        /* Curves effect */
        .covs-item.left:nth-child(1) { transform: translateX(-54px); }
        .covs-item.left:nth-child(2) { transform: translateX(-16px); }
        .covs-item.left:nth-child(3) { transform: translateX(0px); }
        .covs-item.left:nth-child(4) { transform: translateX(-16px); }
        .covs-item.left:nth-child(5) { transform: translateX(-54px); }

        .covs-item.right:nth-child(1) { transform: translateX(54px); }
        .covs-item.right:nth-child(2) { transform: translateX(16px); }
        .covs-item.right:nth-child(3) { transform: translateX(0px); }
        .covs-item.right:nth-child(4) { transform: translateX(16px); }
        .covs-item.right:nth-child(5) { transform: translateX(54px); }

        /* Responsive */
        @media (max-width: 960px) {
          .covs-wrapper { min-height: auto; padding: 60px 20px; }
          .covs-layout { flex-direction: column; gap: 80px; height: auto; margin-top: 20px; }
          .covs-divider { display: none; }
          .covs-side { width: 100%; padding: 0 !important; justify-content: center !important; flex-direction: column; }
          
          .covs-big-circle { 
            position: relative; left: auto !important; right: auto !important; top: auto !important; transform: none !important; 
            width: 300px; height: 300px; border: 8px solid #fff; margin-bottom: 40px; padding: 0 !important; 
            justify-content: center !important; text-align: center !important; font-size: 28px;
          }
          
          .covs-items { padding: 0 20px; align-items: center; gap: 24px; }
          .covs-item { transform: none !important; width: 100%; max-width: 400px; }
          .covs-item p { max-width: none; }
          .covs-item.right { flex-direction: row-reverse; text-align: left; }
        }
      `}</style>

      {/* Header */}
      <div
        ref={titleRef}
        className={`covs-header ${titleVisible ? "visible" : ""}`}
      >
        <h2>From Campus to Career Excellence</h2>
        <p>Your bridge from learning to earning with TalentYug.</p>
      </div>

      {/* Layout */}
      <div className="covs-layout">
        {/* Center divider */}
        <div className="covs-divider">
          <div className="covs-vs-badge">VS</div>
        </div>

        {/* Left Side */}
        <div className="covs-side left">
          <div className="covs-big-circle left">
            <span>Current<br />Career<br />Challenges</span>
          </div>
          <div className="covs-items">
            {LEFT_ITEMS.map((item, i) => (
              <div className="covs-item left" key={`left-${i}`}>
                <div className="covs-dot left"></div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="covs-side right">
          <div className="covs-items">
            {RIGHT_ITEMS.map((item, i) => (
              <div className="covs-item right" key={`right-${i}`}>
                <p>{item}</p>
                <div className="covs-dot right"></div>
              </div>
            ))}
          </div>
          <div className="covs-big-circle right">
            <span>Our<br />Integrated<br />Solution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
