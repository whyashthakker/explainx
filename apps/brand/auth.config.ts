// auth.config.ts

import { DefaultSession, NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";

// Define the credentials type
interface CustomCredentials {
  email: string;
  password: string;
}

declare module "next-auth" {
  interface User {
    userType?: "BRAND";
  }
  interface Session {
    user: {
      id: string;
      userType: "BRAND";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userType?: "BRAND";
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
          userType: "BRAND",
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
        session.user.userType = token.userType as "BRAND";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
