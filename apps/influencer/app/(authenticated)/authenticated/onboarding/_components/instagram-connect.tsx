"use client";

import { Button } from "@repo/ui/components/ui/button";

export default function InstagramLogin() {
  const handleLogin = () => {
    window.location.href = "/api/auth/instagram";
  };

  return (
    <Button
      onClick={handleLogin}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      Connect Instagram Business Account
    </Button>
  );
}
