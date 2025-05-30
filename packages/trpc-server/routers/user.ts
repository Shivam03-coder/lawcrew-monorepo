import { protectedProcedure, publicProcedure, router } from "../trpc";
import { signupSchema, loginSchema, addTaskSchema } from "@lawcrew/schema";
import AuthServices from "@lawcrew/api/src/services/auth-services";
import { GlobalUtils } from "@lawcrew/api/src/global";
import { ApiError } from "../utils/api-error";
import { z } from "zod";
export const authRoutes = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        city,
        state,
        phoneNumber,
        country,
        zip,
      } = input;

      const existingUser = await ctx.db.user.findFirst({
        where: {
          OR: [{ email }, { userName }],
        },
      });

      if (existingUser) ApiError("User already exists");

      const isUserNameExist = await ctx.db.user.findUnique({
        where: { userName },
      });

      if (isUserNameExist) ApiError("Username already taken");

      const hashedPassword = await AuthServices.hashPassword(password);

      const newUser = await ctx.db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            UserAddress: {
              create: { city, state, country, zip },
            },
            phoneNumber,
          },
          select: {
            id: true,
            email: true,
            userName: true,
            createdAt: true,
          },
        });

        await tx.teamAdmin.create({
          data: {
            userId: user.id,
          },
        });

        return {
          id: user.id,
          email: user.email,
          userName: user.userName,
          createdAt: user.createdAt,
        };
      });

      return { user: newUser };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { password, userName } = input;

    const user = await ctx.db.user.findUnique({
      where: { userName },
    });

    if (!user) ApiError("Please check your username and password.");

    const isPasswordCorrect = await AuthServices.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordCorrect)
      ApiError(" Please check your username and password.");

    const { sessionToken } = await AuthServices.generateTokens(user);

    GlobalUtils.setMultipleCookies(ctx.res, [
      { name: "sessionToken", value: sessionToken },
      { name: "UserRole", value: user.role },
      { name: "UserId", value: user.id },
    ]);

    return {
      success: true,
      message: "Login successful! Redirecting...",
      user: {
        id: user.id,
        userName: user.userName,
        role: user.role,
      },
    };
  }),

  forgotpassword: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, userName } = input;

      const isUserExist = await ctx.db.user.findUnique({
        where: { userName },
      });

      if (!isUserExist) ApiError("User does not exist");

      const hashedPassword = await AuthServices.hashPassword(password);

      await ctx.db.user.update({
        where: { userName },
        data: { password: hashedPassword },
      });

      return { message: "Password reset successfully" };
    }),

  userinfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.auth.id },
      select: {
        id: true,
        email: true,
        userName: true,
        UserAddress: {
          select: {
            city: true,
            state: true,
          },
        },
        userProfile: true,
      },
    });
    return { user };
  }),

  addToDo: protectedProcedure
    .input(addTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const { task, taskForDate } = input;

      await ctx.db.toDoList.create({
        data: {
          task,
          taskForDate: new Date(taskForDate).toISOString(),
          userId: ctx.auth.id,
        },
      });

      return { message: "Password reset successfully" };
    }),
  getToDoByDate: protectedProcedure
    .input(
      z.object({
        taskForDate: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date(input.taskForDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      return await ctx.db.toDoList.findMany({
        where: {
          taskForDate: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  checkToDo: protectedProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { todoId } = input;

      const existingTodo = await ctx.db.toDoList.findUnique({
        where: { id: todoId },
        select: { isTaskChecked: true },
      });

      if (!existingTodo) {
        throw new Error("Todo not found");
      }

      await ctx.db.toDoList.update({
        where: { id: todoId },
        data: {
          isTaskChecked: !existingTodo.isTaskChecked,
        },
      });

      return { message: "Task toggle successful" };
    }),

  deleteToDo: protectedProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { todoId } = input;

      const existingTodo = await ctx.db.toDoList.findUnique({
        where: { id: todoId },
        select: { isTaskChecked: true },
      });

      if (!existingTodo) {
        throw new Error("Todo not found");
      }

      await ctx.db.toDoList.delete({
        where: { id: todoId },
      });

      return { message: "Task deleted successful" };
    }),

  getContactDetails: protectedProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        userName: true,
      },
    });
    return contacts;
  }),

  setChatToken: protectedProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.auth.id,
        },
      });

      if (!user) ApiError("User not found !");

      await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          chatToken: input.token,
        },
      });

      return {
        message: "Chat Token saved succesfully",
      };
    }),

  checkToken: protectedProcedure.query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.auth.id,
      },
    });

    if (!user) ApiError("User not found !");

    return {
      token: user.chatToken,
    };
  }),
});
