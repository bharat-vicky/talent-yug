import CollegeHero from "@/components/marketing/colleges/CollegeHero";
import CollegeMarquee from "@/components/marketing/colleges/CollegeMarquee";
import CollegeVS from "@/components/marketing/colleges/CollegeVS";
import CollegeProcess from "@/components/marketing/colleges/CollegeProcess";
import CollegeFeatures from "@/components/marketing/colleges/CollegeFeatures";
import CollegePricing from "@/components/marketing/colleges/CollegePricing";
import CollegeFAQ from "@/components/marketing/colleges/CollegeFAQ";
import CollegeTestimonials from "@/components/marketing/colleges/CollegeTestimonials";
import CollegeFooter from "@/components/marketing/colleges/CollegeFooter";

export default function CollegesPage() {
  return (
    <>
      <CollegeHero />
      <CollegeMarquee />
      <CollegeVS />
      <CollegeProcess />
      <CollegeFeatures />
      <CollegePricing />
      <CollegeFAQ />
      <CollegeTestimonials />
      <CollegeFooter />
    </>
  );
}
