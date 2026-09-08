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
    text: "Hiring from Tier 2/3 colleges used to be chaotic. TalentYug helped us shortlist better candidates, manage drives smoothly, and close offers faster.",
    name: "Priya Sharma",
    role: "HR Manager",
    avatar: "/student-img/testimonials/priya.png",
  },
  {
    id: 2,
    text: "The mock interviews and clear application tracking boosted my confidence. I knew exactly where I stood in every hiring process.",
    name: "Rahul Verma",
    role: "Final Year Student (B.Tech)",
    avatar: "/student-img/testimonials/rahul.png",
  },
  {
    id: 3,
    text: "TalentYug brought structure and transparency to our placement process. From company coordination to offer tracking, everything is now centralized and efficient.",
    name: "Dr. Anil Kumar",
    role: "Training & Placement Officer",
    avatar: "/student-img/testimonials/anil.png",
  },
  {
    id: 4,
    text: "Getting my QR pass was instant. Walked in, scanned at the registration desk, and was into the first round within five minutes without paper queues.",
    name: "Ananya Kapoor",
    role: "Software Development Engineer",
    avatar: "/student-img/testimonials/s2.jpeg",
  },
  {
    id: 5,
    text: "The real-time status notifications were a game changer. I never had to wonder if my application was viewed or when the next interview round would start.",
    name: "Karan Singh",
    role: "Associate Data Analyst",
    avatar: "/student-img/testimonials/U1.webp",
  },
  {
    id: 6,
    text: "Practice test modules matched the exact assessment pattern of visiting tech firms. Cleared the coding round and secured my dream placement offer.",
    name: "Deepika Nair",
    role: "Cloud Support Associate",
    avatar: "/student-img/testimonials/U3.webp",
  },
];

