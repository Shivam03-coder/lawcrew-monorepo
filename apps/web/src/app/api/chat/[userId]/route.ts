import { StreamChat } from "stream-chat";
import { NextRequest } from "next/server";
const apiKey = process.env.STREAM_API_KEY!;
const secretKey = process.env.STREAM_SECRET_KEY!;

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      userId: string;
    }>;
  },
) {
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  const serverClient = StreamChat.getInstance(apiKey, secretKey);

  try {
    const token = serverClient.createToken(userId);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to create token",
        message: error.message || String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}