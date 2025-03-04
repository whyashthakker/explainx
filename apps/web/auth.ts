import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";
import { GetServerSidePropsContext } from "next";

// declare module "@auth/core/adapters" {
//   interface AdapterUser {
//     isAdmin: boolean;
//     isBetaTester: boolean;
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   adapter: PrismaAdapter(prisma),
//   ...authConfig,
// });
export const {
  handlers,
  auth,
  signIn,
  signOut,
}: {
  handlers: any;
  auth: (context?: GetServerSidePropsContext) => Promise<any>;
  signIn: (
    provider: string,
    options?: { redirectTo?: string; email?: string; state?: any },
  ) => Promise<any>;
  signOut: () => Promise<any>;
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
