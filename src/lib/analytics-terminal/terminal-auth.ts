import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { terminalCredentials } from "@/lib/db/schema";

const scryptAsync = promisify(scrypt);

/** Verify a stored `salt:hash` (hex) scrypt digest against a plaintext password. */
async function verifyScrypt(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const derived = (await scryptAsync(password, salt, expected.length)) as Buffer;
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

export type TerminalLoginResult = { ok: true; tier: string } | { ok: false };

/**
 * Look up a terminal credential by email and verify the password.
 * Returns the granted tier on success.
 */
export async function verifyTerminalLogin(
  email: string,
  password: string,
): Promise<TerminalLoginResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const db = getDb();
  const rows = await db
    .select()
    .from(terminalCredentials)
    .where(eq(terminalCredentials.email, normalizedEmail))
    .limit(1);
  const cred = rows[0];
  if (!cred) return { ok: false };
  const valid = await verifyScrypt(password, cred.passwordHash);
  if (!valid) return { ok: false };
  return { ok: true, tier: cred.tier };
}
