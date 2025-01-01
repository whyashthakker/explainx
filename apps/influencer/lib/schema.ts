import { z } from "zod";
import { Platform } from "./types";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(7, "Password is required of lenght 7 and 8"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required for Login"),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  category: z.string().min(1),
  platforms: z.array(z.nativeEnum(Platform)),
});
