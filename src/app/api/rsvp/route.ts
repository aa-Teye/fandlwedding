import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Saves one RSVP reply from the form on the site.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const name = clean(body.name, 80);
  const message = clean(body.message, 600);
  const invitedAs = clean(body.invitedAs, 80);
  if (!name) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (typeof body.attending !== "boolean")
    return NextResponse.json({ error: "Please let us know if you can come." }, { status: 400 });
  const attending = body.attending;
  const guests = attending ? Math.min(10, Math.max(1, Math.round(Number(body.guests) || 1))) : 0;

  try {
    const sql = db();
    const rows = await sql`
      insert into rsvps (name, attending, guests, message, invited_as)
      values (${name}, ${attending}, ${guests}, ${message}, ${invitedAs})
      returning id`;
    return NextResponse.json({ ok: true, id: rows[0].id });
  } catch (e) {
    console.error("RSVP save failed", e);
    return NextResponse.json({ error: "We couldn't save your reply. Please try again." }, { status: 500 });
  }
}
