import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import { JWT } from "next-auth/jwt";
import { verifyPassword } from "./lib/password";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("Please sign in with Google");
        }

        const passwordMatch = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          userType: "INFLUENCER",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
      }

      if (trigger === "update" && session) {
        // Handle session updates
        token.name = session.user.name;
        token.image = session.user.image;
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
});
