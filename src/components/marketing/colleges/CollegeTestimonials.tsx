"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface Review {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    text: "Managing 1,200+ engineering students across 40 campus drives was pure chaos on spreadsheets. TalentYug automated our candidate eligibility, drive schedules, and offer letters. Our placement rate jumped from 58% to 82% in our very first year.",
    name: "Dr. Anil Kumar",
    role: "Chief Training & Placement Officer (TPO) · SRM University",
    avatar: "/college-img/testimonials/tpo_anil.jpg",
  },
  {
    id: 2,
    text: "Connecting directly with 50+ pre-vetted national hiring partners transformed our campus recruitment. The round analytics and instant shortlist generation saved our placement cell hundreds of manual hours every drive.",
    name: "Dr. Meera Krishnan",
    role: "Dean of Placements & Career Guidance · PSG Tech",
    avatar: "/college-img/testimonials/dean_meera.jpg",
  },
  {
    id: 3,
    text: "TalentYug's AI precision matching ensures our tier-2 students get matched to relevant technical roles rather than blind mass blasts. Companies gave us stellar feedback on candidate quality and drive speed.",
    name: "Dr. Rajesh Sharma",
    role: "Head of Corporate Relations · KIIT University",
    avatar: "/college-img/testimonials/head_rajesh.jpg",
  },
  {
    id: 4,
    text: "The 1-click NAAC and NIRF compliance report export is a lifesaver for our annual academic audits. Everything from student attendance, interview logs, to CTC records is structured and verified in real time.",
    name: "Prof. Sneha Patel",
    role: "Director, Industry Partnerships · Nirma University",
    avatar: "/college-img/testimonials/prof_sneha.jpg",
  },
  {
    id: 5,
    text: "The student verification portal and integrated aptitude drills boosted our students' confidence dramatically. Companies closed multiple offers on day 1 of pooled campus drives without any technical friction.",
    name: "Prof. Rajesh Nair",
    role: "Head of Placements · BIT Mesra",
    avatar: "/college-img/testimonials/prof_nair.jpg",
  },
  {
    id: 6,
    text: "TalentYug brought institutional structure to our placement ecosystem. From initial company onboarding to final offer acceptance, the entire placement funnel is now transparent, fast, and completely digital.",
    name: "Vikram Malhotra",
    role: "Vice President, University Relations · Amity University",
    avatar: "/college-img/testimonials/dir_vikram.jpg",
  },
];

