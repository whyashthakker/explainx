// auth.config.ts
import { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";
import prisma from "@repo/db/client";
import { UserType, ActivePortal } from "@prisma/client";

declare module "next-auth" {
  interface User {
    userType?: UserType;
    activePortal?: ActivePortal;
  }

  interface Session {
    user: {
      id: string;
      userType?: UserType;
      activePortal?: ActivePortal;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userType?: UserType;
    activePortal?: ActivePortal;
  }
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: UserType.INFLUENCER,
          activePortal: ActivePortal.INFLUENCER,
        };
      },
    }),
    Resend({
      from: "yash@mail.infloq.com",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: {
            influencers: true,
            brands: true,
          },
        });

        if (existingUser) {
          let userType = existingUser.userType;
          const hasBrand = existingUser.brands.length > 0;
          const hasInfluencer = existingUser.influencers.length > 0;

          // Determine user type based on profiles
          if (!userType) {
            if (hasBrand && hasInfluencer) {
              userType = UserType.BOTH;
            } else if (hasBrand) {
              userType = UserType.BRAND;
            } else {
              userType = UserType.INFLUENCER;
            }

            // Update user type
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                userType,
                activePortal: ActivePortal.INFLUENCER,
              },
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.activePortal = user.activePortal;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType;
        session.user.activePortal = token.activePortal;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
