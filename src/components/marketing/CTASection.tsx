import Link from "next/link";
import Button from "@/components/ui/Button";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light rounded-3xl px-8 py-16 text-center">
        {/* Background circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={primaryCta.href}>
              <Button
                className="!bg-white !text-primary hover:!bg-gray-50"
                size="lg"
              >
                {primaryCta.label}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button
                  className="!bg-transparent !text-white !border-white/40 hover:!bg-white/10"
                  variant="outline"
                  size="lg"
                >
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
