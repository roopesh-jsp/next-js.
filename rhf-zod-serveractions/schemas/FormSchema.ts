import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .min(5, "min of 5 chars req")
    .max(15, "cant me more than 15 chars")
    .optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(5, "min of 5 chars req")
    .max(15, "cant me more than 15 chars"),
});

export type TForm = z.infer<typeof FormSchema>;
