// lib/utils.ts
import { randomBytes } from "crypto";

export function generateInviteToken(): string {
  return randomBytes(32).toString("hex");
}
