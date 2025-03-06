"use client";
import { Button } from "@/compontents/Button";
import { handleSubmit } from "@/controllers/auth/auth";
import { userResT, UserT } from "@/types/user.types";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

export default function Signup() {
  const [errors, setErrors] = useState();
  const [state, formAction, isPending] = useActionState(handleSubmit, {});
  console.log(state);

  return (
    <div className="">
      <form
        action={formAction}
        className="flex flex-col gap-4 rounded-xl w-fit mx-auto my-32 p-6 bg-white"
      >
        <h1 className="text-black text-xl font-bold text-center my-2 uppercase">
          signup
        </h1>
        <div className="text-black flex gap-4 capitalize items-center justify-between">
          <label htmlFor="name">name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            className="border px-2 py-1 rounded-md"
          />
        </div>
        <div className="text-black flex gap-4 capitalize items-center justify-between">
          <label htmlFor="email">email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            id="email"
            className="border px-2 py-1 rounded-md"
          />
        </div>
        <div className="text-black flex gap-4 capitalize items-center justify-between">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="border px-2 py-1 rounded-md"
          />
        </div>
        <Button>submit</Button>
      </form>
    </div>
  );
}
