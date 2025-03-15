import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, "minimum 10 chars are req in a message")
    .max(300, "more than 300 hars are not allowed in this message"),
});
