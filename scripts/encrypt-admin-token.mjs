// Encrypts the admin Upstash REST token with the /tickets password, so the token
// is never shipped in plain text. Usage:
//   node scripts/encrypt-admin-token.mjs '<admin-redis-token>' '<password>'
// Put the printed value in the GitHub secret VITE_TICKETS_ADMIN_TOKEN_ENC.
import { webcrypto as crypto } from "node:crypto";

const [token, password] = process.argv.slice(2);
if (!token || !password) {
  console.error("Usage: node scripts/encrypt-admin-token.mjs '<admin-redis-token>' '<password>'");
  process.exit(1);
}

const enc = new TextEncoder();
const b64 = (bytes) => Buffer.from(bytes).toString("base64");
const iterations = 600000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
  baseKey,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"]
);
const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(token));
const blob = { s: b64(salt), i: iterations, iv: b64(iv), c: b64(new Uint8Array(cipher)) };
console.log(Buffer.from(JSON.stringify(blob)).toString("base64"));
