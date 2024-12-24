// components/instagram-auth.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface InstagramTokenResponse {
  success: boolean;
  access_token?: string;
  error?: string;
}

const InstagramAuth = (): JSX.Element | null => {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      const getInstagramToken = async () => {
        try {
          const response = await fetch("/api/instagram/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          const data: InstagramTokenResponse = await response.json();

          if (data.success && data.access_token) {
            console.log(data);
            // Store token if needed
            router.push("/authenticated/dashboard");
          } else {
            console.error("Auth failed:", data.error);
          }
        } catch (error) {
          console.error("Error exchanging code:", error);
        }
      };

      getInstagramToken();
    }
  }, [params, router]);

  return null;
};

export default InstagramAuth;
