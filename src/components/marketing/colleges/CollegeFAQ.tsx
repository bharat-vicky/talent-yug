"use client";

import { useState } from "react";
import Image from "next/image";

const FAQS = [
  {
    q: "How do we upload student data?",
    a: "From our dashboard that will be provided after collaboration, your team can securely upload and manage all student data in one place.",
  },
  {
    q: "What companies are in your network?",
    a: "We work with companies across IT, core engineering, startups and services, focused on roles suitable for pre-final and final-year students.",
  },
  {
    q: "How does the AI matching work?",
    a: "Our AI helps track real-time placement data, automatically shortlists relevant students for each role, and supports smooth planning and execution of campus drives.",
  },
  {
    q: "What's the implementation timeline?",
    a: "Within 48 hours of the campus drive we provide offer letters for selected students, and we run a complete 3-month program to support the entire cycle.",
  },
  {
    q: "What support do you provide?",
    a: "Support includes training, internships and placement assistance with complete student success support from onboarding till final offer.",
  },
  {
    q: "Can we integrate with our existing systems?",
    a: "No, we provide a new, improved version of the placement process designed to help students and enable efficient bulk hiring.",
  },
];

export default function CollegeFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <>
      <style>{`
        .clf-faq-section {
          position: relative;
          padding: 190px 20px;
          background: #ffffff;
          z-index: 11;
          min-height: 120vh;
          overflow: hidden;
          margin-bottom: 0;
        }

        .clf-faq-bg {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .clf-faq-container {
          max-width: 1300px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          gap: 40px;
        }

        .clf-faq-left {
          max-width: 43%;
          flex-shrink: 0;
        }

        .clf-faq-left h1 {
          font-size: 54px;
          font-weight: 800;
          line-height: 1.1;
          margin-top: 0;
          margin-left: 0;
          color: #000000;
        }

        .clf-faq-left h1 span {
          background: linear-gradient(410deg, #FF0008 0%, #518300 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .clf-faq-left p {
          margin-top: 24px;
          font-size: 20px;
          line-height: 1.3;
          color: #000000;
        }

        .clf-faq-right {
          max-width: 45%;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .clf-faq-item {
          background: #ffffff;
          border-radius: 30px;
          padding: 20px 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: 0.3s ease;
        }

        .clf-faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
        }

        .clf-faq-question {
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

        .clf-faq-question h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          flex: 1;
        }

        .clf-faq-icon {
          font-size: 25px;
          font-weight: 700;
          color: #000000;
          flex-shrink: 0;
          line-height: 1;
        }

        .clf-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .clf-faq-answer.open {
          max-height: 300px;
        }

        .clf-faq-answer p {
          margin-top: 10px;
          font-size: 15px;
          color: #555;
          line-height: 1.6;
        }

        .clf-faq-contact {
          background: #ffffff;
          border-radius: 30px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          gap: 20px;
        }

        .clf-faq-contact h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000;
        }

        .clf-faq-contact p {
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }

        .clf-faq-cta {
          display: inline-block;
          padding: 10px 30px;
          background: #FF9700;
          color: #000000;
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

        .clf-faq-cta:hover {
          background: #e38f12;
          transform: translateY(-2px);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 900px) {
          .clf-faq-section {
            padding: 80px 20px;
            min-height: unset;
          }
          .clf-faq-container {
            flex-direction: column;
            gap: 50px;
          }
          .clf-faq-left,
          .clf-faq-right {
            max-width: 100%;
            width: 100%;
          }
          .clf-faq-left h1 {
            font-size: 36px;
          }
          .clf-faq-left p {
            margin-top: 16px;
            font-size: 18px;
          }
          .clf-faq-contact {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <section className="clf-faq-section">
        {/* Background design image */}
        <Image
          src="/college-img/college/design_c.svg"
          alt=""
          className="clf-faq-bg"
          width={1920}
          height={400}
          aria-hidden="true"
          style={{ objectFit: "cover", height: "auto" }}
        />

        <div className="clf-faq-container">

          {/* LEFT */}
          <div className="clf-faq-left">
            <h1>
              Frequently Asked <br />
              <span>Questions</span>
            </h1>
            <p>
              Here are some common questions about our services to help you understand better
            </p>
          </div>

          {/* RIGHT */}
          <div className="clf-faq-right">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="clf-faq-item"
                onClick={() => toggle(i)}
              >
                <button className="clf-faq-question" aria-expanded={openIndex === i}>
                  <h3>{faq.q}</h3>
                  <span className="clf-faq-icon">{openIndex === i ? "−" : "+"}</span>
                </button>
                <div className={`clf-faq-answer${openIndex === i ? " open" : ""}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}

            {/* Contact box */}
            <div className="clf-faq-contact">
              <div>
                <h3>Have Questions? We&apos;re Here to Help!</h3>
                <p>Reach out to our support team for any queries.</p>
              </div>
              <a
                href="mailto:connect@talentyug.in"
                target="_blank"
                rel="noopener noreferrer"
                className="clf-faq-cta"
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
