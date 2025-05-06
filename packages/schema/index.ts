import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zip: z
    .string()
    .min(4, "ZIP code must be at least 4 characters")
    .max(10, "ZIP code must be at most 10 characters"),
  userName: z
    .string()
    .regex(/^[A-Za-z]+@\d+$/, "Username must be in the format Name@12345"),

  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
});

export type SignupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  userName: z
    .string()
    .regex(/^[A-Za-z]+@\d+$/, "Username must be in the format Name@12345"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z
  .object({
    userName: z
      .string()
      .regex(/^[A-Za-z]+@\d+$/, "Username must be in the format Name@12345"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const addParticipantsSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),

  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),

  phoneNumber: z.string().regex(/^[0-9]{10,15}$/, {
    message: "Phone number must be between 10 and 15 digits",
  }),
});

export type AddParticipantsType = z.infer<typeof addParticipantsSchema>;
