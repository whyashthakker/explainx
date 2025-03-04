import { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    isBetaTester?: boolean;
  }
}

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
    isBetaTester?: boolean;
  }

  // Extend the session to include our custom properties
  interface Session {
    user: {
      id: string;
      isAdmin?: boolean;
      isBetaTester?: boolean;
    } & DefaultSession["user"];
  }
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      from: "yash@mail.explainx.com",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.isBetaTester = user.isBetaTester;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
