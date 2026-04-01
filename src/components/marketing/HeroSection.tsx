import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { label: string; value: string }[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text */}
        <div className="flex-1 max-w-xl">
          {badge && (
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
            {title}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-primary">{titleHighlight}</span>
              </>
            )}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={primaryCta.href}>
              <Button size="lg">{primaryCta.label}</Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media */}
        {imageSrc && (
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/10 rounded-[40px] blur-2xl" />
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                width={600}
                height={520}
                className="relative rounded-3xl w-full object-cover shadow-2xl"
                style={{ maxHeight: "520px" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
