"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Shield, Eye, EyeOff, UserPlus, Trash2, Key,
  LogOut, RefreshCw, Copy, CheckCheck, AlertCircle,
} from "lucide-react";
import { getUsers, registerUser } from "@/lib/auth";
import { writeJson, KEYS } from "@/lib/storage";
import { hashPassword, isValidEmail } from "@/lib/utils";
import { User, UserRole } from "@/types";
import { cn } from "@/lib/utils";

// ── Superadmin credentials (never stored, only compared at runtime) ─────────
const SA_EMAIL = "bharatvicky90@gmail.com";
const SA_PASSWORD = "Shaarif@8318";
const SESSION_KEY = "ty_capman_auth";
const SESSION_TTL = 4 * 60 * 60 * 1000; // 4 hours

interface CapmanSession { ts: number }

function saveSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }));
  } catch {}
}
function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
}
function isSessionValid(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const s: CapmanSession = JSON.parse(raw);
    return Date.now() - s.ts < SESSION_TTL;
  } catch { return false; }
}

// ── Role config ──────────────────────────────────────────────────────────────
const ROLES: { value: UserRole; label: string; color: string }[] = [
  { value: "admin",   label: "Admin",   color: "bg-purple-100 text-purple-700" },
  { value: "company", label: "Company", color: "bg-blue-100   text-blue-700"   },
  { value: "college", label: "College", color: "bg-green-100  text-green-700"  },
  { value: "student", label: "Student", color: "bg-amber-100  text-amber-700"  },
];

function roleColor(role: UserRole) {
  return ROLES.find((r) => r.value === role)?.color ?? "bg-gray-100 text-gray-600";
}

