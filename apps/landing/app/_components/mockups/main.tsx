"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export default function MainMockup() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/app-light.png";
      break;
    case "dark":
      src = "/app-dark.png";
      break;
    default:
      src = "/app-dark.png";
      break;
  }

  return (
    <Image src={src} alt="Launch UI app screenshot" width={1248} height={765} />
  );
}
