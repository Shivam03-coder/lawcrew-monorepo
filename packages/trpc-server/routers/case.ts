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
          CaseTag: {
            create: {
              label: input.labels as string,
            },
          },
          CaseNote: {
            create: {
              note: input.note as string,
              createdBy: adminId,
            },
          },
        },
      });
      return caseDetails;
    }),
});
