import { caseBillingSchema, caseDetailsSchema } from "@lawcrew/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { ApiError } from "../utils/api-error";

export const caseDetailsRoutes = router({
  createCase: protectedProcedure
    .input(caseDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const teamAdmin = await ctx.db.teamAdmin.findFirst({
        where: {
          userId: ctx.auth.id,
        },
        select: {
          id: true,
        },
      });

      if (!teamAdmin) return;

      const {
        arrivalDate,
        clientId,
        description,
        docsUrl,
        estimatedCloseDate,
        filedDate,
        internalRefNumber,
        labels,
        matterPriority,
        note,
        practiseArea,
        stage,
        status,
        teamMemberIds,
        title,
        closedDate,
      } = input;

      await ctx.db.$transaction(async (tx) => {
        const createdCase = await tx.case.create({
          data: {
            title,
            adminId: teamAdmin?.id,
            clientId,
            arrivalDate,
            closedDate,
            description,
            filedDate,
            estimatedCloseDate,
            internalRefNumber,
            stage,
            status,
            practiseArea,
            CaseNote: {
              create: {
                note,
              },
            },
            CaseTag: {
              create: {
                label: labels,
              },
            },
            CaseDocument: {
              create: {
                documentUrl: docsUrl,
              },
            },
            matterPriority,
          },
        });

        await Promise.all(
          teamMemberIds.map((teamMemberId) =>
            tx.teamMembership.create({
              data: {
                caseId: createdCase.id,
                teamMemberId,
              },
            })
          )
        );

        return {
          message: "Litigation Case Created",
          res: createdCase,
        };
      });
    }),
  createBillings: protectedProcedure
    .input(caseBillingSchema)
    .mutation(async ({ ctx, input }) => {
      const isExist = await ctx.db.case.findUnique({
        where: {
          id: input.caseId,
        },
      });
      if (!isExist) ApiError("No Litigation Found");

      await ctx.db.caseBilling.create({
        data: {
          ...input,
        },
      });

      return {
        message: "Billing details saved succesfully.",
      };
    }),
});
