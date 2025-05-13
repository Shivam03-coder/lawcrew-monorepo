import { addParticipantsSchema, createOpponentSchema } from "@lawcrew/schema";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { ApiError } from "../utils/api-error";

export const participantsRoutes = router({
  addMember: protectedProcedure
    .input(addParticipantsSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        city,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        userName,
        state,
        country,
        zip,
      } = input;

      await ctx.db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            userName,
            UserAddress: {
              create: {
                city,
                state,
                country,
                zip,
              },
            },
            role: "MEMBER",
          },
        });

        await tx.teamMember.create({
          data: {
            userId: user.id,
          },
        });
      });
    }),
  addClient: protectedProcedure
    .input(addParticipantsSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        city,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        userName,
        state,
        country,
        zip,
      } = input;

      await ctx.db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            userName,
            UserAddress: {
              create: {
                city,
                state,
                country,
                zip,
              },
            },
            role: "CLIENT",
          },
        });

        await tx.teamClient.create({
          data: {
            userId: user.id,
          },
        });
      });
    }),
  getClient: protectedProcedure.query(async ({ ctx, input }) => {
    const client = await ctx.db.user.findMany({
      where: {
        role: "CLIENT",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        UserAddress: {
          select: {
            city: true,
            state: true,
          },
        },
        password: true,
        userName: true,
        createdAt: true,
        TeamClient: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return client;
  }),
  getMember: protectedProcedure.query(async ({ ctx }) => {
    const member = await ctx.db.user.findMany({
      where: {
        role: "MEMBER",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        UserAddress: {
          select: {
            city: true,
            state: true,
          },
        },
        password: true,
        userName: true,
        createdAt: true,
        TeamMember: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return member;
  }),

  deleteParticipant: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const deletedParticipant = await ctx.db.user.delete({
        where: {
          id,
        },
      });
      return deletedParticipant;
    }),

  createOpponent: protectedProcedure
    .input(createOpponentSchema)
    .mutation(async ({ ctx, input }) => {
      const caseDetails = await ctx.db.case.findUnique({
        where: {
          id: input.caseId,
        },
      });
      if (!caseDetails) ApiError("Case not found");

      await ctx.db.opponent.create({
        data: {
          ...input,
        },
      });
      return {
        message: "Opponent created successfully",
      };
    }),

  getAllOpponent: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.opponent.findMany({});
  }),
});
