import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { authRoutes } from "./auth";
import { participantsRoutes } from "./participants";

export const appRouter = router({
  auth: authRoutes,
  participant: participantsRoutes,
});

export type AppRouter = typeof appRouter;

export type AppRouterType = inferRouterOutputs<AppRouter>;
