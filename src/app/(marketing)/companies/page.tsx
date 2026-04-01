import CompanyHero from "@/components/marketing/companies/CompanyHero";
import CompanyMarquee from "@/components/marketing/companies/CompanyMarquee";
import CompanyVS from "@/components/marketing/companies/CompanyVS";
import CompanyProcess from "@/components/marketing/companies/CompanyProcess";
import CompanyTestimonials from "@/components/marketing/companies/CompanyTestimonials";
import CompanyFooter from "@/components/marketing/companies/CompanyFooter";

export default function CompaniesPage() {
  return (
    <>
      <CompanyHero />
      <CompanyMarquee />
      <CompanyVS />
      <CompanyProcess />
      <CompanyTestimonials />
      <CompanyFooter />
    </>
  );
}
