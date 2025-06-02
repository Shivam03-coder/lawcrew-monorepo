import { router, protectedProcedure } from "../trpc";

export const memberRoutes = router({
  memberMonthlyCaseStats: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.case.findMany({
      where: {
        members: {
          some: {
            teamMember: {
              userId: ctx.auth.id,
            },
          },
        },
      },
    });
  }),

  getMemberCasedetails: protectedProcedure.query(async ({ ctx }) => {
    const caseDetails = await ctx.db.case.findMany({
      where: {
        members: {
          some: {
            teamMember: {
              userId: ctx.auth.id,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        arrivalDate: true,
        closedDate: true,
        stage: true,
        status: true,
        practiseArea: true,
        filedDate: true,
        internalRefNumber: true,
        matterPriority: true,
        caseDocument: {
          select: {
            documentUrl: true,
          },
        },
        Opponent: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return {
      caseDetails,
    };
  }),
});
