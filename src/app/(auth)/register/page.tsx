import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account – TalentYug",
  description: "Sign up for TalentYug.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
