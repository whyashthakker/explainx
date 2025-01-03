// auth.config.ts
import { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";
import prisma from "@repo/db/client";
import { UserType, ActivePortal, Prisma } from "@prisma/client";

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
          userType: UserType.BRAND,
          activePortal: ActivePortal.BRAND,
        };
      },
    }),
    Resend({
      from: "yash@mail.infloq.com",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email || !account) return false;

      try {
        // Find or create user based on email
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: {
            accounts: true,
            influencers: true,
            brands: true,
          },
        });

        if (dbUser) {
          // If user exists but doesn't have this OAuth account linked
          const hasAccount = dbUser.accounts.some(
            (acc) =>
              acc.provider === account.provider &&
              acc.providerAccountId === account.providerAccountId,
          );

          if (!hasAccount) {
            await prisma.account.create({
              data: {
                userId: dbUser.id,
                type: account.type || "oauth",
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token?.toString() || null,
                access_token: account.access_token?.toString() || null,
                expires_at: account.expires_at || null,
                token_type: account.token_type || null,
                scope: account.scope || null,
                id_token: account.id_token?.toString() || null,
                session_state: account.session_state?.toString() || null,
              } satisfies Prisma.AccountUncheckedCreateInput,
            });
          }

          // Check for existing profiles
          const hasBrand = dbUser.brands && dbUser.brands.length > 0;
          const hasInfluencer =
            dbUser.influencers && dbUser.influencers.length > 0;

          // Always update user type based on current profile status
          let newUserType: UserType;
          if (hasBrand && hasInfluencer) {
            newUserType = UserType.BOTH;
          } else if (hasBrand) {
            newUserType = UserType.BRAND;
          } else if (hasInfluencer) {
            newUserType = UserType.INFLUENCER;
          } else {
            newUserType = UserType.BRAND; // Default for brand portal
          }

          // Always update the user to ensure type is current
          await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              userType: newUserType,
              activePortal: ActivePortal.BRAND,
            },
          });

          return true;
        }

        // Create new user
        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || null,
            image: user.image || null,
            userType: UserType.BRAND,
            activePortal: ActivePortal.BRAND,
          },
        });

        // Create new account
        await prisma.account.create({
          data: {
            userId: newUser.id,
            type: account.type || "oauth",
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token?.toString() || null,
            access_token: account.access_token?.toString() || null,
            expires_at: account.expires_at || null,
            token_type: account.token_type || null,
            scope: account.scope || null,
            id_token: account.id_token?.toString() || null,
            session_state: account.session_state?.toString() || null,
          } satisfies Prisma.AccountUncheckedCreateInput,
        });

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
} satisfies NextAuthConfig;
