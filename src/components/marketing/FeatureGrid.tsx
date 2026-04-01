import React from "react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

interface FeatureGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function FeatureGrid({
  badge,
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        {badge && (
          <span className="inline-block px-3 py-1 bg-accent/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-500 max-w-2xl">{subtitle}</p>
        )}
      </div>

      <div className={cn("grid grid-cols-1 gap-6", columnClass[columns])}>
        {features.map((f, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl border border-gray-100 hover:border-accent/40 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                f.color ?? "bg-accent/15 text-primary"
              )}
            >
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
