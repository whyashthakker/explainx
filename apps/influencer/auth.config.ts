// auth.config.ts
import { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";
import prisma from "@repo/db/client";
import { UserType, Prisma } from "@prisma/client";
declare module "next-auth" {
  interface User {
    userType?: UserType;
  }
  interface Session {
    user: {
      id: string;
      userType?: UserType;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userType?: UserType;
  }
}
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("[Google Profile]:", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: UserType.INFLUENCER,
        };
      },
    }),
    Resend({
      from: "yash@mail.infloq.com",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[SignIn] User:", user);
      console.log("[SignIn] Account:", account);
      console.log("[SignIn] Profile:", profile);

      if (!user.email || !account) {
        console.log("[SignIn] Missing email or account");
        return false;
      }

      try {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: {
            accounts: true,
            influencers: true,
            brands: true,
          },
        });
        console.log("[SignIn] Found DB User:", dbUser);

        if (dbUser) {
          const hasAccount = dbUser.accounts.some(
            (acc) =>
              acc.provider === account.provider &&
              acc.providerAccountId === account.providerAccountId,
          );
          console.log("[SignIn] Has Account:", hasAccount);

          if (!hasAccount) {
            const newAccount = await prisma.account.create({
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
            console.log("[SignIn] Created New Account:", newAccount);
          }

          const hasBrand = dbUser.brands && dbUser.brands.length > 0;
          const hasInfluencer =
            dbUser.influencers && dbUser.influencers.length > 0;
          console.log(
            "[SignIn] Profile Status - Brand:",
            hasBrand,
            "Influencer:",
            hasInfluencer,
          );

          let newUserType: UserType;
          if (hasBrand && hasInfluencer) {
            newUserType = UserType.BOTH;
          } else if (hasBrand && !hasInfluencer) {
            // If they're a brand signing up for influencer portal
            newUserType = UserType.BOTH;
          } else if (hasInfluencer) {
            newUserType = UserType.INFLUENCER;
          } else {
            newUserType = UserType.INFLUENCER;
          }
          console.log("[SignIn] New User Type:", newUserType);

          const updatedUser = await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              userType: newUserType,
            },
          });
          console.log("[SignIn] Updated User:", updatedUser);

          return true;
        }

        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || null,
            image: user.image || null,
            userType: UserType.INFLUENCER,
          },
        });
        console.log("[SignIn] Created New User:", newUser);

        const newAccount = await prisma.account.create({
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
        console.log("[SignIn] Created Account for New User:", newAccount);

        return true;
      } catch (error) {
        console.error("[SignIn] Error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      console.log("[JWT] Input Token:", token);
      console.log("[JWT] Input User:", user);

      if (user) {
        token.id = user.id;
        token.userType = user.userType;
      }
      console.log("[JWT] Output Token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("[Session] Input Session:", session);
      console.log("[Session] Input Token:", token);

      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType;
      }
      console.log("[Session] Output Session:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
