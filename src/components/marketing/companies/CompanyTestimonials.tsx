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
    text: "Hiring from Tier 2/3 colleges used to be chaotic and time-consuming. TalentYug helped us shortlist pre-assessed candidates, coordinate campus drives smoothly, and close key offers 60% faster.",
    name: "Rajesh Nair",
    role: "VP of Engineering, FinScale",
    avatar: "/company-img/testimonials/rajesh.jpg",
  },
  {
    id: 2,
    text: "We closed 35 technical hires across 6 partner colleges in under three weeks. The automated interview scheduling and standardized assessment scores removed almost all recruiter friction.",
    name: "Sneha Kulkarni",
    role: "Head of Talent Acquisition, NexaCloud",
    avatar: "/company-img/testimonials/sneha.jpg",
  },
  {
    id: 3,
    text: "TalentYug brought immense structure and transparency to our off-campus and pooled drives. From initial screening to offer rollouts, everything is centralized, auditable, and reliable.",
    name: "Vikramaditya Sen",
    role: "Director of Campus Hiring, Infoserve Global",
    avatar: "/company-img/testimonials/vikram.jpg",
  },
  {
    id: 4,
    text: "The candidate quality from partner institutions exceeded our engineering team's expectations. Candidates arrived thoroughly prepared, saving our senior engineers dozens of wasted screening hours.",
    name: "Pooja Sundaram",
    role: "Chief People Officer, LogiKraft Systems",
    avatar: "/company-img/testimonials/pooja.jpg",
  },
  {
    id: 5,
    text: "As a fast-growing tech startup, we couldn't afford a large campus relations team. TalentYug gave us direct access to top-tier developers and analysts with zero upfront agency retainers.",
    name: "Amitabh Roy",
    role: "Founder & CEO, DataPulse AI",
    avatar: "/company-img/testimonials/amitabh.jpg",
  },
  {
    id: 6,
    text: "The real-time joining tracker and candidate audit trails gave our leadership complete peace of mind. Our post-offer renege rate dropped to an all-time low of under 5%.",
    name: "Meera Deshmukh",
    role: "Senior Talent Partner, FinEdge Solutions",
    avatar: "/company-img/testimonials/meera.jpg",
  },
];

