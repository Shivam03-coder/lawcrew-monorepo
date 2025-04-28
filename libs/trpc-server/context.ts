import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { UserRole } from "@lawcrew/db/types";
import { db } from "@lawcrew/db";

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
