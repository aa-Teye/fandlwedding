// Server-side settings only. Configure these in .env.local and in Vercel.
export const DATABASE_URL = process.env.DATABASE_URL?.trim() || "";
export const GUESTS_KEY = process.env.GUESTS_KEY?.trim() || "";
