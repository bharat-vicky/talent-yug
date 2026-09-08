"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let safetyTimeout: NodeJS.Timeout | null = null;

    // Delay initialization slightly to ensure client components and dynamic styles are fully mounted
    const initTimeout = setTimeout(() => {
      initScrollAnimations();
    }, 50);

    function initScrollAnimations() {
      // Elements that should never be animated
      const isExcluded = (el: HTMLElement) => {
        return (
          el.closest("header") ||
          el.closest("nav") ||
          el.closest(".ty-nav") ||
          el.closest(".ty-mobile-menu") ||
          el.closest(".clm-wrapper") ||
          el.closest(".cmm-wrapper") ||
          el.closest(".stm-wrapper") ||
          el.tagName.toLowerCase() === "svg" ||
          el.closest("svg")
        );
      };

      // 1. Target main sections
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main > section, main > div > section, main footer, footer, .infra-section, .infra-container"
        )
      ).filter((el) => !isExcluded(el));

      // 2. Target major section headings
      const headingSelectors = [
        "main section h1",
        "main section h2",
        "main section h3",
        ".hhero-heading",
        ".hwhy-title",
        ".hwhy-subtitle",
        ".infra-title",
        ".cl-hero-title",
        ".clf-title",
        ".cp-pricing-header",
        ".crev-heading",
        ".crev-subheading",
        ".cfaq-heading",
        ".co-hero-title",
        ".cf-title",
        ".cpr-header",
        ".ct-header",
        ".cfq-heading",
        ".sh-title",
        ".sf-title",
        ".sres-title",
        ".srev-header",
        ".sfq-heading",
        ".ab-main-title",
        ".abf-section-title",
        ".abg-heading",
        ".abg-subtext",
      ].join(", ");

      const headings = Array.from(
        document.querySelectorAll<HTMLElement>(headingSelectors)
      ).filter((el) => !isExcluded(el));

      // 3. Target timeline process steps
      const stepSelectors = [
        ".proc-step-row",
        ".cpt-row",
        ".spt-row",
      ].join(", ");

      const steps = Array.from(
        document.querySelectorAll<HTMLElement>(stepSelectors)
      ).filter((el) => !isExcluded(el));

      // 4. Target cards, grid items, and review blocks
      const cardSelectors = [
        ".hwhy-stat-card",
        ".hwhy-quote-card",
        ".hwhy-nav-card",
        ".infra-card",
        ".infra-quote-wrapper",
        ".hf-cta-left",
        ".hf-form-card",
        ".clvs-outer-card",
        ".clf-card-student",
        ".clf-card-company",
        ".clf-card-college",
        ".cp-pricing-card",
        ".cpr-pricing-card",
        ".cm-pricing-card",
        ".crev-card",
        ".ct-card",
        ".srev-card",
        ".cfaq-card",
        ".cfq-card",
        ".sfq-card",
        ".sres-card",
        ".abm-main-card",
        ".abf-inner",
        ".abg-card",
        "[class*='-card']",
        "[class*='Card']",
      ].join(", ");

      const rawCards = Array.from(
        document.querySelectorAll<HTMLElement>(cardSelectors)
      ).filter((el) => !isExcluded(el));

      // Deduplicate cards so parents and children don't doubly conflict
      const cards: HTMLElement[] = [];
      rawCards.forEach((c) => {
        // Skip hero floating items that have their own CSS keyframes
        if (c.closest(".hhero-stage") || c.closest(".cl-hero-section") || c.closest(".co-hero-section") || c.closest(".sh-wrapper")) {
          return;
        }
        if (!cards.some((existing) => existing.contains(c) && existing !== c)) {
          cards.push(c);
        }
      });

      // Check if element is currently in viewport
      const isInViewport = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      // Intersection observer configuration
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add("is-revealed");

              // After the entrance animation completes, clear transitionDelay so hover styles are instant
              const delay = parseFloat(target.style.transitionDelay || "0") * 1000;
              setTimeout(() => {
                target.style.transitionDelay = "";
              }, delay + 750);

              observer?.unobserve(target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -40px 0px",
          threshold: 0.08,
        }
      );

      // Process Sections: subtle fade entrance
      sections.forEach((sec, idx) => {
        if (!sec.classList.contains("reveal-section")) {
          sec.classList.add("reveal-section");
        }
        if (isInViewport(sec) || idx === 0) {
          requestAnimationFrame(() => sec.classList.add("is-revealed"));
        } else {
          observer!.observe(sec);
        }
      });

      // Process Headings: upward slide entrance
      headings.forEach((heading) => {
        if (!heading.classList.contains("reveal-heading")) {
          heading.classList.add("reveal-heading");
        }
        if (isInViewport(heading)) {
          requestAnimationFrame(() => heading.classList.add("is-revealed"));
        } else {
          observer!.observe(heading);
        }
      });

      // Process Timeline Steps: smooth step reveal as user reaches them
      steps.forEach((step, stepIdx) => {
        if (!step.classList.contains("reveal-step")) {
          step.classList.add("reveal-step");
        }
        step.style.transitionDelay = `${(stepIdx % 2) * 80}ms`;

        if (isInViewport(step)) {
          setTimeout(() => step.classList.add("is-revealed"), 50);
        } else {
          observer!.observe(step);
        }
      });

      // Process Cards with Sibling Group Staggering
      const parentGroups = new Map<HTMLElement, HTMLElement[]>();
      cards.forEach((card) => {
        const parent = card.parentElement || document.body;
        if (!parentGroups.has(parent)) {
          parentGroups.set(parent, []);
        }
        parentGroups.get(parent)!.push(card);
      });

      parentGroups.forEach((group) => {
        group.forEach((card, indexInGroup) => {
          if (!card.classList.contains("reveal-card")) {
            card.classList.add("reveal-card");
          }
          // Apply stagger delay based on position in sibling group (0ms, 90ms, 180ms, 270ms, max 450ms)
          const delay = Math.min((indexInGroup % 6) * 90, 450);
          card.style.transitionDelay = `${delay}ms`;

          if (isInViewport(card)) {
            setTimeout(() => {
              card.classList.add("is-revealed");
              setTimeout(() => {
                card.style.transitionDelay = "";
              }, 750);
            }, delay + 40);
          } else {
            observer!.observe(card);
          }
        });
      });

      // Safety fallback: ensure nothing stays hidden if scrolled quickly
      safetyTimeout = setTimeout(() => {
        document.querySelectorAll(".reveal-section:not(.is-revealed), .reveal-card:not(.is-revealed), .reveal-heading:not(.is-revealed), .reveal-step:not(.is-revealed)")
          .forEach((el) => el.classList.add("is-revealed"));
      }, 3000);
    }

    return () => {
      clearTimeout(initTimeout);
      if (safetyTimeout) clearTimeout(safetyTimeout);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}

