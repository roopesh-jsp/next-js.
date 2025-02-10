import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be more than 2 chars")
  .max(10, "username can't have more than 10 chars");

export const signupValidation = z.object({
  username: usernameValidation,
  email: z.string().email(),
  password: z.string().min(5, "min 5 chars are req"),
});
