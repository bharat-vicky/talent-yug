"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { registerUser } from "@/lib/auth";
import { UserRole } from "@/types";

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: "student", label: "Student", desc: "Looking for jobs & internships" },
  { value: "college", label: "College / TPO", desc: "Managing placement drives" },
  { value: "company", label: "Company", desc: "Hiring campus talent" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pwStrength =
    password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await registerUser(name, email, password, role);
    setLoading(false);
    if (result.success) {
      router.push("/login?registered=1");
    } else {
      setError(result.error ?? "Registration failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-sm animate-fade-up">
      <div className="bg-white rounded-3xl p-8 shadow-auth border border-gray-100">
        <h1 className="text-2xl font-bold text-primary text-center mb-1">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-7">
          Join TalentYug — it&apos;s free to start
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          <Input
            label="Full name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div>
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
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
            {password.length > 0 && (
              <div className="mt-2 flex gap-1.5">
                {[1, 2, 3].map((lvl) => (
                  <div
                    key={lvl}
                    className={cn(
                      "flex-1 h-1.5 rounded-full transition-colors",
                      pwStrength >= lvl
                        ? lvl === 1 ? "bg-danger" : lvl === 2 ? "bg-amber-400" : "bg-success"
                        : "bg-gray-100"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Role picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((r) => (
                <label
                  key={r.value}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                    role === r.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={role === r.value}
                    onChange={() => setRole(r.value)}
                    className="hidden"
                  />
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      role === r.value ? "border-primary" : "border-gray-300"
                    )}
                  >
                    {role === r.value && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {r.label}
                    </p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                  {role === r.value && (
                    <CheckCircle2 size={16} className="ml-auto text-primary shrink-0" />
                  )}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading}>
            Create Account
          </Button>

          <p className="text-xs text-gray-400 text-center">
            By signing up you agree to our{" "}
            <Link href="#" className="underline">Terms</Link> and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
