import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(3, "minimum length of 3 required")
  .max(30, "max lenght of 20 was only acceptable");

export const signupValidation = z.object({
  username: usernameValidation,
  email: z.string().email("invalid emial"),
  password: z
    .string()
    .min(5, "min 5 chars req in pass")
    .max(20, "pass cant be more than 20 chars"),
});
