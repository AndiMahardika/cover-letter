"use client";

import { loginUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function Page() {
const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginUser(formData);

      if (result?.success) {
        toast.success("Login successful!");
        router.push("/dashboard/cover-letter");
      } else {
        const msg = result?.error || "An error occurred during login";
        setError(msg);
        toast.error(msg);
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-navy-900">Login</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-navy-900">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-navy-900">
              Password
            </Label>
            <button
              type="button"
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-navy-900 hover:bg-navy-800 text-white m-0 rounded-lg font-semibold transition-colors"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin w-5 h-5 mr-2" />
              Loading...
            </>
          ): "Sign Up"}
        </Button>

        <div className="relative">
          <Separator className="my-6" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-gray-500 text-sm">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
            <Link href="/register">
              Sign Up
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
}
