import { protectedProcedure, publicProcedure, router } from "../trpc";
import { signupSchema, loginSchema } from "@lawcrew/schema";
import AuthServices from "@lawcrew/api/src/services/auth-services";
import { GlobalUtils } from "@lawcrew/api/src/global";

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
      } = input;

      const existingUser = await ctx.db.user.findFirst({
        where: {
          OR: [{ email }, { userName }],
        },
      });

      if (existingUser) throw new Error("User already exist!");

      const isUserNameExist = await ctx.db.user.findUnique({
        where: {
          userName,
        },
      });

      if (isUserNameExist) throw new Error("User name already exist!");

      const hashedPassword = await AuthServices.hashPassword(password);

      const newUser = await ctx.db.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
          UserAddress: {
            create: {
              city,
              state,
            },
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

      return {
        user: newUser,
      };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { password, userName } = input;

    // Check if the user exists
    const user = await ctx.db.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) throw new Error("User doesn't exist");

    const isPasswordCorrect = await AuthServices.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong password!");

    const { sessionToken } = await AuthServices.generateTokens(user);
    GlobalUtils.setMultipleCookies(ctx.res, [
      { name: "sessionToken", value: sessionToken },
      { name: "UserRole", value: user.role },
      { name: "UserId", value: user.id },
    ]);

    return {
      message: "Login succesfull",
    };
  }),

  forgotpassword: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, userName } = input;

      const isUserExist = await ctx.db.user.findUnique({
        where: {
          userName,
        },
      });
      if (!isUserExist) throw new Error("User doesnot exist");
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
      },
    });
    return {
      user,
    };
  }),
});
