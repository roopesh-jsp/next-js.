"use server";

import { loginSchema } from "../../schemas";
import { signIn, signOut } from "@/auth";
import { defalut_redirect } from "@/routes";
import { AuthError } from "next-auth";
import z from "zod";

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "invalid fields",
    };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defalut_redirect,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials !" };
        default:
          return { error: "somethinig went wrong" };
      }
    }
    throw error;
  }
};
