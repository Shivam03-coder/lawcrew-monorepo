import { AppRouter } from "@lawcrew/trpc-server/routers/root";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { ENVS } from "@lawcrew/env";
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${ENVS.TRPC_SERVER_API_URI}`,
    }),
  ],
});
