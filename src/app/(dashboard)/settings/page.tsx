"use client";

import { useState } from "react";
import { User, Lock, Bell, Palette, Save, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { getUsers } from "@/lib/auth";
import { hashPassword, isValidEmail } from "@/lib/utils";
import { writeJson } from "@/lib/storage";
import { KEYS } from "@/lib/storage";
import { cn } from "@/lib/utils";

type Tab = "profile" | "security" | "notifications" | "appearance";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={15} /> },
  { id: "security", label: "Security", icon: <Lock size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={15} /> },
];

export default function SettingsPage() {
  const { session, refreshSession } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Security
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  // Notifications
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifOffers, setNotifOffers] = useState(false);

  // Appearance
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [compact, setCompact] = useState(false);

  async function handleProfileSave() {
    setProfileError("");
    if (!name.trim()) { setProfileError("Name is required."); return; }
    if (!isValidEmail(email)) { setProfileError("Invalid email."); return; }

    // Update session
    const updated = { ...session!, name: name.trim(), email: email.trim().toLowerCase() };
    writeJson(KEYS.SESSION, updated);
    refreshSession();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  }

  async function handlePasswordChange() {
    setPwError("");
    if (!currentPw || !newPw || !confirmPw) { setPwError("All fields are required."); return; }
    if (newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.email === session?.email);
    if (userIndex === -1) { setPwError("User not found."); return; }

    const currentHash = await hashPassword(currentPw);
    if (users[userIndex].passwordHash !== currentHash &&
        users[userIndex].passwordHash !== currentPw) {
      setPwError("Current password is incorrect.");
      return;
    }

    const newHash = await hashPassword(newPw);
    users[userIndex] = { ...users[userIndex], passwordHash: newHash };
    writeJson(KEYS.USERS, users);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2000);
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-48 shrink-0">
          <Card padding="sm">
            <nav className="space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition",
                    activeTab === t.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-xl">
          {activeTab === "profile" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                  {name ? name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-accent/20 text-primary text-xs font-semibold rounded-full capitalize">
                    {session?.role}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {profileError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-danger">
                    {profileError}
                  </div>
                )}
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setProfileSaved(false); }}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setProfileSaved(false); }}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                  <div className="px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 capitalize">
                    {session?.role}
                    <span className="ml-2 text-xs text-gray-400">(Cannot be changed)</span>
                  </div>
                </div>
                <Button onClick={handleProfileSave}>
                  <Save size={15} />
                  {profileSaved ? "Profile Saved!" : "Save Profile"}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Change Password</h2>
              <div className="space-y-4">
                {pwError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-danger">
                    {pwError}
                  </div>
                )}
                <Input
                  label="Current Password"
                  type={showPw ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => { setCurrentPw(e.target.value); setPwSaved(false); }}
                  rightIcon={
                    <button type="button" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />
                <Input
                  label="New Password"
                  type={showPw ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => { setNewPw(e.target.value); setPwSaved(false); }}
                  hint="Minimum 6 characters"
                />
                <Input
                  label="Confirm New Password"
                  type={showPw ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => { setConfirmPw(e.target.value); setPwSaved(false); }}
                />
                <Button onClick={handlePasswordChange}>
                  <Lock size={15} />
                  {pwSaved ? "Password Updated!" : "Update Password"}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Sign-in Method</h3>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={15} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 capitalize">
                      {session?.provider} account
                    </p>
                    <p className="text-xs text-gray-500">{session?.email}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Notification Preferences</h2>
              <div className="space-y-1">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", value: notifEmail, set: setNotifEmail },
                  { label: "Event Reminders", desc: "Get notified 24h before an event", value: notifEvents, set: setNotifEvents },
                  { label: "Offer Updates", desc: "Instant alerts when an offer is received", value: notifOffers, set: setNotifOffers },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{n.label}</p>
                      <p className="text-xs text-gray-500">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => n.set(!n.value)}
                      className={cn(
                        "relative w-11 h-6 rounded-full transition-colors",
                        n.value ? "bg-primary" : "bg-gray-200"
                      )}
                    >
                      <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", n.value && "translate-x-5")} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={cn(
                          "py-3 px-4 rounded-xl border text-sm font-semibold capitalize transition",
                          theme === t
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Dark mode coming soon. Currently only light theme is available.
                  </p>
                </div>
                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Compact Mode</p>
                    <p className="text-xs text-gray-500">Reduce spacing in the dashboard</p>
                  </div>
                  <button
                    onClick={() => setCompact(!compact)}
                    className={cn("relative w-11 h-6 rounded-full transition-colors", compact ? "bg-primary" : "bg-gray-200")}
                  >
                    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", compact && "translate-x-5")} />
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
