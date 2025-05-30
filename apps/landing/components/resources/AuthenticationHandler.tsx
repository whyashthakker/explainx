'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

interface AuthenticationHandlerProps {
  email: string;
}

export const AuthenticationHandler = ({ email }: AuthenticationHandlerProps) => {
  const router = useRouter();

  useEffect(() => {
    // Set the authentication cookie
    setCookie('resources_authenticated', 'true', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    // Refresh the page to show resources
    router.refresh();
  }, [router]);

  return null;
}; 