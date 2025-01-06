import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/db/client";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
