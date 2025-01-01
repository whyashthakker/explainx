// auth.config.ts

import { DefaultSession, NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { verifyPassword } from "./lib/password";
import { loginSchema } from "./lib/schema";
import prisma from "@repo/db/client";

// Define the credentials type
interface CustomCredentials {
  email: string;
  password: string;
}

declare module "next-auth" {
  interface User {
    userType?: "INFLUENCER";
  }
  interface Session {
    user: {
      id: string;
      userType: "INFLUENCER";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userType?: "INFLUENCER";
  }
}

export default {
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: "INFLUENCER",
        };
      },
    }),
    Resend,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType; // Set userType in the token
        console.log("JWT Callback - Token after: ", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType as "INFLUENCER";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
