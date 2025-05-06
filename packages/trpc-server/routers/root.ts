import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { authRoutes } from "./auth";
import { participantsRoutes } from "./participants";
import { caseDetailsRoutes } from "./case";

export const appRouter = router({
  auth: authRoutes,
  participant: participantsRoutes,
  litigation: caseDetailsRoutes,
});

export type AppRouter = typeof appRouter;

export type AppRouterType = inferRouterOutputs<AppRouter>;
