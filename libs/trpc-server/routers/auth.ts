import { protectedProcedure, publicProcedure, router } from "../trpc";
import { signupSchema } from "@lawcrew/schema";
import AuthServices from "@lawcrew/api/src/services/auth-services";

export const authRoutes = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, userName, email, password } = input;

      const existingUser = await ctx.db.user.findFirst({
        where: {
          OR: [{ email }, { userName }],
        },
      });

      if (existingUser) {
        throw new Error("User with given email or username already exists.");
      }

      const hashedPassword = await AuthServices.hashPassword(password);

      const newUser = await ctx.db.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
        },
      });

      return {
        id: newUser.id,
        email: newUser.email,
        userName: newUser.userName,
      };
    }),

  users: publicProcedure.query(async () => {
    console.log("Shivam anand");
    return {
      name: "Shivam annad",
    };
  }),
});
