"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

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

import { loginAction } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
  backend?: string;
}

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,

    handleSubmit,
    setError,
    formState: { errors },
    resetField,
  } = useForm<LoginFormData>();
  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const res = await loginAction(data);

      if (res?.success) {
        resetField("email");
        resetField("password");
        router.push("/");
      } else {
        setError("backend", {
          message: res?.error || "an error occured",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-md m-4 mt-20 sm:mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-sm font-light text-gray-500">
            login here to add your blog posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            {...register("email", {
              required: "email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {errors.backend && (
            <p className="text-red-500 text-sm mb-2">
              {errors.backend.message}
            </p>
          )}
          <Button type="submit" variant={"default"}>
            {loading ? "Loging in ..." : "Login"}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:underline font-semibold"
            >
              signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Page;
