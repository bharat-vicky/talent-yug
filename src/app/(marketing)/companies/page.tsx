import type { Metadata } from "next";
import CompanyHero from "@/components/marketing/companies/CompanyHero";
import CompanyMarquee from "@/components/marketing/companies/CompanyMarquee";
import CompanyVS from "@/components/marketing/companies/CompanyVS";
import CompanyFeatures from "@/components/marketing/companies/CompanyFeatures";
import CompanyProcess from "@/components/marketing/companies/CompanyProcess";
import CompanyPricing from "@/components/marketing/companies/CompanyPricing";
import CompanyTestimonials from "@/components/marketing/companies/CompanyTestimonials";
import CompanyFAQ from "@/components/marketing/companies/CompanyFAQ";
import CompanyFooter from "@/components/marketing/companies/CompanyFooter";

export const metadata: Metadata = {
  title: "For Companies – TalentYug",
  description:
    "Hire pre-filtered talent from Tier 2/3 colleges with curated candidate pools, fast hiring, and reduced time to-hire.",
};

export default function CompaniesPage() {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <main style={{ background: "#ffffff", overflowX: "hidden" }}>
        <CompanyHero />
        <CompanyMarquee />
        <CompanyVS />
        <CompanyFeatures />
        <CompanyProcess />
        <CompanyPricing />
        <CompanyTestimonials />
        <CompanyFAQ />
        <CompanyFooter />
      </main>
    </>
  );
}
