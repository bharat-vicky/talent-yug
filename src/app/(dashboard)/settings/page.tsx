"use client";

import { useState, useMemo } from "react";
import {
  User, Lock, Bell, Palette, Save, Eye, EyeOff,
  ShieldCheck, Plus, Trash2, KeyRound,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { getUsers, registerUser } from "@/lib/auth";
import { hashPassword, isValidEmail } from "@/lib/utils";
import { writeJson, KEYS } from "@/lib/storage";
import { User as UserType, UserRole } from "@/types";
import { cn } from "@/lib/utils";

type Tab = "profile" | "security" | "notifications" | "appearance" | "users";

export default function SettingsPage() {
  const { session, refreshSession } = useAuth();
  const isAdmin = session?.role === "admin";

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile",       label: "Profile",          icon: <User size={15} /> },
    { id: "security",      label: "Security",         icon: <Lock size={15} /> },
    { id: "notifications", label: "Notifications",    icon: <Bell size={15} /> },
    { id: "appearance",    label: "Appearance",       icon: <Palette size={15} /> },
    ...(isAdmin ? [{ id: "users" as Tab, label: "Authorized Users", icon: <ShieldCheck size={15} /> }] : []),
  ];

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // ── Profile ──────────────────────────────────────────────────────────────
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  // ── Security ─────────────────────────────────────────────────────────────
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  // ── Notifications ────────────────────────────────────────────────────────
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifOffers, setNotifOffers] = useState(false);

  // ── Appearance ───────────────────────────────────────────────────────────
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [compact, setCompact] = useState(false);

  // ── Authorized Users (admin) ─────────────────────────────────────────────
  const [allUsers, setAllUsers] = useState<UserType[]>(() => getUsers());
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("company");
  const [showNewPw, setShowNewPw] = useState(false);
  const [addUserError, setAddUserError] = useState("");
  const [addUserSuccess, setAddUserSuccess] = useState("");

  const dashboardUsers = useMemo(
    () => allUsers.filter((u) => u.approved || u.role === "admin"),
    [allUsers]
  );

  async function handleProfileSave() {
    setProfileError("");
    if (!name.trim()) { setProfileError("Name is required."); return; }
    if (!isValidEmail(email)) { setProfileError("Invalid email."); return; }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const users = getUsers();
    const idx = users.findIndex((u) => u.email === session?.email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], name: trimmedName, email: trimmedEmail };
      writeJson(KEYS.USERS, users);
    }

    const updated = { ...session!, name: trimmedName, email: trimmedEmail };
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
    if (users[userIndex].passwordHash !== currentHash) {
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

  // ── Admin: add user ───────────────────────────────────────────────────────
  async function handleAddUser() {
    setAddUserError("");
    setAddUserSuccess("");
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      setAddUserError("All fields are required.");
      return;
    }
    if (newUserPassword.length < 6) {
      setAddUserError("Password must be at least 6 characters.");
      return;
    }

    const result = await registerUser(
      newUserName.trim(),
      newUserEmail.trim(),
      newUserPassword,
      newUserRole,
      session!.email  // marks as admin-created → approved
    );

    if (!result.success) {
      setAddUserError(result.error ?? "Failed to create user.");
      return;
    }

    setAllUsers(getUsers());
    setNewUserName(""); setNewUserEmail(""); setNewUserPassword("");
    setAddUserSuccess(`User "${newUserName.trim()}" added successfully.`);
    setTimeout(() => setAddUserSuccess(""), 3000);
  }

  // ── Admin: remove user ───────────────────────────────────────────────────
  function handleRemoveUser(userId: string) {
    const users = getUsers().filter((u) => u.id !== userId);
    writeJson(KEYS.USERS, users);
    setAllUsers(users);
  }

  // ── Admin: reset user password ───────────────────────────────────────────
  const [resetingId, setResetingId] = useState<string | null>(null);
  const [resetPw, setResetPw] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  async function handleResetPassword(userId: string) {
    if (!resetPw || resetPw.length < 6) {
      setResetMsg("Password must be at least 6 characters.");
      return;
    }
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return;
    const hash = await hashPassword(resetPw);
    users[idx] = { ...users[idx], passwordHash: hash };
    writeJson(KEYS.USERS, users);
    setAllUsers(users);
    setResetingId(null);
    setResetPw("");
    setResetMsg("Password updated.");
    setTimeout(() => setResetMsg(""), 2000);
  }

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    company: "bg-blue-100 text-blue-700",
    college: "bg-green-100 text-green-700",
    student: "bg-amber-100 text-amber-700",
    guest: "bg-gray-100 text-gray-600",
  };

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
        <div className="lg:w-52 shrink-0">
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
        <div className="flex-1 max-w-2xl">

          {/* ── Profile ── */}
          {activeTab === "profile" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Profile Information</h2>
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
                {profileError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-danger">{profileError}</div>}
                <Input label="Full Name" value={name} onChange={(e) => { setName(e.target.value); setProfileSaved(false); }} required />
                <Input label="Email Address" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setProfileSaved(false); }} required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                  <div className="px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 capitalize">
                    {session?.role}<span className="ml-2 text-xs text-gray-400">(Cannot be changed)</span>
                  </div>
                </div>
                <Button onClick={handleProfileSave}>
                  <Save size={15} />
                  {profileSaved ? "Profile Saved!" : "Save Profile"}
                </Button>
              </div>
            </Card>
          )}

          {/* ── Security ── */}
          {activeTab === "security" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Change Password</h2>
              <div className="space-y-4">
                {pwError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-danger">{pwError}</div>}
                <Input label="Current Password" type={showPw ? "text" : "password"} value={currentPw}
                  onChange={(e) => { setCurrentPw(e.target.value); setPwSaved(false); }}
                  rightIcon={<button type="button" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
                />
                <Input label="New Password" type={showPw ? "text" : "password"} value={newPw}
                  onChange={(e) => { setNewPw(e.target.value); setPwSaved(false); }} hint="Minimum 6 characters"
                />
                <Input label="Confirm New Password" type={showPw ? "text" : "password"} value={confirmPw}
                  onChange={(e) => { setConfirmPw(e.target.value); setPwSaved(false); }}
                />
                <Button onClick={handlePasswordChange}>
                  <Lock size={15} />
                  {pwSaved ? "Password Updated!" : "Update Password"}
                </Button>
              </div>
            </Card>
          )}

          {/* ── Notifications ── */}
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
                    <button onClick={() => n.set(!n.value)}
                      className={cn("relative w-11 h-6 rounded-full transition-colors", n.value ? "bg-primary" : "bg-gray-200")}
                    >
                      <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", n.value && "translate-x-5")} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── Appearance ── */}
          {activeTab === "appearance" && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-5">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button key={t} onClick={() => setTheme(t)}
                        className={cn("py-3 px-4 rounded-xl border text-sm font-semibold capitalize transition",
                          theme === t ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >{t}</button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Dark mode coming soon.</p>
                </div>
                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Compact Mode</p>
                    <p className="text-xs text-gray-500">Reduce spacing in the dashboard</p>
                  </div>
                  <button onClick={() => setCompact(!compact)}
                    className={cn("relative w-11 h-6 rounded-full transition-colors", compact ? "bg-primary" : "bg-gray-200")}
                  >
                    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", compact && "translate-x-5")} />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Authorized Users (admin only) ── */}
          {activeTab === "users" && isAdmin && (
            <div className="space-y-5">
              {/* Add user */}
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus size={16} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Add Authorized User</h2>
                    <p className="text-xs text-gray-400">Users you create here can log in to the dashboard.</p>
                  </div>
                </div>

                {addUserError && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-danger">{addUserError}</div>
                )}
                {addUserSuccess && (
                  <div className="mb-3 p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">{addUserSuccess}</div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <Input
                    label="Full Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="John Smith"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <Input
                    label="Password"
                    type={showNewPw ? "text" : "password"}
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    hint="User should change this after first login"
                    rightIcon={
                      <button type="button" onClick={() => setShowNewPw(!showNewPw)}>
                        {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary"
                    >
                      <option value="company">Company / Operator</option>
                      <option value="college">College</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddUser}>
                  <Plus size={15} /> Add User
                </Button>
              </Card>

              {/* User list */}
              <Card padding="none">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    Dashboard Users ({dashboardUsers.length})
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    These accounts can access the dashboard.
                  </p>
                </div>

                {resetMsg && (
                  <div className="px-5 py-2 bg-green-50 text-green-700 text-xs border-b border-green-100">{resetMsg}</div>
                )}

                {dashboardUsers.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-400">No users yet.</div>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {dashboardUsers.map((u) => (
                      <li key={u.id} className="px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                              {u.name[0]?.toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold capitalize", roleColors[u.role] ?? "bg-gray-100 text-gray-600")}>
                                  {u.role}
                                </span>
                                {u.createdBy && (
                                  <span className="text-[10px] text-gray-400">Added by admin</span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Actions — never delete yourself */}
                          {u.email !== session?.email && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => { setResetingId(resetingId === u.id ? null : u.id); setResetPw(""); }}
                                className="p-2 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition"
                                title="Reset password"
                              >
                                <KeyRound size={14} />
                              </button>
                              <button
                                onClick={() => handleRemoveUser(u.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                                title="Remove user"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Inline password reset */}
                        {resetingId === u.id && (
                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={resetPw}
                              onChange={(e) => setResetPw(e.target.value)}
                              placeholder="New password (min 6 chars)"
                              className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => handleResetPassword(u.id)}
                              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                            >
                              Set
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
