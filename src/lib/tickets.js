import { Redis } from "@upstash/redis";

// Support tickets live in Upstash Redis as `support:<timestamp>` keys holding JSON:
// { name, email, message, submitted_at, status }.
export const REDIS_URL = "https://musical-zebra-80134.upstash.io";
export const TICKET_PREFIX = "support:";
export const STATUSES = ["On hold", "In progress", "Completed"];
export const DEFAULT_STATUS = "On hold";

// SHA-256 of the /tickets password. A hash keeps the password itself out of the
// shipped JS, but this check runs in the browser, so on its own it is only a screen.
const PASSWORD_SHA256 = "75ca1baec3f3382989affc4cadb0cc93f47e946b247e3a655c6b36d43e64dd2a";

// Optional: the admin Redis token encrypted with the password (see
// scripts/encrypt-admin-token.mjs). When set, the password is what unlocks the
// token, so a wrong password cannot read or change tickets at all.
const ENCRYPTED_ADMIN_TOKEN = import.meta.env.VITE_TICKETS_ADMIN_TOKEN_ENC || "";

const enc = new TextEncoder();
const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function decryptAdminToken(password) {
  const { s, i, iv, c } = JSON.parse(atob(ENCRYPTED_ADMIN_TOKEN));
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b64ToBytes(s), iterations: i, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64ToBytes(iv) }, key, b64ToBytes(c));
  return new TextDecoder().decode(plain);
}

/** Returns the Redis token to use for admin calls, or null if the password is wrong. */
export async function unlock(password) {
  if (ENCRYPTED_ADMIN_TOKEN) {
    try {
      return await decryptAdminToken(password);
    } catch {
      return null;
    }
  }
  if ((await sha256Hex(password)) !== PASSWORD_SHA256) return null;
  return import.meta.env.VITE_REDIS_TOKEN || null;
}

export const usesEncryptedToken = () => Boolean(ENCRYPTED_ADMIN_TOKEN);

export function adminClient(token) {
  return new Redis({ url: REDIS_URL, token });
}

function parseTicket(key, raw) {
  let data = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { message: raw };
    }
  }
  data = data && typeof data === "object" ? data : {};
  const ts = Number(key.slice(TICKET_PREFIX.length));
  return {
    key,
    name: data.name || "",
    email: data.email || "",
    message: data.message || "",
    submitted_at: data.submitted_at || (Number.isFinite(ts) ? new Date(ts).toISOString() : ""),
    status: STATUSES.includes(data.status) ? data.status : DEFAULT_STATUS,
    _raw: data,
  };
}

export async function listTickets(redis) {
  const keys = [];
  let cursor = "0";
  do {
    const [next, batch] = await redis.scan(cursor, { match: `${TICKET_PREFIX}*`, count: 200 });
    keys.push(...batch);
    cursor = String(next);
  } while (cursor !== "0");
  if (keys.length === 0) return [];
  const values = await redis.mget(...keys);
  return keys
    .map((k, idx) => (values[idx] == null ? null : parseTicket(k, values[idx])))
    .filter(Boolean)
    .sort((a, b) => (b.submitted_at || "").localeCompare(a.submitted_at || ""));
}

export async function setTicketStatus(redis, ticket, status) {
  const next = { ...ticket._raw, status };
  await redis.set(ticket.key, JSON.stringify(next));
  return { ...ticket, status, _raw: next };
}

export async function deleteTicket(redis, ticket) {
  await redis.del(ticket.key);
}
