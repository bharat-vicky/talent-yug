"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await resetPassword(email, newPassword, confirmPassword);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(result.error ?? "Reset failed. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl p-8 shadow-auth border border-gray-100 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Password reset!</h2>
          <p className="text-sm text-gray-500">Redirecting you to login…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm animate-fade-up">
      <div className="bg-white rounded-3xl p-8 shadow-auth border border-gray-100">
        <h1 className="text-2xl font-bold text-primary text-center mb-1">
          Reset password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-7">
          Enter your email and choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="New password"
            type={showPw ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <Input
            label="Confirm new password"
            type={showPw ? "text" : "password"}
            placeholder="Repeat your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Reset Password
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
