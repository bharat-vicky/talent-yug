import type { Metadata } from "next";
import HomeHero from "@/components/marketing/home/HomeHero";
import HomeWhy from "@/components/marketing/home/HomeWhy";
import HomeInfrastructure from "@/components/marketing/home/HomeInfrastructure";
import HomeTestimonials from "@/components/marketing/home/HomeTestimonials";
import HomeFooter from "@/components/marketing/home/HomeFooter";

export const metadata: Metadata = {
  title: "TalentYug – Campus Recruitment Platform",
  description:
    "TalentYug connects students, colleges, and companies through streamlined campus recruitment events, QR check-ins, and real-time analytics.",
};

export default function HomePage() {
  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>
      <HomeHero />
      <HomeWhy />
      <HomeInfrastructure />
      <HomeTestimonials />
      <HomeFooter />
    </main>
  );
}
