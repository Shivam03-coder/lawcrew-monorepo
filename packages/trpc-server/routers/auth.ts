import { protectedProcedure, publicProcedure, router } from "../trpc";
import { signupSchema, loginSchema } from "@lawcrew/schema";
import AuthServices from "@lawcrew/api/src/services/auth-services";
import { GlobalUtils } from "@lawcrew/api/src/global";
import { ApiError } from "../utils/api-error";

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

      if (existingUser) ApiError("User already exists");

      const isUserNameExist = await ctx.db.user.findUnique({
        where: { userName },
      });

      if (isUserNameExist) ApiError("Username already taken");

      const hashedPassword = await AuthServices.hashPassword(password);

      const newUser = await ctx.db.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
          UserAddress: {
            create: { city, state },
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

      return { user: newUser };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { password, userName } = input;

    const user = await ctx.db.user.findUnique({
      where: { userName },
    });

    if (!user) ApiError("User not found !");

    const isPasswordCorrect = await AuthServices.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) ApiError("You have entered an incorrect password");

    const { sessionToken } = await AuthServices.generateTokens(user);

    GlobalUtils.setMultipleCookies(ctx.res, [
      { name: "sessionToken", value: sessionToken },
      { name: "UserRole", value: user.role },
      { name: "UserId", value: user.id },
    ]);

    return { message: "You have been logged in succesfully" };
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
});
