import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const ITERATIONS = 120_000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString(
    "hex"
  );

  return `pbkdf2$${ITERATIONS}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [method, iterationsText, salt, originalHash] = storedHash.split("$");

  if (method !== "pbkdf2" || !iterationsText || !salt || !originalHash) {
    return false;
  }

  const iterations = Number(iterationsText);
  const candidateHash = pbkdf2Sync(
    password,
    salt,
    iterations,
    KEY_LENGTH,
    DIGEST
  ).toString("hex");

  const originalBuffer = Buffer.from(originalHash, "hex");
  const candidateBuffer = Buffer.from(candidateHash, "hex");

  if (originalBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(originalBuffer, candidateBuffer);
}
