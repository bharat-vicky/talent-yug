import type { Metadata } from "next";
import CollegeHero from "@/components/marketing/colleges/CollegeHero";
import CollegeMarquee from "@/components/marketing/colleges/CollegeMarquee";
import CollegeVS from "@/components/marketing/colleges/CollegeVS";
import CollegeFeatures from "@/components/marketing/colleges/CollegeFeatures";
import CollegeProcess from "@/components/marketing/colleges/CollegeProcess";
import CollegePricing from "@/components/marketing/colleges/CollegePricing";
import CollegeTestimonials from "@/components/marketing/colleges/CollegeTestimonials";
import CollegeFAQ from "@/components/marketing/colleges/CollegeFAQ";
import CollegeFooter from "@/components/marketing/colleges/CollegeFooter";

export const metadata: Metadata = {
  title: "For Colleges – TalentYug",
  description:
    "Turn placements into your competitive advantage with 70%+ placement success rate and data-driven infrastructure.",
};

export default function CollegesPage() {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <main style={{ background: "#ffffff", overflowX: "hidden" }}>
        <CollegeHero />
        <CollegeMarquee />
        <CollegeVS />
        <CollegeFeatures />
        <CollegeProcess />
        <CollegePricing />
        <CollegeTestimonials />
        <CollegeFAQ />
        <CollegeFooter />
      </main>
    </>
  );
}
