"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Per-page colour themes
const PAGE_THEMES: Record<string, {
  bg: string;
  scrolledBg: string;
  accent: string;
  mobileBg: string;
}> = {
  "/": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.95)",
    accent: "#005070",
    mobileBg: "#ffffff",
  },
  "/students": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.95)",
    accent: "#2180A8",
    mobileBg: "#ffffff",
  },
  "/colleges": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.95)",
    accent: "#2180A8",
    mobileBg: "#ffffff",
  },
  "/companies": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.95)",
    accent: "#2180A8",
    mobileBg: "#ffffff",
  },
  "/about": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.95)",
    accent: "#1d4ed8",
    mobileBg: "#ffffff",
  },
};

const DEFAULT_LINKS = [
  { href: "/students", label: "Students" },
  { href: "/colleges", label: "Colleges" },
  { href: "/companies", label: "Companies" },
];

const MARKETING_PAGE_LINKS = [
  { href: "#features", label: "FEATURES" },
  { href: "#pricing", label: "PRICE PLAN" },
  { href: "#testimonials", label: "TESTIMONIALS" },
];

export default function MarketingNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMarketingPage =
    pathname === "/students" || pathname === "/companies" || pathname === "/colleges";
  const theme = PAGE_THEMES[pathname] ?? PAGE_THEMES["/"];
  const links = isMarketingPage ? MARKETING_PAGE_LINKS : DEFAULT_LINKS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <style>{`
        /* Header Base */
        .ty-main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
          padding: 20px 0;
          transition: padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          z-index: 200;
        }

        .ty-main-header.is-scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 13px 0;
          border-bottom-color: rgba(226, 232, 240, 0.95);
          box-shadow: 0 4px 20px rgba(0, 50, 80, 0.05);
        }

        /* Floating Island Variant for Home & About */
        .ty-island-header {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateY(24px) translateX(-50%);
          width: 92%;
          max-width: 1200px;
          box-sizing: border-box;
          padding: 14px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0, 50, 80, 0.05);
          border: 1.5px solid rgba(33, 128, 168, 0.15);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 200;
        }

        .ty-island-header.is-scrolled {
          transform: translateY(10px) translateX(-50%);
          padding: 10px 22px;
          border-radius: 30px;
          box-shadow: 0 12px 35px rgba(0, 50, 80, 0.12);
        }

        /* Inner Centered Container for Marketing Pages */
        .ty-nav-container {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Logo */
        .ty-logo-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .ty-logo-text {
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 800;
          color: #005070;
          letter-spacing: -0.02em;
        }

        /* Desktop Nav Group */
        .ty-desktop-nav {
          display: flex;
          align-items: center;
          gap: clamp(24px, 3.5vw, 48px);
        }

        .ty-nav-links-wrap {
          display: flex;
          align-items: center;
          gap: clamp(20px, 2.5vw, 36px);
        }

        /* Nav Item Link */
        .ty-nav-item {
          text-decoration: none;
          color: #243547;
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.06em;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          white-space: nowrap;
        }

        .ty-nav-item:visited {
          color: #243547;
        }

        .ty-nav-item:hover {
          color: #2180A8;
          transform: translateY(-1px);
        }

        /* Buttons Group */
        .ty-btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        /* Login Pill Button */
        .ty-custom-login-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 26px;
          height: 42px;
          border-radius: 9999px;
          border: 1.5px solid #2280A8;
          background: #ffffff;
          color: #0f172a;
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          cursor: pointer;
          box-sizing: border-box;
          line-height: 1;
        }

        .ty-custom-login-btn:hover {
          background: #f0f7fb;
          border-color: #1a6f93;
          color: #005070;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(34, 128, 168, 0.16);
        }

        .ty-custom-login-btn:active {
          transform: translateY(0);
        }

        /* Register Solid Button */
        .ty-custom-register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          height: 42px;
          border-radius: 21px 21px 21px 4px;
          border: 1.5px solid #2280A8;
          background: #2280A8;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          cursor: pointer;
          box-sizing: border-box;
          line-height: 1;
          box-shadow: 0 2px 8px rgba(34, 128, 168, 0.25);
        }

        .ty-custom-register-btn:hover {
          background: #1a6f93;
          border-color: #1a6f93;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(34, 128, 168, 0.38);
        }

        .ty-custom-register-btn:active {
          transform: translateY(0);
        }

        /* Hamburger Toggle */
        .ty-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          z-index: 205;
        }

        .ty-hamburger span {
          width: 26px;
          height: 2.5px;
          background: #005070;
          display: block;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .ty-nav-container {
            padding: 0 16px;
          }
          .ty-desktop-nav {
            display: none !important;
          }
          .ty-hamburger {
            display: flex !important;
          }
        }

        @media (min-width: 961px) {
          .ty-mobile-drawer {
            display: none !important;
          }
        }
      `}</style>

      {isMarketingPage ? (
        /* Full-Width Structured Header for Marketing Pages (/colleges, /companies, /students) */
        <header className={`ty-main-header ${scrolled ? "is-scrolled" : ""}`}>
          <div className="ty-nav-container">
            {/* Logo */}
            <Link href="/" className="ty-logo-link">
              <Image
                src="/home-img/logo.png"
                alt="TalentYug Logo"
                width={38}
                height={38}
                style={{ height: 38, width: "auto", objectFit: "contain" }}
                priority
              />
              <span className="ty-logo-text">TalentYug</span>
            </Link>

            {/* Desktop Nav + Action Buttons */}
            <div className="ty-desktop-nav">
              <nav className="ty-nav-links-wrap" aria-label="Page navigation">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ty-nav-item"
                  >
                    {link.label.toUpperCase()}
                  </Link>
                ))}
              </nav>

              <div className="ty-btn-group">
                <Link href="/login" className="ty-custom-login-btn">
                  Login
                </Link>
                <Link href="/register" className="ty-custom-register-btn">
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="ty-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              type="button"
            >
              <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </header>
      ) : (
        /* Floating Island Header for Home (/) and About */
        <header className={`ty-island-header ${scrolled ? "is-scrolled" : ""}`}>
          {/* Logo */}
          <Link href="/" className="ty-logo-link">
            <Image
              src="/home-img/logo.png"
              alt="TalentYug Logo"
              width={38}
              height={38}
              style={{ height: 38, width: "auto", objectFit: "contain" }}
              priority
            />
            <span className="ty-logo-text">TalentYug</span>
          </Link>

          {/* Desktop Nav */}
          <div className="ty-desktop-nav">
            <nav className="ty-nav-links-wrap" aria-label="Main navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ty-nav-item"
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </nav>

            <div className="ty-btn-group">
              <Link href="/login" className="ty-custom-login-btn">
                Login
              </Link>
              <Link href="/register" className="ty-custom-register-btn">
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="ty-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            type="button"
          >
            <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </header>
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className="ty-mobile-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: theme.mobileBg,
          zIndex: 199,
          paddingTop: 88,
          paddingBottom: 28,
          paddingLeft: 24,
          paddingRight: 24,
          boxSizing: "border-box",
          transform: mobileOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "0 20px 40px rgba(0, 50, 80, 0.12)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.9)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                textDecoration: "none",
                color: "#0f172a",
                fontWeight: 650,
                fontSize: 16,
                letterSpacing: "0.04em",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
          <Link
            href="/login"
            className="ty-custom-login-btn"
            onClick={() => setMobileOpen(false)}
            style={{ width: "100%", textAlign: "center" }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="ty-custom-register-btn"
            onClick={() => setMobileOpen(false)}
            style={{ width: "100%", textAlign: "center", borderRadius: "9999px" }}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
