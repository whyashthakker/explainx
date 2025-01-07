// app/(authenticated)/(onboarded)/_context/user-context.tsx
"use client";
import { createContext, useContext } from "react";
import { UserWithProfiles } from "../../../../lib/types";

const UserContext = createContext<UserWithProfiles | null>(null);

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserWithProfiles;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
