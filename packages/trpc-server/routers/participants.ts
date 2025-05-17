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
      const client = await ctx.db.teamClient.findFirst({
        where: {
          id: input.clientId,
        },
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              userName: true,
              password: true,
              email: true,
              phoneNumber: true,
              firstName: true,
              lastName: true,
              createdAt: true,
              updatedAt: true,
              userProfile: true,
              role: true,
              UserAddress: {
                select: {
                  city: true,
                  zip: true,
                  country: true,
                  state: true,
                },
              },
            },
          },
        },
      });

      if (!client || !client.user) return null;

      return {
        clientId: input.clientId,
        userName: client.user.userName,
        password: client.user.password,
        email: client.user.email,
        phoneNumber: client.user.phoneNumber,
        firstName: client.user.firstName,
        lastName: client.user.lastName,
        id: client.user.id,
        createdAt: client.user.createdAt,
        updatedAt: client.user.updatedAt,
        userProfile: client.user.userProfile,
        role: client.user.role,
        UserAddress: client.user.UserAddress,
      };
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
