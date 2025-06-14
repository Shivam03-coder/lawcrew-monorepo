import { AppRouter } from "@lawcrew/trpc-server/routers/root";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
