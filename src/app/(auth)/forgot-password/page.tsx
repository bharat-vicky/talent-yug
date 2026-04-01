import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password – TalentYug",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
