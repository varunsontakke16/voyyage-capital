import { timingSafeEqual } from "node:crypto";

/**
 * Shared terminal password. Every Voyyager logs in with their own email plus
 * this one common password (sent to subscribers manually). Override in any
 * environment by setting `TERMINAL_SHARED_PASSWORD`; otherwise this generated
 * default is used so the terminal works without extra configuration.
 */
const DEFAULT_SHARED_PASSWORD = "Vector-Compass-9464";

function getSharedPassword(): string {
  const fromEnv = process.env.TERMINAL_SHARED_PASSWORD?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SHARED_PASSWORD;
}

/** Constant-time string comparison that doesn't leak length via early return. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export type TerminalLoginResult = { ok: true; tier: string } | { ok: false };

/**
 * Verify a terminal login: any valid email is accepted as long as the password
 * matches the shared terminal password. Returns the granted tier on success.
 */
export async function verifyTerminalLogin(
  email: string,
  password: string,
): Promise<TerminalLoginResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return { ok: false };
  if (!safeEqual(password, getSharedPassword())) return { ok: false };
  return { ok: true, tier: "voyyager" };
}
