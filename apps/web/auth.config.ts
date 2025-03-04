import { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";

// Correctly extend the next-auth module
declare module "next-auth" {
  interface User {
    isAdmin: boolean;
    isBetaTester: boolean;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

// Extend JWT if needed
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
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
    // Handle both JWT and database sessions
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub!;
      } else if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
