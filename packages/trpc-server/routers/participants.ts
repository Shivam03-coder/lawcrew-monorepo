import {
  addParticipantsSchema,
  createOpponentSchema,
  editClientSchema,
} from "@lawcrew/schema";
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
            country: true,
            zip: true,
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
        role: true,
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

  createNewOpponent: protectedProcedure
    .input(createOpponentSchema)
    .mutation(async ({ ctx, input }) => {
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

  getClientDetailsById: protectedProcedure
    .input(
      z.object({
        clientId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.teamClient.findFirst({
        where: {
          id: input.clientId,
        },
        select: {
          id: true,
          cases: true,
          createdAt: true,
          user: {
            include: {
              UserAddress: {
                select: {
                  city: true,
                  country: true,
                  state: true,
                  zip: true,
                },
              },
            },
          },
        },
      });
    }),

  editClientInfo: protectedProcedure
    .input(editClientSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        city,
        clientId,
        country,
        email,
        firstName,
        lastName,
        phoneNumber,
        state,
        zip,
      } = input;
      await ctx.db.teamClient.update({
        where: {
          id: clientId,
        },
        data: {
          user: {
            update: {
              ...(firstName && { firstName }),
              ...(lastName && { lastName }),
              UserAddress: {
                update: {
                  ...(city && { city }),
                  ...(country && { country }),
                  ...(state && { state }),
                  ...(zip && { zip }),
                },
              },
              ...(email && { email }),
              ...(phoneNumber && { phoneNumber }),
            },
          },
        },
      });
      return {
        message: "Client edited succesfully",
      };
    }),
});
