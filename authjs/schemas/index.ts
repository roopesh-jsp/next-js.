import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(6, {
    message: "password is required",
  }),
  name: z
    .string()
    .min(1, {
      message: "name is requried",
    })
    .max(20, "name cant be more than 20chars"),
});
