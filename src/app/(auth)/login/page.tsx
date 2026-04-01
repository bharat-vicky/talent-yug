import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In – TalentYug",
  description: "Sign in to your TalentYug account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
