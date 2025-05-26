import {
  caseBillingSchema,
  caseDetailsSchema,
  editCaseDetailsSchema,
} from "@lawcrew/schema";
import { protectedProcedure, router } from "../trpc";
import { ApiError } from "../utils/api-error";
import { z } from "zod";
import { db } from "@lawcrew/db";
import { format } from "date-fns";

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

      const newCase = await ctx.db.$transaction(async (tx) => {
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
            caseNote: {
              create: {
                note,
              },
            },
            caseTag: {
              create: {
                label: labels,
              },
            },
            caseDocument: {
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

      return newCase.res;
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

  getCasedetails: protectedProcedure.query(async ({ ctx }) => {
    const caseDetails = await ctx.db.case.findMany({
      select: {
        id: true,
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

  editCaseOpponentsDetails: protectedProcedure
    .input(
      z.object({
        caseId: z.string(),
        opponentId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { caseId, opponentId } = input;

      const caseExists = await ctx.db.case.findUnique({
        where: { id: caseId },
      });

      if (!caseExists) {
        throw new Error("Case not found");
      }

      const updateData: any = {};

      if (opponentId) {
        updateData.Opponent = {
          connect: { id: opponentId },
        };
      }

      const updatedCase = await ctx.db.case.update({
        where: { id: caseId },
        data: updateData,
      });

      return {
        message: "Case updated successfully",
        data: updatedCase,
      };
    }),

  deleteCase: protectedProcedure
    .input(
      z.object({
        caseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { caseId } = input;

      const caseExists = await ctx.db.case.findUnique({
        where: { id: caseId },
      });

      if (!caseExists) {
        throw new Error("Case not found");
      }

      await ctx.db.case.delete({
        where: { id: caseId },
      });

      return {
        message: "Case deleted successfully",
      };
    }),

  getCaseDetailsById: protectedProcedure
    .input(
      z.object({
        caseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { caseId } = input;

      const caseExists = await ctx.db.case.findUnique({
        where: { id: caseId },
      });

      if (!caseExists) {
        throw new Error("Case not found");
      }

      const litigation = await ctx.db.case.findFirst({
        where: { id: caseId },
      });

      return litigation;
    }),

  getOpponentsIds: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.opponent.findMany({
      select: {
        id: true,
        firstName: true,
      },
    });
  }),

  getCaseDetailsByClientId: protectedProcedure
    .input(
      z.object({
        clientId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { clientId } = input;

      const caseExists = await ctx.db.case.findMany({
        where: { clientId },
      });

      if (!caseExists) {
        throw new Error("Case not found for this client");
      }

      const litigation = await ctx.db.case.findMany({
        where: { clientId },
        include: {
          members: {
            include: {
              teamMember: {
                include: {
                  user: true,
                },
              },
            },
          },
          caseTag: {
            select: {
              label: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return litigation;
    }),

  editcaseDetails: protectedProcedure
    .input(editCaseDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        caseId,
        title,
        description,
        practiseArea,
        status,
        matterPriority,
        internalRefNumber,
        arrivalDate,
        filedDate,
        closedDate,
        estimatedCloseDate,
        stage,
        teamMemberIds,
      } = input;

      if (!caseId) throw new Error("Case ID is required");

      const caseExists = await ctx.db.case.findUnique({
        where: { id: caseId },
      });

      if (!caseExists) throw new Error("Case not found");

      await ctx.db.$transaction(async (tx) => {
        await tx.case.update({
          where: { id: caseId },
          data: {
            ...(title && { title }),
            ...(description && { description }),
            ...(practiseArea && { practiseArea }),
            ...(status && { status }),
            ...(matterPriority && { matterPriority }),
            ...(internalRefNumber && { internalRefNumber }),
            ...(arrivalDate && { arrivalDate: new Date(arrivalDate) }),
            ...(filedDate && { filedDate: new Date(filedDate) }),
            ...(closedDate !== undefined && {
              closedDate: closedDate ? new Date(closedDate) : null,
            }),
            ...(estimatedCloseDate && {
              estimatedCloseDate: new Date(estimatedCloseDate),
            }),
            ...(stage && { stage }),
          },
        });

        if (teamMemberIds?.length) {
          await tx.teamMembership.deleteMany({
            where: { caseId },
          });

          await tx.teamMembership.createMany({
            data: teamMemberIds.map((teamMemberId) => ({
              caseId,
              teamMemberId,
            })),
          });
        }
      });

      return {
        message: "Case updated successfully",
      };
    }),

  getCaseDetailsByAdminId: protectedProcedure.query(async ({ ctx, input }) => {
    const teamAdmin = await db.teamAdmin.findUnique({
      where: {
        userId: ctx.auth.id,
      },
    });
    return await db.case.findMany({
      where: {
        adminId: teamAdmin?.id,
      },
      select: {
        id: true,
        title: true,
        caseNote: {
          select: {
            note: true,
          },
        },
        estimatedCloseDate: true,
        status: true,
        internalRefNumber: true,
        practiseArea: true,
      },
    });
  }),

  monthlyCaseStats: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.case.findMany();
  }),
});
