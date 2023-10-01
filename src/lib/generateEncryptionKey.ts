import { env } from "@/env.mjs";

export const generateEncryptionKey = async () => {
  const encoder = new TextEncoder();
  const apiKeyData = encoder.encode(env.KEY_SECRET);
  const secretKeyEncryptor = encoder.encode(env.SERVER_SECRET);
  try {
    const salt = encoder.encode(env.SALT);
    const rawAPIKey = await crypto.subtle.importKey(
      "raw",
      apiKeyData,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const apiKeyEncryptionKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: 1000, hash: "SHA-256" },
      rawAPIKey,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const rawAPISecret = await crypto.subtle.importKey(
      "raw",
      secretKeyEncryptor,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const secretKeyEncryptionKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: 1000, hash: "SHA-256" },
      rawAPISecret,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    return {
      keyEncyptor: apiKeyEncryptionKey,
      secretKeyEncryptor: secretKeyEncryptionKey,
    };
  } catch (error) {
    return {
      keyEncyptor: null,
      secretKeyEncryptor: null,
    };
  }
};
