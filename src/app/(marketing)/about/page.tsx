import type { Metadata } from "next";
import AboutHero from "@/components/marketing/about/AboutHero";
import AboutStory from "@/components/marketing/about/AboutStory";
import AboutMission from "@/components/marketing/about/AboutMission";
import AboutFounder from "@/components/marketing/about/AboutFounder";
import AboutGrowth from "@/components/marketing/about/AboutGrowth";
import AboutFooter from "@/components/marketing/about/AboutFooter";

export const metadata: Metadata = {
  title: "About Us – TalentYug",
  description:
    "Built by students at IIT Patna to solve India's placement crisis for Tier 2/3 colleges.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutFounder />
      <AboutGrowth />
      <AboutFooter />
    </main>
  );
}
