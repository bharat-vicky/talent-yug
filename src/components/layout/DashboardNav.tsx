"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  LayoutDashboard,
  QrCode,
  Scan,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const mainNav = [
  { href: "/events",         label: "My Events",  icon: Calendar },
  { href: "/analytics",      label: "Dashboard",  icon: LayoutDashboard },
  { href: "/qr",             label: "Manage QR",  icon: QrCode },
  { href: "/scanner",        label: "Scanner",    icon: Scan },
  { href: "/guests",         label: "Guest List", icon: Users },
];

const settingsNav = [
  { href: "/settings",        label: "Account Settings" },
  { href: "/event-settings",  label: "Event Settings" },
  { href: "/scanner/settings", label: "Scanner Settings" },
  { href: "/pre-registration", label: "Pre-Registration" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const initials = session?.name
    ? session.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const isSettingsActive = settingsNav.some(
    (s) => pathname === s.href || pathname.startsWith(s.href + "/")
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-4">
            {/* Logo */}
            <Link href="/events" className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">TY</span>
              </div>
              <span className="font-bold text-primary text-lg tracking-tight hidden sm:block">
                TalentYug
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 ml-4">
              {mainNav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "text-primary bg-accent/10"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                );
              })}

              {/* Settings dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isSettingsActive
                      ? "text-primary bg-accent/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <Settings size={15} />
                  Settings
                  <ChevronDown
                    size={13}
                    className={cn("text-gray-400 transition-transform", settingsOpen && "rotate-180")}
                  />
                </button>
                {settingsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                      {settingsNav.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setSettingsOpen(false)}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition",
                            pathname === s.href || pathname.startsWith(s.href + "/")
                              ? "text-primary bg-accent/10 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Right: user + logout */}
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {initials}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {session?.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-danger border border-red-100 hover:bg-red-50 transition"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile toggle */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-primary text-lg">TalentYug</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {mainNav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
                      active ? "bg-accent/10 text-primary" : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="px-4 py-1 text-xs text-gray-400 font-semibold uppercase tracking-wide">Settings</p>
                {settingsNav.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition",
                      pathname === s.href ? "bg-accent/10 text-primary" : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Settings size={16} />
                    {s.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 w-full"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
