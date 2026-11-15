// Run against a local server. Creates marked replies and removes them afterward.
import { existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { neon } from "@neondatabase/serverless";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}
const base = new URL(process.env.SMOKE_TEST_URL || "http://localhost:1912");
assert(["localhost", "127.0.0.1", "[::1]"].includes(base.hostname), "Use a local server for this test.");
assert(process.env.DATABASE_URL && process.env.GUESTS_KEY, "Configure DATABASE_URL and GUESTS_KEY first.");
const sql = neon(process.env.DATABASE_URL);
const marker = `LOCAL_SMOKE_TEST_${randomUUID()}`;
const request = (path, options = {}) => fetch(new URL(path, base), { ...options, signal: AbortSignal.timeout(60000) });
const post = (body) => request("/api/rsvp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

try {
  for (const path of ["/", "/?to=Test%20Guest", "/invite", "/programme", "/couple.jpg", "/save-the-date.jpg"]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
    console.log(`OK ${path}`);
  }
  for (const path of ["/guests", "/guests?key=incorrect"]) {
    const response = await request(path);
    assert.equal(response.status, 200);
    assert((await response.text()).includes("This page is private"));
  }
  for (const body of [null, [], "invalid", {}, { name: marker }, { name: "", attending: true }]) {
    assert.equal((await post(body)).status, 400, "Invalid RSVP must return 400");
  }
  for (const attending of [true, false]) {
    const response = await post({ name: marker, attending, guests: 2, message: marker, invitedAs: "Test invitation" });
    assert.equal(response.status, 200);
    const reply = await response.json();
    assert.equal(reply.ok, true);
    const rows = await sql`select attending, guests, invited_as from rsvps where id=${reply.id} and name=${marker}`;
    assert.equal(rows.length, 1);
    assert.equal(rows[0].attending, attending);
    assert.equal(rows[0].guests, attending ? 2 : 0);
    assert.equal(rows[0].invited_as, "Test invitation");
  }
  const response = await request(`/guests?key=${encodeURIComponent(process.env.GUESTS_KEY)}`);
  assert.equal(response.status, 200);
  assert((await response.text()).includes(marker), "Saved reply must appear on the guest list");
  console.log("OK RSVP accept/decline, validation, persistence, and private guest list");
} finally {
  const removed = await sql`delete from rsvps where name=${marker} and message=${marker} returning id`;
  console.log(`Removed ${removed.length} temporary test replies.`);
}
