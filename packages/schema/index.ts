import { z } from "zod";
export const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  city: z.string().min(6),
  state: z.string().min(6),
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(6),
});
