// Creates the database tables. Run with: npm run db:migrate
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^([A-Z_]+)="?(.*?)"?$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (put it in .env.local)");
const sql = neon(process.env.DATABASE_URL);
for (const stmt of readFileSync("db/schema.sql", "utf8").split(";").map((s) => s.trim()).filter(Boolean)) {
  await sql.query(stmt);
}
const [{ count }] = await sql`select count(*)::int as count from rsvps`;
console.log(`Database ready. rsvps table has ${count} row(s).`);
