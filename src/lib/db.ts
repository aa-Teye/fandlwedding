import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "./config";

// Neon's HTTP driver: one fast request per query, which suits Vercel's serverless functions.
export function db() {
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  return neon(DATABASE_URL);
}

export type RsvpRow = {
  id: number;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  invited_as: string;
  created_at: string;
};
