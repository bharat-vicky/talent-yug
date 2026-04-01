import type { Metadata } from "next";
import StudentHero from "@/components/marketing/students/StudentHero";
import StudentMarquee from "@/components/marketing/students/StudentMarquee";
import StudentVS from "@/components/marketing/students/StudentVS";
import StudentProcess from "@/components/marketing/students/StudentProcess";
import StudentTestimonials from "@/components/marketing/students/StudentTestimonials";
import StudentFooter from "@/components/marketing/students/StudentFooter";

export const metadata: Metadata = {
  title: "For Students – TalentYug",
  description:
    "Discover placement drives, register instantly, and get your personalised QR pass with TalentYug.",
};

export default function StudentsPage() {
  return (
    <main style={{ background: "#FEF2F2", overflowX: "hidden" }}>
      <StudentHero />
      <StudentMarquee />
      <StudentVS />
      <StudentProcess />
      <StudentTestimonials />
      <StudentFooter />
    </main>
  );
}