export default function StudentTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = REVIEWS.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  return (
    <>
      <style>{`
        .srev-section {
          position: relative;
          background: #ffffff;
          padding: 90px 24px 130px;
          overflow: hidden;
        }

        .srev-container {
          max-width: 1220px;
          margin: 0 auto;
        }

        /* Top Header */
        .srev-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .srev-subheading {
          font-size: clamp(26px, 3.2vw, 34px);
          font-weight: 500;
          color: #71717a;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .srev-heading {
          font-size: clamp(34px, 4.4vw, 48px);
          font-weight: 600;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        .srev-heading span {
          font-weight: 850;
        }

        .srev-rating-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 6px;
        }

        .srev-score {
          font-size: 19px;
          font-weight: 750;
          color: #1e293b;
        }

        .srev-badge-img {
          display: inline-block;
          vertical-align: middle;
          animation: badgeWiggle 3s ease-in-out infinite;
        }

        @keyframes badgeWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .srev-reviews-count {
          font-size: 16px;
          font-weight: 500;
          color: #64748b;
        }

        /* Body Layout */
        .srev-body {
          display: flex;
          align-items: flex-start;
          gap: 40px;
          position: relative;
        }

        /* Left Side */
        .srev-left {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 10px;
        }

        .srev-quote-icon {
          width: 88px;
          height: auto;
          margin-bottom: 24px;
          animation: quoteFloat 4s ease-in-out infinite;
        }

        @keyframes quoteFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        .srev-left-text {
          font-size: 21px;
          font-weight: 700;
          color: #000000;
          line-height: 1.25;
          margin: 0 0 32px;
          letter-spacing: -0.01em;
        }

        /* Pagination & Arrow */
        .srev-nav-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }

        .srev-current-idx {
          font-size: 28px;
          font-weight: 850;
          color: #000000;
          line-height: 1;
        }

        .srev-total-idx {
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          line-height: 1;
          margin-right: 6px;
        }

        .srev-arrow-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          font-size: 26px;
          font-weight: 700;
          color: #000000;
          cursor: pointer;
          padding: 2px 8px;
          line-height: 1;
          border-radius: 8px;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .srev-arrow-btn:hover {
          color: #2280a8;
          transform: translateX(4px);
        }

        .srev-arrow-btn-prev {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          font-size: 26px;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
          padding: 2px 4px;
          line-height: 1;
          border-radius: 8px;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .srev-arrow-btn-prev:hover {
          color: #2280a8;
          transform: translateX(-4px);
        }

        /* Carousel Track Area */
        .srev-carousel-container {
          flex: 1;
          overflow: hidden;
          padding: 8px 4px 24px;
        }

        .srev-track {
          display: flex;
          gap: 24px;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        .srev-card-item {
          flex: 0 0 calc((100% - 48px) / 3);
          min-width: 270px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
        }

        /* Review Bubble */
        .srev-bubble {
          background: #ffffff;
          border-radius: 22px;
          border: 1.5px solid #e8eef3;
          box-shadow: 0 6px 20px rgba(0, 40, 70, 0.05);
          padding: 24px 22px;
          min-height: 168px;
          display: flex;
          align-items: flex-start;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .srev-bubble:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 40, 70, 0.09);
          border-color: #cbd5e1;
        }

        .srev-text {
          font-size: 13.5px;
          line-height: 1.55;
          color: #1e293b;
          margin: 0;
          font-weight: 450;
        }

        /* Author Info */
        .srev-author {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding-left: 6px;
        }

        .srev-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 2px solid #ffffff;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .srev-author:hover .srev-avatar {
          transform: scale(1.08);
        }

        .srev-name {
          font-size: 15.5px;
          font-weight: 750;
          color: #000000;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .srev-role {
          font-size: 12.5px;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1040px) {
          .srev-card-item {
            flex: 0 0 calc((100% - 24px) / 2);
            max-width: 340px;
          }
        }

        @media (max-width: 820px) {
          .srev-body {
            flex-direction: column;
            gap: 36px;
          }

          .srev-left {
            flex: none;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-top: 0;
          }

          .srev-quote-icon {
            display: none;
          }

          .srev-left-text {
            margin: 0;
            font-size: 24px;
          }

          .srev-card-item {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <section className="srev-section" id="testimonials">
        <div className="srev-container">
          {/* Top Header */}
          <div className="srev-header">
            <p className="srev-subheading">Read Reviews,</p>
            <h2 className="srev-heading">
              ride with <span>Confidence</span>
            </h2>
            <div className="srev-rating-row">
              <span className="srev-score">4.2/5</span>
              <Image
                src="/student-img/testimonials/badge_ribbon.png"
                alt="Award medal"
                width={22}
                height={26}
                className="srev-badge-img"
              />
              <span className="srev-reviews-count">Based on 2026 reviews.</span>
            </div>
          </div>

          {/* Body */}
          <div
            className="srev-body"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Quote & Navigation */}
            <div className="srev-left">
              <Image
                src="/student-img/testimonials/quote_marks_transparent.png"
                alt="Quote mark"
                width={88}
                height={80}
                className="srev-quote-icon"
              />
              <p className="srev-left-text">
                What our<br />
                customers are<br />
                saying
              </p>
              <div className="srev-nav-wrap">
                <button
                  type="button"
                  className="srev-arrow-btn-prev"
                  aria-label="Previous review"
                  onClick={prevSlide}
                >
                  &lt;
                </button>
                <span className="srev-current-idx">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="srev-total-idx">/{String(total).padStart(2, "0")}</span>
                <button
                  type="button"
                  className="srev-arrow-btn"
                  aria-label="Next review"
                  onClick={nextSlide}
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Carousel Area */}
            <div className="srev-carousel-container">
              <div
                className="srev-track"
                style={{
                  transform: `translateX(-${currentIndex * 314}px)`,
                }}
              >
                {/* Render REVIEWS duplicated once to allow smooth infinite loop */}
                {[...REVIEWS, ...REVIEWS].map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="srev-card-item">
                    <div className="srev-bubble">
                      <p className="srev-text">{item.text}</p>
                    </div>
                    <div className="srev-author">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={52}
                        height={52}
                        className="srev-avatar"
                      />
                      <div>
                        <h4 className="srev-name">{item.name}</h4>
                        <p className="srev-role">{item.role}</p>
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
