"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Per-page colour themes matching the original HTML
const PAGE_THEMES: Record<string, {
  bg: string;
  scrolledBg: string;
  accent: string;          // login border + register background
  mobileBg: string;        // mobile drawer background
}> = {
  "/": {
    bg: "#ffffff",
    scrolledBg: "rgba(255,255,255,0.9)",
    accent: "#005070",
    mobileBg: "#ffffff",
  },
  "/students": {
    bg: "#FEF2F2",
    scrolledBg: "rgba(254,242,242,0.9)",
    accent: "#7E0000",
    mobileBg: "#FEF2F2",
  },
  "/colleges": {
    bg: "#FFFAF6",
    scrolledBg: "rgba(254,242,221,0.9)",
    accent: "#FF9700",
    mobileBg: "#FFFAF6",
  },
  "/companies": {
    bg: "#E4FBF8",
    scrolledBg: "rgba(228,251,248,0.9)",
    accent: "#006F5F",
    mobileBg: "#E4FBF8",
  },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/colleges", label: "Colleges" },
  { href: "/companies", label: "Companies" },
];

export default function MarketingNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = PAGE_THEMES[pathname] ?? PAGE_THEMES["/"];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <style>{`
        .ty-nav-link {
          text-decoration: none;
          color: #000;
          font-weight: 500;
          font-size: 15px;
          transition: opacity 0.2s;
        }
        .ty-nav-link:hover { opacity: 0.65; }
        .ty-login-btn {
          padding: 10px 26px;
          white-space: nowrap;
          background: transparent;
          border-radius: 30px 30px 0 30px;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .ty-login-btn:hover { opacity: 0.75; }
        .ty-register-btn {
          padding: 10px 26px;
          white-space: nowrap;
          color: #fff;
          border: none;
          border-radius: 30px 30px 30px 0;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          transition: filter 0.2s;
        }
        .ty-register-btn:hover { filter: brightness(1.15); }
        .ty-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .ty-hamburger span {
          width: 28px;
          height: 3px;
          background: #000;
          display: block;
          border-radius: 2px;
          transition: 0.3s;
        }
        @media (max-width: 768px) {
          .ty-desktop-nav { display: none !important; }
          .ty-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .ty-mobile-drawer { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: scrolled
            ? "translateX(-50%) translateY(10px)"
            : "translateX(-50%)",
          width: "100%",
          maxWidth: scrolled ? "92%" : "100%",
          padding: scrolled ? "12px 18px" : "18px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrolled ? theme.scrolledBg : theme.bg,
          backdropFilter: "blur(14px)",
          borderRadius: scrolled ? "50px" : "0px",
          boxShadow: scrolled ? "0 15px 40px rgba(0,0,0,0.2)" : "none",
          transition: "padding .35s ease, max-width .35s ease, box-shadow .35s ease, border-radius .35s ease, transform .35s ease, background .35s ease",
          zIndex: 200,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <Image src="/home-img/logo.png" alt="TalentYug" width={40} height={40} style={{ height: 40, width: "auto" }} />
          <span style={{ fontSize: 26, fontWeight: 700, color: "#1F3F68" }}>TalentYug</span>
        </Link>

        {/* Desktop nav + buttons */}
        <div className="ty-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ty-nav-link"
                style={{ fontWeight: pathname === link.href ? 700 : 500 }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className="ty-login-btn"
            style={{ border: `1px solid ${theme.accent}`, color: "#000" }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="ty-register-btn"
            style={{ background: theme.accent }}
          >
            Register
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="ty-hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px,6px)" : "none" }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px,-6px)" : "none" }} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className="ty-mobile-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: theme.mobileBg,
          zIndex: 199,
          paddingTop: 80,
          paddingBottom: 30,
          paddingLeft: 24,
          paddingRight: 24,
          transform: mobileOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                textDecoration: "none",
                color: pathname === link.href ? theme.accent : "#000",
                fontWeight: pathname === link.href ? 700 : 500,
                fontSize: 17,
                background: pathname === link.href ? `${theme.accent}15` : "transparent",
              }}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <Link
            href="/login"
            style={{
              display: "block",
              textAlign: "center",
              padding: "12px 0",
              border: `1px solid ${theme.accent}`,
              borderRadius: "30px 30px 0 30px",
              textDecoration: "none",
              color: "#000",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Login
          </Link>
          <Link
            href="/register"
            style={{
              display: "block",
              textAlign: "center",
              padding: "12px 0",
              background: theme.accent,
              borderRadius: "30px 30px 30px 0",
              textDecoration: "none",
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
