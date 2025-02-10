import { z } from "zod";

export const verifySchema = z.object({
  code: z.string().min(6, "min 6 chars req"),
});
