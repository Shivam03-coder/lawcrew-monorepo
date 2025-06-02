import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { authRoutes } from "./user";
import { participantsRoutes } from "./participants";
import { caseDetailsRoutes } from "./case";
import { documentsRoutes } from "./documents";
import { clientRoutes } from "./client";

export const appRouter = router({
  user: authRoutes,
  participant: participantsRoutes,
  litigation: caseDetailsRoutes,
  document: documentsRoutes,
  client: clientRoutes,
});

export type AppRouter = typeof appRouter;

export type AppRouterType = inferRouterOutputs<AppRouter>;
