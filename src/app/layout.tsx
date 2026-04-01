import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    template: "%s | TalentYug",
    default: "TalentYug – Campus Recruitment Platform",
  },
  description:
    "TalentYug connects students, colleges, and companies through streamlined campus recruitment events, QR check-ins, and real-time analytics.",
  keywords: ["campus recruitment", "placement drive", "QR check-in", "talent management"],
  openGraph: {
    title: "TalentYug – Campus Recruitment Platform",
    description:
      "Streamline campus placement drives with QR check-ins, pre-registration forms, and real-time analytics.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
