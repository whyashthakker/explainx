"use client";
import { DropdownMenuItem } from "@repo/ui/components/ui/dropdown-menu";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
export const LogoutMenuItem = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <DropdownMenuItem
      className="text-red-600 cursor-pointer"
      disabled={isLoggingOut}
      onSelect={async (event) => {
        event.preventDefault();
        setIsLoggingOut(true);
        try {
          await signOut({ callbackUrl: "/" });
        } catch (error) {
          console.error("Logout failed:", error);
          setIsLoggingOut(false);
        }
      }}
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </>
      )}
    </DropdownMenuItem>
  );
};
