import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  hover = false,
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-card",
        paddings[padding],
        hover &&
          "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "default" | "blue" | "green" | "red" | "purple";
  trend?: { value: number; positive: boolean };
}

const colorMap = {
  default: "text-gray-900",
  blue: "text-primary",
  green: "text-success",
  red: "text-danger",
  purple: "text-purple-600",
};

export function StatCard({ label, value, icon, color = "default", trend }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className={cn("text-3xl font-bold", colorMap[color])}>{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                trend.positive ? "text-success" : "text-danger"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-xl bg-gray-50 text-gray-400">{icon}</div>
        )}
      </div>
    </Card>
  );
}
