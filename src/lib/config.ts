// Fallbacks used when the environment variables are not set (e.g. before they are added on Vercel).
// Environment variables always win. Once they are set on Vercel, these can be removed.
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_pNIW2l3acVJY@ep-shiny-sky-bdcmtohj-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const GUESTS_KEY = process.env.GUESTS_KEY || "2-FeMrqhn2wQ";