export default function CompanyTestimonials() {
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
        .ct-section {
          position: relative;
          background: #ffffff;
          padding: 90px 24px 130px;
          overflow: hidden;
        }

        .ct-container {
          max-width: 1220px;
          margin: 0 auto;
        }

        /* Top Header */
        .ct-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .ct-subheading {
          font-size: clamp(26px, 3.2vw, 34px);
          font-weight: 500;
          color: #71717a;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .ct-heading {
          font-size: clamp(34px, 4.4vw, 48px);
          font-weight: 600;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        .ct-heading span {
          font-weight: 850;
        }

        .ct-rating-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 6px;
        }

        .ct-score {
          font-size: 19px;
          font-weight: 750;
          color: #1e293b;
        }

        .ct-badge-icon {
          display: inline-block;
          vertical-align: middle;
          animation: badgeWiggle 3s ease-in-out infinite;
        }

        @keyframes badgeWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .ct-reviews-count {
          font-size: 16px;
          font-weight: 500;
          color: #64748b;
        }

        /* Body Flex Layout */
        .ct-body {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        /* Left Side Quote & Counter */
        .ct-left {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          user-select: none;
        }

        .ct-quote-icon {
          width: 88px;
          height: auto;
          display: block;
          opacity: 0.9;
          filter: drop-shadow(0 4px 10px rgba(34, 128, 168, 0.15));
        }

        .ct-left-text {
          font-size: 20px;
          font-weight: 650;
          color: #0f172a;
          line-height: 1.3;
          margin: 4px 0 16px;
        }

        /* Counter + Arrows */
        .ct-nav-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .ct-arrow-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 22px;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-arrow-btn:hover {
          color: #2280a8;
          transform: scale(1.15);
        }

        .ct-counter {
          font-size: 22px;
          font-weight: 800;
          color: #000000;
          letter-spacing: -0.02em;
        }

        .ct-counter-total {
          font-size: 15px;
          font-weight: 600;
          color: #94a3b8;
          margin-left: 2px;
        }

        /* Carousel Track Area */
        .ct-carousel-container {
          flex: 1;
          overflow: hidden;
          padding: 8px 4px 24px;
        }

        .ct-track {
          display: flex;
          gap: 24px;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        .ct-card-item {
          flex: 0 0 calc((100% - 48px) / 3);
          min-width: 270px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
        }

        /* Review Bubble */
        .ct-bubble {
          background: #ffffff;
          border: 1.5px solid #d3e7f2;
          border-radius: 24px;
          padding: 26px 24px;
          min-height: 190px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-shadow: 0 6px 24px rgba(5, 59, 80, 0.05);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .ct-bubble:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(5, 59, 80, 0.1);
          border-color: #a5d3ec;
        }

        .ct-text {
          font-size: 13.5px;
          font-weight: 500;
          color: #0f172a;
          line-height: 1.55;
          margin: 0;
        }

        /* Author Information */
        .ct-author {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding-left: 4px;
        }

        .ct-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 2px solid #ffffff;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .ct-author:hover .ct-avatar {
          transform: scale(1.08);
        }

        .ct-name {
          font-size: 15.5px;
          font-weight: 750;
          color: #000000;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .ct-role {
          font-size: 12.5px;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1040px) {
          .ct-card-item {
            flex: 0 0 calc((100% - 24px) / 2);
            max-width: 340px;
          }
        }

        @media (max-width: 820px) {
          .ct-body {
            flex-direction: column;
            gap: 36px;
          }

          .ct-left {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .ct-quote-icon {
            display: none;
          }

          .ct-left-text {
            margin: 0;
            font-size: 24px;
          }

          .ct-card-item {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <section className="ct-section" id="testimonials">
        <div className="ct-container">
          {/* Top Header */}
          <div className="ct-header">
            <p className="ct-subheading">Read Reviews,</p>
            <h2 className="ct-heading">
              ride with <span>Confidence</span>
            </h2>
            <div className="ct-rating-row">
              <span className="ct-score">4.2/5</span>
              {/* Blue Ribbon Medal SVG */}
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ct-badge-icon"
              >
                <path d="M7 16L4 25L11 21L18 25L15 16" fill="#2563eb" />
                <path d="M7 16L4 25L11 21V16H7Z" fill="#1d4ed8" />
                <circle cx="11" cy="10" r="9" fill="#3b82f6" />
                <circle cx="11" cy="10" r="7" fill="#60a5fa" />
                <path
                  d="M11 6.5L12.3 9.2L15.3 9.6L13.1 11.7L13.6 14.7L11 13.3L8.4 14.7L8.9 11.7L6.7 9.6L9.7 9.2L11 6.5Z"
                  fill="#ffffff"
                />
              </svg>
              <span className="ct-reviews-count">Based on 2026 reviews.</span>
            </div>
          </div>

          {/* Body */}
          <div
            className="ct-body"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Quote & Navigation */}
            <div className="ct-left">
              <Image
                src="/company-img/testimonials/quote_marks_transparent.png"
                alt="Quote mark"
                width={88}
                height={70}
                className="ct-quote-icon"
              />
              <p className="ct-left-text">
                What our
                <br />
                customers are
                <br />
                saying
              </p>

              <div className="ct-nav-controls">
                <button
                  className="ct-arrow-btn"
                  onClick={prevSlide}
                  aria-label="Previous review"
                >
                  &lt;
                </button>
                <div className="ct-counter">
                  {String(currentIndex + 1).padStart(2, "0")}
                  <span className="ct-counter-total">/{String(total).padStart(2, "0")}</span>
                </div>
                <button
                  className="ct-arrow-btn"
                  onClick={nextSlide}
                  aria-label="Next review"
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Carousel Track */}
            <div className="ct-carousel-container">
              <div
                className="ct-track"
                style={{
                  transform: `translateX(-${currentIndex * 344}px)`,
                }}
              >
                {/* We double the reviews to make a smooth loop */}
                {[...REVIEWS, ...REVIEWS].map((rev, idx) => (
                  <div key={`${rev.id}-${idx}`} className="ct-card-item">
                    <div className="ct-bubble">
                      <p className="ct-text">{rev.text}</p>
                    </div>

                    <div className="ct-author">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        width={52}
                        height={52}
                        className="ct-avatar"
                      />
                      <div>
                        <h4 className="ct-name">{rev.name}</h4>
                        <p className="ct-role">{rev.role}</p>
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
