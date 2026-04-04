"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldX, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium">Loading…</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Block unapproved users
  const isAdmin = session.role === "admin";
  const isApproved = session.approved === true;

  if (!isAdmin && !isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
            <ShieldX size={28} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-sm text-gray-500 mb-6">
            Your account (<strong>{session.email}</strong>) does not have permission
            to access the dashboard. Please contact the administrator to get access.
          </p>
          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
