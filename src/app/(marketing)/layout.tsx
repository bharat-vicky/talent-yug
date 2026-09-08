import MarketingNav from "@/components/layout/MarketingNav";
import ScrollRevealManager from "@/components/common/ScrollRevealManager";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollRevealManager />
      <MarketingNav />
      <main>{children}</main>
    </>
  );
}

