"use client";

import { useState } from "react";
import Image from "next/image";

const FAQS = [
  {
    q: "What's your candidate quality?",
    a: "We work with vetted colleges and capture detailed student profiles, projects and assessments so you see candidates who fit your skill, culture and role needs, not generic resumes.",
  },
  {
    q: "Which colleges are in your network?",
    a: "We are connected with Tier 1 to Tier 3 colleges and currently work with 100+ institutions across different regions.",
  },
  {
    q: "How fast can we hire?",
    a: "You can hire a bulk number of students within 48 hours of raising your requirements.",
  },
  {
    q: "What's the hiring process?",
    a: "Our team provides you with the best pre-filtered, interview-ready students so your hiring team only spends time with high-potential candidates.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing is flexible and can be based on annual subscription, per-hire success fees, or a hybrid model depending on your hiring volume.",
  },
];

export default function CompanyFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <>
      <style>{`
        .cfq2-section {
          position: relative;
          padding: 180px 20px;
          background: #ffffff;
          z-index: 11;
          min-height: 120vh;
          overflow: hidden;
          margin-bottom: 0;
        }

        .cfq2-bg {
          position: absolute;
          max-width: 100%;
          left: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .cfq2-container {
          max-width: 1300px;
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          gap: 40px;
        }

        .cfq2-left {
          max-width: 43%;
          flex-shrink: 0;
        }

        .cfq2-left h1 {
          font-size: 54px;
          font-weight: 800;
          line-height: 1.1;
          color: #000000;
        }

        .cfq2-left h1 span {
          background: linear-gradient(-20deg, #00BAFF, #004483, #00EAFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .cfq2-left p {
          margin-top: 24px;
          font-size: 20px;
          line-height: 1.3;
          color: #000000;
        }

        .cfq2-right {
          max-width: 45%;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .cfq2-item {
          background: #ffffff;
          border-radius: 30px;
          padding: 28px 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: 0.3s ease;
        }

        .cfq2-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
        }

        .cfq2-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: transparent;
          border: none;
          text-align: left;
          padding: 0;
          cursor: pointer;
          gap: 12px;
        }

        .cfq2-question h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          flex: 1;
        }

        .cfq2-icon {
          font-size: 25px;
          font-weight: 700;
          color: #000000;
          flex-shrink: 0;
          line-height: 1;
        }

        .cfq2-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .cfq2-answer.open {
          max-height: 300px;
        }

        .cfq2-answer p {
          margin-top: 15px;
          font-size: 15px;
          color: #555;
          line-height: 1.6;
        }

        .cfq2-contact {
          background: #ffffff;
          border-radius: 30px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          gap: 20px;
        }

        .cfq2-contact h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000;
        }

        .cfq2-contact p {
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }

        .cfq2-cta {
          display: inline-block;
          padding: 10px 40px;
          background: #006F5F;
          color: #ffffff;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
          border: none;
        }

        .cfq2-cta:hover {
          background: #0FB79C;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 1024px) {
          .cfq2-section { padding: 120px 20px; min-height: unset; }
          .cfq2-container { flex-direction: column; gap: 50px; }
          .cfq2-left, .cfq2-right { max-width: 100%; width: 100%; }
          .cfq2-left h1 { font-size: 36px; margin: 0; }
          .cfq2-left p { margin-top: 20px; font-size: 18px; }
        }

        @media (max-width: 768px) {
          .cfq2-section { height: auto; min-height: unset; padding: 120px 20px; }
          .cfq2-contact { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="cfq2-section">
        {/* Background design image */}
        <Image
          src="/company-img/companies/design.svg"
          alt=""
          className="cfq2-bg"
          width={1920}
          height={400}
          aria-hidden="true"
          style={{ objectFit: "cover", height: "auto" }}
        />

        <div className="cfq2-container">

          {/* LEFT */}
          <div className="cfq2-left">
            <h1>
              Frequently Asked <br />
              <span>Questions</span>
            </h1>
            <p>
              Here are some common questions about our services to help you understand better
            </p>
          </div>

          {/* RIGHT */}
          <div className="cfq2-right">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="cfq2-item"
                onClick={() => toggle(i)}
              >
                <button className="cfq2-question" aria-expanded={openIndex === i}>
                  <h3>{faq.q}</h3>
                  <span className="cfq2-icon">{openIndex === i ? "−" : "+"}</span>
                </button>
                <div className={`cfq2-answer${openIndex === i ? " open" : ""}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}

            {/* Contact box */}
            <div className="cfq2-contact">
              <div>
                <h3>Have Questions? We&apos;re Here to Help!</h3>
                <p>Reach out to our support team for any queries.</p>
              </div>
              <a
                href="mailto:connect@talentyug.in"
                target="_blank"
                rel="noopener noreferrer"
                className="cfq2-cta"
              >
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
