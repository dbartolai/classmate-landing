// lib/redis.ts
import { createClient, RedisClientType } from "redis";

const redisUrl = process.env.REDIS_URL!;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

// Some Redis clients require TLS configuration for cloud Redis
const client: RedisClientType = createClient({
  url: redisUrl,
  socket: {
    // If your provider needs TLS (Upstash etc), set this
    tls: true,
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function connectIfNeeded() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Export functions for your operations
export async function addEmail(email: string) {
  await connectIfNeeded();
  // Use a Set to avoid duplicates
  await client.sAdd("waiting_list", email);
}

export async function getAllEmails(): Promise<string[]> {
  await connectIfNeeded();
  const members = await client.sMembers("waiting_list");
  return members;
}

export async function closeRedis() {
  if (client.isOpen) {
    await client.disconnect();
  }
}
