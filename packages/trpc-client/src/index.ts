import { AppRouter } from "@lawcrew/trpc-server/routers/root";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:5050/trpc`,
    }),
  ],
});
