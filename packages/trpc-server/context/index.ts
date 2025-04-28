import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { db } from "@lawcrew/db";
import { UserRole } from "@lawcrew/db/generated/prisma";

interface SessionUser {
  id: string;
  role: UserRole;
}

export const createTRPCcontext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const { sessionToken } = req.cookies;

  return {
    sessionToken,
    db,
    res,
    auth: undefined as SessionUser | undefined,
  };
};
export type ITRPCContext = Awaited<ReturnType<typeof createTRPCcontext>>;
