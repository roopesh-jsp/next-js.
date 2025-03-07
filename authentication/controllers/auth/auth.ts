"use server";

import { userResT, UserT } from "@/types/user.types";
import { redirect } from "next/navigation";

export async function signup(prevState: {}, formData: FormData) {
  const data: UserT = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
  };

  const res = await fetch("http://localhost:3000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonResponse: userResT = await res.json();

  if (jsonResponse.success) {
    redirect("/");
  } else {
    return jsonResponse;
  }
}

export async function login(prevState: {}, formData: FormData) {
  const data: UserT = {
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
  };

  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonResponse: userResT = await res.json();

  if (jsonResponse.success) {
    redirect("/");
  } else {
    return jsonResponse;
  }
}
