import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fbff] to-white flex flex-col">
      {/* Minimal header */}
      <header className="px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xs">TY</span>
          </div>
          <span className="font-bold text-[#2e4a7d] text-lg">TalentYug</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
