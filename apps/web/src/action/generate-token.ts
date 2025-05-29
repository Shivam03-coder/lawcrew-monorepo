// app/actions/generate-token.ts
"use server";

import { StreamChat } from "stream-chat";

export async function generateToken(userId: string) {
  const apiKey = process.env.STREAM_API_KEY!;
  const secretKey = process.env.STREAM_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(apiKey, secretKey);
  return serverClient.createToken(userId);
}
