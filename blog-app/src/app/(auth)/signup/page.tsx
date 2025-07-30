"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signupAction } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  backend?: string; // for general error handling
}

function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const res = await signupAction(data);

      if (res?.success) {
        resetField("name");
        resetField("email");
        resetField("password");
        router.push("/");
      } else {
        setError("backend", {
          message: res?.error || "An error occurred",
        });
      }
    } catch (err) {
      setError("backend", {
        message: "Unexpected error occurred.",
      });
    } finally {
      setLoading(false); // ✅ Always runs
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-md m-4 mt-20 sm:mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          <CardDescription className="text-sm font-light text-gray-500">
            Register here to add your blog posts
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col justify-center">
          {errors.backend && (
            <p className="text-red-500 text-sm mb-2">
              {errors.backend.message}
            </p>
          )}
          <Button type="submit" variant={"default"} disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}

export default SignUp;
