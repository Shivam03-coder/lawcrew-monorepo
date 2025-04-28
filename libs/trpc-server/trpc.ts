import { initTRPC, TRPCError } from "@trpc/server";
import { createTRPCcontext } from "./context";
import superjson from "superjson";
import { ZodError } from "zod";
import AuthServices, {
  SessionUser,
} from "@lawcrew/api/src/services/auth-services";

export const t = initTRPC.context<typeof createTRPCcontext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { sessionToken } = ctx;

  if (!sessionToken) {
    throw new Error("Unauthorized - Session token not provided");
  }

  const session = await AuthServices.findSessionByToken(sessionToken, ctx.res);

  if (!session) {
    throw new Error("Unauthorized - Invalid or expired session");
  }

  const user: SessionUser = {
    id: session.id,
    role: session.role,
  };

  ctx.auth = user;

  if (!ctx.auth) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authenticated",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
