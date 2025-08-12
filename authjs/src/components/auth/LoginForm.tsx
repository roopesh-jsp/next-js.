"use client";
import React, { useState, useTransition } from "react";
import Cardwrapper from "./Card-wrapper";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../Form-error";
import FormSuccess from "../Form-success";
import { loginAction } from "@/actions/login";

function LoginForm() {
  const [isPending, startTranssition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTranssition(async () => {
      const res = await loginAction(data);
      setError(res?.error);
      // setSuccess(res?.success);
    });
  };
  return (
    <Cardwrapper
      headerLabel="welcome back"
      backButtonLabel="didn't have a account ?"
      backButtonUrl="/auth/signup"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.deo@email.com"
                      className="p-5"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      className="p-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full py-5" disabled={isPending}>
            login
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
}

export default LoginForm;
