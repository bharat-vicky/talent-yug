import CollegeHero from "@/components/marketing/colleges/CollegeHero";
import CollegeMarquee from "@/components/marketing/colleges/CollegeMarquee";
import CollegeVS from "@/components/marketing/colleges/CollegeVS";
import CollegeProcess from "@/components/marketing/colleges/CollegeProcess";
import CollegeTestimonials from "@/components/marketing/colleges/CollegeTestimonials";
import CollegeFooter from "@/components/marketing/colleges/CollegeFooter";

export default function CollegesPage() {
  return (
    <>
      <CollegeHero />
      <CollegeMarquee />
      <CollegeVS />
      <CollegeProcess />
      <CollegeTestimonials />
      <CollegeFooter />
    </>
  );
}
