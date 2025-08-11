import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedata = loginSchema.safeParse(credentials);
        if (validatedata.success) {
          const { email, password } = validatedata.data;
          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
