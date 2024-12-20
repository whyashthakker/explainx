// import NextAuth, { DefaultSession } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Google from "next-auth/providers/google";
// import prisma from "@repo/db/client";
// import { JWT } from "next-auth/jwt";

// // Define custom types
// declare module "next-auth" {
//   interface User {
//     userType?: "INFLUENCER";
//   }

//   interface Session {
//     user: {
//       userType: "INFLUENCER";
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     userType?: "INFLUENCER";
//   }
// }
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Google({
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           userType: "INFLUENCER" as const,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.userType = user.userType;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token.userType) {
//         session.user.userType = token.userType as "INFLUENCER";

//         // Check if user has completed onboarding
//         // const dbUser = await prisma.user.findUnique({
//         //   where: { id: token.id as string },
//         //   include: { influencer: true },
//         // });

//         // session.user.isOnboarded = dbUser?.influencer?.category ? true : false;
//       } else {
//         // Fallback if userType is not set in the token, you can handle it here
//         session.user.userType = "INFLUENCER"; // Default value (if necessary)
//       }
//       return session;
//     },
//   },
// });
//

import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "@repo/db/client";
import { JWT } from "next-auth/jwt";

// Define custom types
declare module "next-auth" {
  interface User {
    userType?: "INFLUENCER";
  }

  interface Session {
    user: {
      userType: "INFLUENCER";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType?: "INFLUENCER";
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      profile(profile) {
        console.log("Google Profile: ", profile); // Log to ensure profile is correct
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: "INFLUENCER", // Assigning userType here
        };
      },
    }),
  ],
  callbacks: {
    // JWT Callback: Add logging here to trace JWT callback behavior
    jwt({ token, user }) {
      console.log("JWT Callback - Token before: ", token);
      if (user) {
        token.userType = user.userType; // Set userType in the token
        console.log("JWT Callback - Token after: ", token);
      }
      return token;
    },

    // Session Callback: Add logging to trace session behavior
    async session({ session, token }) {
      console.log("Session Callback - Session before: ", session);
      console.log("Session Callback - Token: ", token);

      // Ensure userType is assigned to session if it exists in the token
      // if (session.user && token.userType) {
      //   session.user.userType = token.userType as "INFLUENCER";
      // } else {
      //   // You can set a fallback here to prevent undefined issues
      //   session.user.userType = "INFLUENCER"; // Default value (if needed)
      // }

      console.log("Session Callback - Session after: ", session);
      return session;
    },
  },
});
