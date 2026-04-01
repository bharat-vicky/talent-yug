import DashboardNav from "@/components/layout/DashboardNav";
import DashboardGuard from "@/components/dashboard/DashboardGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <DashboardNav />
      <main className="bg-gray-50 min-h-[calc(100vh-56px)]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </main>
    </DashboardGuard>
  );
}
