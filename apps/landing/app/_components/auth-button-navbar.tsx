"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Link
      href={isLoggedIn ? "/dashboard" : "/signup"}
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      {isLoggedIn ? "Go to Dashboard" : "Get Started for Free"}{" "}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}