"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const signupSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const redirect = searchParams.get("redirect");
  const safeRedirect =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setAuthError(null);

    const { error } = await signUp(data.email, data.password);

    if (error) {
      setAuthError(error.message);
    } else {
      setSuccess(true);
      // Note: User may need to confirm email depending on your Supabase settings
      setTimeout(() => {
        const loginUrl = `/login${
          redirect ? `?redirect=${encodeURIComponent(safeRedirect)}` : ""
        }`;
        router.push(loginUrl);
      }, 3000);
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-green-700">
            Please check your email to confirm your account before signing in.
          </p>
          <p className="text-sm text-green-600 mt-2">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  const loginHref = `/login${
    redirect ? `?redirect=${encodeURIComponent(safeRedirect)}` : ""
  }`;

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-gray-600 mt-2">Create your todo app account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {authError && (
          <p className="text-red-500 text-sm text-center">{authError}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href={loginHref} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}