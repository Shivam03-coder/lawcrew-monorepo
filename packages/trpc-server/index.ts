import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/root";
import { createTRPCcontext } from "./context";

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext: createTRPCcontext,
});
