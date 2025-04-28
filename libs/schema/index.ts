import { z } from "zod";
export const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
