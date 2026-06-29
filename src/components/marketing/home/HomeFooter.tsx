"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { readJson, writeJson, KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import type { ContactQuery } from "@/types";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "Instagram", icon: Instagram },
  { label: "X", icon: XIcon },
  { label: "Facebook", icon: Facebook },
];

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "For Colleges", href: "/colleges" },
      { label: "For Companies", href: "/companies" },
      { label: "For Students", href: "/students" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Event Management", href: "/login" },
      { label: "QR Check-In", href: "/login" },
      { label: "Analytics", href: "/login" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign Up", href: "/register" },
      { label: "Log In", href: "/login" },
      { label: "Reset Password", href: "/forgot-password" },
    ],
  },
];

const EMPTY_FORM = { name: "", phone: "", organization: "", query: "" };

export default function HomeFooter() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const existing = readJson<ContactQuery[]>(KEYS.CONTACT_QUERIES, []);
    const entry: ContactQuery = {
      id: generateId(),
      name: form.name,
      phone: form.phone,
      organization: form.organization,
      query: form.query,
      submittedAt: Date.now(),
    };
    writeJson(KEYS.CONTACT_QUERIES, [...existing, entry]);
    setForm(EMPTY_FORM);
    setSubmitted(true);
  }

  const year = new Date().getFullYear();

  return (
    <footer style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .hf-cta-section {
          background: linear-gradient(180deg, #F1FAFE 0%, #E2F1FB 100%);
          padding: 90px 20px 0;
        }
        .hf-cta-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding-bottom: 70px;
        }
        .hf-cta-left h2 {
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 800;
          color: #0B3654;
          margin: 0 0 18px;
          line-height: 1.15;
        }
        .hf-cta-left p {
          font-size: 16px;
          color: #33424C;
          line-height: 1.6;
          margin: 0 0 28px;
          max-width: 420px;
        }
        .hf-contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          color: #16344A;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
        }
        .hf-contact-row svg { flex-shrink: 0; color: #2180A8; }
        .hf-social-row {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .hf-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1.5px solid #0B3654;
          color: #0B3654;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .hf-social-icon:hover {
          background: #0B3654;
          color: #fff;
        }

        .hf-form-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: 28px;
          padding: 36px;
          box-shadow: 0 25px 60px rgba(11,54,84,0.12);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hf-input, .hf-textarea {
          width: 100%;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(11,54,84,0.1);
          border-radius: 14px;
          padding: 15px 18px;
          font-size: 14.5px;
          color: #0B3654;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .hf-input::placeholder, .hf-textarea::placeholder { color: #6b8497; }
        .hf-input:focus, .hf-textarea:focus { border-color: #2180A8; }
        .hf-textarea { min-height: 110px; resize: vertical; }
        .hf-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          background: #0B3654;
          color: #fff;
          border: none;
          padding: 13px 30px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .hf-submit-btn:hover { background: #196687; transform: translateY(-1px); }
        .hf-success-msg {
          font-size: 14px;
          font-weight: 600;
          color: #1f8f5f;
          margin: 0;
        }

        .hf-skyline {
          position: relative;
          width: 100%;
          height: clamp(120px, 16vw, 200px);
        }

        .hf-footer-main {
          background: #2180A8;
          color: #fff;
          padding: 0 20px clamp(32px,5vw,60px);
        }
        .hf-footer-main-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          padding-top: 10px;
        }
        .hf-col h4 {
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.55);
        }
        .hf-col ul { list-style: none; padding: 0; margin: 0; }
        .hf-col li { margin-bottom: 10px; }
        .hf-col a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14.5px; }
        .hf-col a:hover { color: #fff; }

        .hf-brand { max-width: 300px; }
        .hf-brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .hf-brand-row span { font-size: 24px; font-weight: 700; color: #fff; font-family: Georgia, serif; }
        .hf-brand p { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.7; margin: 0; }

        .hf-bottom-bar {
          max-width: 1300px;
          margin: 40px auto 0;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.2);
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
        }
        .hf-bottom-bar a { color: rgba(255,255,255,0.7); text-decoration: none; }
        .hf-bottom-bar a:hover { color: #fff; }

        @media (max-width: 860px) {
          .hf-cta-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      {/* Be Part Of The Change */}
      <div className="hf-cta-section">
        <div className="hf-cta-inner">
          <div className="hf-cta-left">
            <h2>Be Part Of The Change</h2>
            <p>Join The Movement To Fix Campus Hiring For Tier 2/3 Colleges.</p>

            <a href="tel:+918210597576" className="hf-contact-row">
              <Phone size={18} /> +91 8210597576
            </a>
            <a href="mailto:connect@talentyug.in" className="hf-contact-row">
              <Mail size={18} /> connect@talentyug.in
            </a>
            <span className="hf-contact-row">
              <MapPin size={18} /> Wazirganj, Gaya, Bihar, India-805131
            </span>

            <div className="hf-social-row">
              {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
                <a key={label} href="#" aria-label={label} className="hf-social-icon">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="hf-cta-right">
            <form className="hf-form-card" onSubmit={handleSubmit}>
              <input
                className="hf-input"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="hf-input"
                placeholder="Contact Number"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                required
              />
              <input
                className="hf-input"
                placeholder="Affiliated Organization"
                value={form.organization}
                onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              />
              <textarea
                className="hf-textarea"
                placeholder="Query"
                value={form.query}
                onChange={(e) => setForm((f) => ({ ...f, query: e.target.value }))}
                required
              />
              <button type="submit" className="hf-submit-btn">
                <Send size={16} /> Submit
              </button>
              {submitted && <p className="hf-success-msg">Thanks! We&apos;ll be in touch shortly.</p>}
            </form>
          </div>
        </div>

        {/* Skyline transition */}
        <div className="hf-skyline">
          <Image
            src="/home-img/landing/foot.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "bottom" }}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Footer links + brand */}
      <div className="hf-footer-main">
        <div className="hf-footer-main-inner">
          {FOOTER_COLUMNS.map((col) => (
            <div className="hf-col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hf-brand">
            <div className="hf-brand-row">
              <Image src="/home-img/logo.png" alt="TalentYug" width={40} height={40} style={{ height: 40, width: "auto" }} />
              <span>TalentYug</span>
            </div>
            <p>
              Connecting Students, Colleges, And Companies Through Seamless Campus
              Recruitment Events.
            </p>
          </div>
        </div>

        <div className="hf-bottom-bar">
          Copyright {year}-{String(year + 1).slice(-2)} | All Rights Reserved |{" "}
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms Of Service</Link>
        </div>
      </div>
    </footer>
  );
}
