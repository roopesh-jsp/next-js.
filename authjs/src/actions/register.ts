"use server";
import z from "zod";
import { registerSchema } from "../../schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const registerAction = async (data: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "invalid fields",
    };
  }
  const { email, name, password } = validatedFields.data;
  const hashedpw = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return {
      error: "user already exists",
    };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedpw,
    },
  });
  return {
    success: "user created",
  };
};