export default function CollegeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardStep, setCardStep] = useState(0);
  const total = REVIEWS.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure the exact horizontal distance between consecutive cards
  useEffect(() => {
    const updateStep = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const first = trackRef.current.children[0] as HTMLElement;
        const second = trackRef.current.children[1] as HTMLElement;
        const step = second.offsetLeft - first.offsetLeft;
        if (step > 0) {
          setCardStep(step);
        }
      }
    };

    updateStep();
    const ro = new ResizeObserver(updateStep);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", updateStep);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto slide timer: advances every 4.2 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isHovered]);

  return (
    <>
      <style>{`
        .crev-section {
          position: relative;
          background: #ffffff;
          padding: clamp(90px, 9vw, 150px) 24px clamp(90px, 9vw, 150px);
          overflow: hidden;
          z-index: 10;
        }

        .crev-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Top Header */
        .crev-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .crev-subheading {
          font-size: clamp(26px, 3.2vw, 34px);
          font-weight: 500;
          color: #71717a;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .crev-heading {
          font-size: clamp(34px, 4.4vw, 48px);
          font-weight: 600;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        .crev-heading span {
          font-weight: 850;
        }

        .crev-rating-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 6px;
        }

        .crev-score {
          font-size: 19px;
          font-weight: 750;
          color: #1e293b;
        }

        .crev-badge-img {
          display: inline-block;
          vertical-align: middle;
          animation: crevBadgeWiggle 3s ease-in-out infinite;
        }

        @keyframes crevBadgeWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .crev-reviews-count {
          font-size: 16px;
          font-weight: 500;
          color: #64748b;
        }

        /* Body Layout */
        .crev-body {
          display: flex;
          align-items: flex-start;
          gap: 48px;
          position: relative;
        }

        /* Left Column */
        .crev-left {
          flex: 0 0 210px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 8px;
        }

        .crev-quote-icon {
          width: 92px;
          height: auto;
          margin-bottom: 24px;
          animation: crevQuoteFloat 4s ease-in-out infinite;
        }

        @keyframes crevQuoteFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        .crev-left-text {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          line-height: 1.25;
          margin: 0 0 32px;
          letter-spacing: -0.01em;
        }

        /* Pagination & Arrows */
        .crev-nav-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }

        .crev-current-idx {
          font-size: 26px;
          font-weight: 850;
          color: #000000;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .crev-total-idx {
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          line-height: 1;
        }

        .crev-arrow-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 4px 6px;
          font-size: 22px;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .crev-arrow-btn:hover {
          color: #0284c7;
          transform: scale(1.2);
        }

        .crev-arrow-btn:active {
          transform: scale(0.92);
        }

        /* Carousel Track Area */
        .crev-carousel-container {
          flex: 1;
          overflow: hidden;
          padding: 8px 4px 24px;
          position: relative;
        }

        .crev-track {
          display: flex;
          gap: 24px;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        .crev-card-item {
          flex: 0 0 calc((100% - 48px) / 3);
          min-width: 280px;
          display: flex;
          flex-direction: column;
        }

        /* Review Bubble */
        .crev-bubble {
          background: #ffffff;
          border-radius: 22px;
          border: 1.5px solid #e8eef3;
          box-shadow: 0 6px 20px rgba(0, 40, 70, 0.05);
          padding: 26px 24px;
          min-height: 172px;
          display: flex;
          align-items: flex-start;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .crev-bubble:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(0, 40, 70, 0.1);
          border-color: #93c5fd;
        }

        .crev-text {
          font-size: 14px;
          line-height: 1.6;
          color: #1e293b;
          margin: 0;
          font-weight: 450;
        }

        /* Author Info */
        .crev-author {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding-left: 6px;
        }

        .crev-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 2px solid #ffffff;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .crev-author:hover .crev-avatar {
          transform: scale(1.1);
        }

        .crev-name {
          font-size: 15.5px;
          font-weight: 750;
          color: #000000;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .crev-role {
          font-size: 12.5px;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1040px) {
          .crev-card-item {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }

        @media (max-width: 820px) {
          .crev-body {
            flex-direction: column;
            gap: 36px;
          }

          .crev-left {
            flex: none;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-top: 0;
          }

          .crev-quote-icon {
            display: none;
          }

          .crev-left-text {
            margin: 0;
            font-size: 22px;
          }

          .crev-card-item {
            flex: 0 0 100%;
          }
        }
      `}</style>

      <section className="crev-section" id="testimonials">
        <div className="crev-container">
          {/* Top Header */}
          <div className="crev-header">
            <p className="crev-subheading">Read Reviews,</p>
            <h2 className="crev-heading">
              place with <span>Confidence</span>
            </h2>
            <div className="crev-rating-row">
              <span className="crev-score">4.9/5</span>
              <Image
                src="/college-img/college/star_c.png"
                alt="Award medal"
                width={26}
                height={26}
                className="crev-badge-img"
              />
              <span className="crev-reviews-count">Based on 150+ partnered colleges.</span>
            </div>
          </div>

          {/* Body */}
          <div className="crev-body">
            {/* Left Quote & Navigation */}
            <div className="crev-left">
              <Image
                src="/college-img/testimonials/quote_marks.png"
                alt="Quote mark"
                width={92}
                height={84}
                className="crev-quote-icon"
              />
              <p className="crev-left-text">
                What our<br />
                partner colleges<br />
                are saying
              </p>
              <div className="crev-nav-wrap">
                <button
                  type="button"
                  className="crev-arrow-btn"
                  aria-label="Previous review"
                  onClick={prevSlide}
                >
                  &lt;
                </button>
                <span className="crev-current-idx">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="crev-total-idx">/{String(total).padStart(2, "0")}</span>
                <button
                  type="button"
                  className="crev-arrow-btn"
                  aria-label="Next review"
                  onClick={nextSlide}
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Carousel Area */}
            <div
              className="crev-carousel-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                ref={trackRef}
                className="crev-track"
                style={{
                  transform: cardStep > 0
                    ? `translateX(-${currentIndex * cardStep}px)`
                    : `translateX(-${currentIndex * 33.333}%)`,
                }}
              >
                {/* Render REVIEWS triplicated to allow seamless wrap-around */}
                {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="crev-card-item">
                    <div className="crev-bubble">
                      <p className="crev-text">{item.text}</p>
                    </div>
                    <div className="crev-author">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={52}
                        height={52}
                        className="crev-avatar"
                      />
                      <div>
                        <h4 className="crev-name">{item.name}</h4>
                        <p className="crev-role">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
