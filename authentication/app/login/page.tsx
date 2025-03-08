"use client";
import { Button } from "@/compontents/Button";
// import { login } from "@/controllers/auth/auth";

import { useActionState, useEffect, useState } from "react";

export default function Login() {
  // const [errors, setErrors] = useState("");
  // const [state, formAction, isPending] = useActionState(login, {});
  // console.log(state, isPending);
  // useEffect(() => {
  //   if (!isPending && !state.success) {
  //     setErrors(state.message);
  //   }
  // }, [state, isPending]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSUbmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const jsonResponse = await res.json();
    setLoading(false);
    if (jsonResponse.success) {
      window.location.href = "/";
    } else {
      setErrors(jsonResponse.message);
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSUbmit}
        className="flex flex-col gap-4 rounded-xl w-fit mx-auto my-32 p-6 bg-white"
      >
        <h1 className="text-black text-xl font-bold text-center my-2 uppercase">
          login
        </h1>
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
        <div>
          {errors && <p className="text-red-400 text-center">{errors}</p>}
        </div>
        <Button pending={loading}>login</Button>
        {/* <Button>login</Button> */}
      </form>
    </div>
  );
}
