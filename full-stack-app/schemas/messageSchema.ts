import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(10,"min 10 chars are req").max(300,"msg can't me more than 300 chars");

});