// ── Random password generator ────────────────────────────────────────────────
function genPassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!";
  let pw = "";
  for (let i = 0; i < 10; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

export default function CapmanPage() {
  // ── Auth state ───────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Users state ──────────────────────────────────────────────────────────
  const [users, setUsers] = useState<User[]>([]);

  // ── Add user form ────────────────────────────────────────────────────────
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPw, setAddPw] = useState("");
  const [addRole, setAddRole] = useState<UserRole>("admin");
  const [showAddPw, setShowAddPw] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // ── Reset password ───────────────────────────────────────────────────────
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetPw, setResetPw] = useState("");
  const [showResetPw, setShowResetPw] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  // ── Copy feedback ────────────────────────────────────────────────────────
  const [copied, setCopied] = useState("");

  const refreshUsers = useCallback(() => {
    setUsers(getUsers());
  }, []);

  useEffect(() => {
    if (isSessionValid()) {
      setAuthed(true);
      refreshUsers();
    }
  }, [refreshUsers]);

  // ── Login ────────────────────────────────────────────────────────────────
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPw) {
      setLoginError("Enter both email and password.");
      return;
    }
    setLoginLoading(true);
    try {
      const [enteredHash, expectedHash] = await Promise.all([
        hashPassword(loginPw),
        hashPassword(SA_PASSWORD),
      ]);
      const emailMatch = loginEmail.trim().toLowerCase() === SA_EMAIL.toLowerCase();
      const pwMatch = enteredHash === expectedHash;
      if (emailMatch && pwMatch) {
        saveSession();
        setAuthed(true);
        refreshUsers();
      } else {
        setLoginError("Invalid credentials.");
      }
    } catch {
      setLoginError("Authentication error. Try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  // ── Add user ─────────────────────────────────────────────────────────────
  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    if (!addName.trim()) { setAddError("Name is required."); return; }
    if (!isValidEmail(addEmail)) { setAddError("Enter a valid email."); return; }
    if (addPw.length < 6) { setAddError("Password must be at least 6 characters."); return; }
    setAddLoading(true);
    try {
      const result = await registerUser(addName.trim(), addEmail.trim(), addPw, addRole, SA_EMAIL);
      if (!result.success) {
        setAddError(result.error ?? "Failed to add user.");
      } else {
        setAddSuccess(`User "${addName.trim()}" added successfully.`);
        setAddName("");
        setAddEmail("");
        setAddPw(genPassword());
        refreshUsers();
      }
    } catch {
      setAddError("Unexpected error. Try again.");
    } finally {
      setAddLoading(false);
    }
  }

  // ── Delete user ──────────────────────────────────────────────────────────
  function handleDelete(id: string) {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    if (!confirm(`Delete user "${target.name}" (${target.email})? This cannot be undone.`)) return;
    const updated = users.filter((u) => u.id !== id);
    writeJson(KEYS.USERS, updated);
    setUsers(updated);
  }

  // ── Toggle approved ──────────────────────────────────────────────────────
  function handleToggleApproved(id: string) {
    const updated = users.map((u) =>
      u.id === id ? { ...u, approved: !u.approved } : u
    );
    writeJson(KEYS.USERS, updated);
    setUsers(updated);
  }

  // ── Reset password ───────────────────────────────────────────────────────
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetError("");
    if (resetPw.length < 6) { setResetError("Password must be at least 6 characters."); return; }
    if (!resetUserId) return;
    setResetLoading(true);
    try {
      const hash = await hashPassword(resetPw);
      const updated = users.map((u) =>
        u.id === resetUserId ? { ...u, passwordHash: hash } : u
      );
      writeJson(KEYS.USERS, updated);
      setUsers(updated);
      setResetUserId(null);
      setResetPw("");
    } catch {
      setResetError("Failed to reset password.");
    } finally {
      setResetLoading(false);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  }

  // ── Logout ───────────────────────────────────────────────────────────────
  function handleLogout() {
    clearSession();
    setAuthed(false);
    setLoginEmail("");
    setLoginPw("");
  }

  // ────────────────────────────────────────────────────────────────────────
  // RENDER: Login screen
  // ────────────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Shield size={26} className="text-white" />
            </div>
          </div>

          <h1 className="text-center text-xl font-bold text-white mb-1">
            Superadmin Access
          </h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Restricted — authorised personnel only
          </p>

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPw ? "text" : "password"}
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={14} className="shrink-0" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/20"
            >
              {loginLoading ? "Verifying…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // RENDER: Admin panel
  // ────────────────────────────────────────────────────────────────────────
  const approvedCount = users.filter((u) => u.approved || u.role === "admin").length;
  const resetTarget = users.find((u) => u.id === resetUserId);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <div className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">Superadmin Panel</span>
            <span className="hidden sm:inline text-xs text-gray-600">· TalentYug</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshUsers}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-xs font-semibold transition"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: users.length, color: "text-white" },
            { label: "Approved",    value: approvedCount, color: "text-green-400" },
            { label: "Pending",     value: users.length - approvedCount, color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{s.label}</p>
              <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Add User ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
            <UserPlus size={16} className="text-indigo-400" />
            <h2 className="font-bold text-sm">Add Dashboard User</h2>
          </div>

          <form onSubmit={handleAddUser} noValidate className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                  <button
                    type="button"
                    onClick={() => setAddPw(genPassword())}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAddPw ? "text" : "password"}
                    value={addPw}
                    onChange={(e) => setAddPw(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-2.5 pr-20 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition font-mono"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {addPw && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(addPw, "addpw")}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition"
                        title="Copy password"
                      >
                        {copied === "addpw" ? <CheckCheck size={13} className="text-green-400" /> : <Copy size={13} />}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowAddPw((v) => !v)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition"
                    >
                      {showAddPw ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Role</label>
                <select
                  value={addRole}
                  onChange={(e) => setAddRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-indigo-500 transition"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {addError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={14} className="shrink-0" /> {addError}
              </div>
            )}
            {addSuccess && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <CheckCheck size={14} className="shrink-0" /> {addSuccess}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={addLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition"
              >
                <UserPlus size={14} />
                {addLoading ? "Adding…" : "Add User"}
              </button>
            </div>
          </form>
        </div>

        {/* ── User Table ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="font-bold text-sm">Dashboard Users ({users.length})</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Approved users can log in at <span className="text-indigo-400 font-mono">/login</span> with their credentials.
            </p>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-sm">
              No users yet. Add the first user above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-800">
                    <th className="px-5 py-3 text-left">User</th>
                    <th className="px-5 py-3 text-left">Role</th>
                    <th className="px-5 py-3 text-left">Access</th>
                    <th className="px-5 py-3 text-left">Added</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-white">{user.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <p className="text-xs text-gray-500 font-mono">{user.email}</p>
                          <button
                            onClick={() => copyToClipboard(user.email, `email-${user.id}`)}
                            className="text-gray-700 hover:text-gray-400 transition"
                            title="Copy email"
                          >
                            {copied === `email-${user.id}`
                              ? <CheckCheck size={11} className="text-green-400" />
                              : <Copy size={11} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold capitalize", roleColor(user.role))}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {user.role === "admin" ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            Always Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleApproved(user.id)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-semibold border transition",
                              user.approved
                                ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20"
                            )}
                            title={user.approved ? "Click to revoke access" : "Click to grant access"}
                          >
                            {user.approved ? "Approved" : "Pending"}
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setResetUserId(user.id);
                              setResetPw(genPassword());
                              setResetError("");
                              setShowResetPw(true);
                            }}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-indigo-400 hover:bg-indigo-500/10 transition"
                            title="Reset Password"
                          >
                            <Key size={14} />
                          </button>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition"
                              title="Delete User"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-700">
          Session expires after 4 hours · All changes are instant
        </p>
      </div>

      {/* ── Reset Password Modal ── */}
      {resetUserId && resetTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setResetUserId(null); } }}
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-bold text-sm text-white">Reset Password</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                For: <span className="text-indigo-400">{resetTarget.name}</span> · {resetTarget.email}
              </p>
            </div>

            <form onSubmit={handleResetPassword} noValidate className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New Password</label>
                  <button
                    type="button"
                    onClick={() => setResetPw(genPassword())}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showResetPw ? "text" : "password"}
                    value={resetPw}
                    onChange={(e) => setResetPw(e.target.value)}
                    placeholder="Min 6 characters"
                    autoFocus
                    className="w-full px-4 py-2.5 pr-20 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition font-mono"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(resetPw, "resetpw")}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition"
                      title="Copy"
                    >
                      {copied === "resetpw" ? <CheckCheck size={13} className="text-green-400" /> : <Copy size={13} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetPw((v) => !v)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition"
                    >
                      {showResetPw ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              {resetError && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={14} /> {resetError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setResetUserId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition"
                >
                  {resetLoading ? "Saving…" : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
