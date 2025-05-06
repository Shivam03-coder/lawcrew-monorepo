import { caseDetailsSchema } from "@lawcrew/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const caseDetailsRoutes = router({
  createCase: protectedProcedure
    .input(caseDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const adminId = ctx.auth.id;
      const caseDetails = await ctx.db.case.create({
        data: {
          ...input,
          adminId,
        },
      });
    }),
  getDocumentsUrl: publicProcedure.query(async ({ ctx }) => {}),
});
