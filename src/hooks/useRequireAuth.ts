"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

export function useRequireAuth(requiredRole?: UserRole) {
  const { session, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (requiredRole && session.role !== requiredRole) {
      logout();
      router.replace("/login");
    }
  }, [session, isLoading, requiredRole, router, logout]);

  return { session, isLoading };
}
