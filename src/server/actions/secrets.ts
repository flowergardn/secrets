"use server";

import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { env } from "~/env";
import { verifyTurnstile } from "~/server/turnstile";

function encryptContent(text: string): string {
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex");

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const ivHex = iv.toString("hex");

  return `${ivHex}:${encrypted}`;
}

function decryptContent(encryptedData: string): string {
  const [ivHex, encryptedText] = encryptedData.split(":");

  if (!ivHex || !encryptedText) {
    throw new Error("Invalid encrypted data format");
  }

  const key = Buffer.from(env.ENCRYPTION_KEY, "hex");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export default async function createSecret(
  text: string,
  ex: number,
  turnstileToken: string,
) {
  const verifyToken = await verifyTurnstile(turnstileToken);
  if (!verifyToken.success) throw new Error("Invalid turnstile token");

  if (ex < 0) throw new Error("Expiration time must be greater than 0");
  if (ex > 3600) throw new Error("Expiration time must be less than 1 hour");

  const redis = Redis.fromEnv();
  const id = nanoid();

  const encryptedContent = encryptContent(text);

  await redis.set(id, encryptedContent, {
    ex,
  });

  return id;
}

export async function getSecret(id: string) {
  const redis = Redis.fromEnv();
  const data = await redis.get<string>(id);

  if (!data) return null;

  return decryptContent(data);
}

export async function deleteSecret(id: string) {
  const redis = Redis.fromEnv();
  await redis.del(id);
}