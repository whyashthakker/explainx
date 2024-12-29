// app/(onboarded)/_context/user-context.tsx
"use client";
import React, { createContext, useContext } from "react";
import { PrismaUserWithBrand } from "../../../../lib/types";

const UserContext = createContext<PrismaUserWithBrand | null>(null);

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PrismaUserWithBrand;
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
