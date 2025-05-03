import { addParticipantsSchema } from "@lawcrew/schema";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

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
      } = input;

      const member = await ctx.db.user.create({
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
            },
          },
          role: "MEMBER",
        },
      });
      return member;
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
      } = input;

      const client = await ctx.db.user.create({
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
            },
          },
          role: "CLIENT",
        },
      });
      return client;
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return client;
  }),
  getMember: protectedProcedure.query(async ({ ctx, input }) => {
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
});
