import { neon } from "@neondatabase/serverless";

// Neon's HTTP driver: one fast request per query, which suits Vercel's serverless functions.
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
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
