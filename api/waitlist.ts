import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "redis";

const client = createClient({
  url: process.env.EMAIL_REDIS_URL!,
  socket: {
    tls: true, // required for Upstash/Redis Cloud
  },
});

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectIfNeeded() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    try {
      await connectIfNeeded();
      await client.sAdd("waiting_list", email.trim());
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Redis error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
