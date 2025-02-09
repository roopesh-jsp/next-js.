"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formValidation = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, "minimum 5 chars are required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords arenot matching",
    path: ["confirmPassword"],
  });

export type formtype = z.infer<typeof formValidation>;

function page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formtype>({
    resolver: zodResolver(formValidation),
  });

  async function onSubmit(data: formtype) {
    // await new Promise((resolve) =>
    //   setTimeout(() => {
    //     resolve;
    //   }, 1000)
    // );
    console.log(data);
    reset();
  }
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="email" />
      {errors.email && <div className="errors">{errors.email.message}</div>}
      <input type="password" {...register("password")} placeholder="password" />
      {errors.password && (
        <div className="errors">{errors.password.message}</div>
      )}
      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="confirm password"
      />
      {errors.confirmPassword && (
        <div className="errors">{errors.confirmPassword.message}</div>
      )}
      <button disabled={isSubmitting}>
        {isSubmitting ? "submitting" : "submit"}
      </button>
    </form>
  );
}

export default page;

// const res = await fetch("/api/froms", {
//   method: "POST",
// body: JSON.stringify(data),

//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// if (resData.errors) {
//   if (resData.errors.email) {
//     setError("email", {
//       type: "server",
//       message: resData.errors.email,
//     });
//   }
// }
