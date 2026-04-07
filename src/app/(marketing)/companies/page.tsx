import CompanyHero from "@/components/marketing/companies/CompanyHero";
import CompanyMarquee from "@/components/marketing/companies/CompanyMarquee";
import CompanyVS from "@/components/marketing/companies/CompanyVS";
import CompanyProcess from "@/components/marketing/companies/CompanyProcess";
import CompanyFeatures from "@/components/marketing/companies/CompanyFeatures";
import CompanyPricing from "@/components/marketing/companies/CompanyPricing";
import CompanyFAQ from "@/components/marketing/companies/CompanyFAQ";
import CompanyTestimonials from "@/components/marketing/companies/CompanyTestimonials";
import CompanyFooter from "@/components/marketing/companies/CompanyFooter";

export default function CompaniesPage() {
  return (
    <>
      <CompanyHero />
      <CompanyMarquee />
      <CompanyVS />
      <CompanyProcess />
      <CompanyFeatures />
      <CompanyPricing />
      <CompanyFAQ />
      <CompanyTestimonials />
      <CompanyFooter />
    </>
  );
}
