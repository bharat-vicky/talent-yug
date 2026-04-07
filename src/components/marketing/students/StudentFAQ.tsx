"use client";

import { useState } from "react";
import Image from "next/image";

const FAQS = [
  {
    q: "How do I register?",
    a: "You can register using the invite link shared by your college or directly on our site with your college email, then complete your profile with education, skills and projects.",
  },
  {
    q: "How many opportunities are available?",
    a: "We have countless opportunities across internships, fresher roles and training-linked programs from companies of different sizes and sectors.",
  },
  {
    q: "How does the matching work?",
    a: "Our platform looks at your skills, interests and eligibility and recommends roles that best fit your profile so you don't waste time on irrelevant openings.",
  },
  {
    q: "How do I prepare for interviews?",
    a: "We provide guidance through resources, checklists and occasional workshops with your college to help you prepare for tests, interviews, group discussions and internships.",
  },
  {
    q: "What if I don't get selected?",
    a: "If you aren't selected for a role, you can keep applying to other openings and use feedback from earlier rounds to improve your profile and preparation.",
  },
  {
    q: "Is there a fee to use?",
    a: "The platform is free for students; there are no registration or placement charges for you.",
  },
];

export default function StudentFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <>
      <style>{`
        .sfq2-section {
          position: relative;
          padding: 190px 20px;
          background: #ffffff;
          z-index: 11;
          min-height: 120vh;
          overflow: hidden;
          margin-bottom: 0;
        }

        .sfq2-bg {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .sfq2-container {
          max-width: 1300px;
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          gap: 40px;
        }

        .sfq2-left {
          max-width: 43%;
          flex-shrink: 0;
        }

        .sfq2-left h1 {
          font-size: 54px;
          font-weight: 800;
          line-height: 1.1;
          color: #000000;
        }

        .sfq2-left h1 span {
          background: linear-gradient(400deg, #7E0101 0%, #FF009B 49%, #790007 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .sfq2-left p {
          margin-top: 24px;
          font-size: 20px;
          line-height: 1.3;
          color: #000000;
        }

        .sfq2-right {
          max-width: 45%;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sfq2-item {
          background: #ffffff;
          border-radius: 30px;
          padding: 20px 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: 0.3s ease;
        }

        .sfq2-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
        }

        .sfq2-question {
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

        .sfq2-question h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          flex: 1;
        }

        .sfq2-icon {
          font-size: 25px;
          font-weight: 700;
          color: #000000;
          flex-shrink: 0;
          line-height: 1;
        }

        .sfq2-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .sfq2-answer.open {
          max-height: 300px;
        }

        .sfq2-answer p {
          margin-top: 10px;
          font-size: 15px;
          color: #555;
          line-height: 1.6;
        }

        .sfq2-contact {
          background: #ffffff;
          border-radius: 30px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          gap: 20px;
        }

        .sfq2-contact h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000;
        }

        .sfq2-contact p {
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }

        .sfq2-cta {
          display: inline-block;
          padding: 10px 30px;
          background: #7E0000;
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

        .sfq2-cta:hover {
          background: #8e0101;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 1024px) {
          .sfq2-section { padding: 120px 20px; min-height: unset; }
          .sfq2-container { flex-direction: column; gap: 50px; }
          .sfq2-left, .sfq2-right { max-width: 100%; width: 100%; }
          .sfq2-left h1 { font-size: 36px; margin: 0; }
          .sfq2-left p { margin-top: 20px; font-size: 18px; }
        }

        @media (max-width: 768px) {
          .sfq2-section { height: auto; padding: 120px 20px; min-height: unset; }
          .sfq2-left h1 { font-size: 34px; }
          .sfq2-contact { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="sfq2-section">
        {/* Background design image */}
        <Image
          src="/student-img/students/designfaq.svg"
          alt=""
          className="sfq2-bg"
          width={1920}
          height={400}
          aria-hidden="true"
          style={{ objectFit: "cover", height: "auto" }}
        />

        <div className="sfq2-container">

          {/* LEFT */}
          <div className="sfq2-left">
            <h1>
              Frequently Asked <br />
              <span>Questions</span>
            </h1>
            <p>
              Here are some common questions about our services to help you understand better
            </p>
          </div>

          {/* RIGHT */}
          <div className="sfq2-right">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="sfq2-item"
                onClick={() => toggle(i)}
              >
                <button className="sfq2-question" aria-expanded={openIndex === i}>
                  <h3>{faq.q}</h3>
                  <span className="sfq2-icon">{openIndex === i ? "−" : "+"}</span>
                </button>
                <div className={`sfq2-answer${openIndex === i ? " open" : ""}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}

            {/* Contact box */}
            <div className="sfq2-contact">
              <div>
                <h3>Have Questions? We&apos;re Here to Help!</h3>
                <p>Reach out to our support team for any queries.</p>
              </div>
              <a
                href="mailto:connect@talentyug.in"
                target="_blank"
                rel="noopener noreferrer"
                className="sfq2-cta"
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
