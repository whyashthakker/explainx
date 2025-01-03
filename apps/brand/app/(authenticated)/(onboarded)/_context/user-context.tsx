// app/(authenticated)/(onboarded)/_context/user-context.tsx
"use client";
import React, { createContext, useContext } from "react";
import { PrismaUserWithBrands } from "../../../../lib/types";

const UserContext = createContext<PrismaUserWithBrands | null>(null);

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PrismaUserWithBrands;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
// _context/user-context.tsx
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { Brand, UserType } from "@repo/db/types"; // Adjust import path as needed

// interface User {
//   id: string;
//   email: string | null;
//   userType: UserType | null;
//   brand?: Brand | null;
//   isLoading: boolean;
//   error: string | null;
// }

// interface UserContextType {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUserData = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/user/profile");
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }

//       const data = await response.json();
//       setUser({
//         ...data,
//         isLoading: false,
//         error: null,
//       });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const refetch = async () => {
//     await fetchUserData();
//   };

//   const value = {
//     user,
//     isLoading,
//     error,
//     refetch,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// export function useUser() {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }
