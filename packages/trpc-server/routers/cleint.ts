import { protectedProcedure, router } from "../trpc";
import { ApiError } from "../utils/api-error";

const clientRouter = router({
  getClientAssociatedCases: protectedProcedure.query(async ({ ctx }) => {
    const client = await ctx.db.teamClient.findUnique({
      where: {
        userId: ctx.auth.id,
      },
    });

    if (!client) ApiError("Client not found");

    return await ctx.db.case.findMany({
      where: {
        id: client.id,
      },
    });
  }),
});

export default clientRouter;
