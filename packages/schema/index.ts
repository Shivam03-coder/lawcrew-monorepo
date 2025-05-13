import { z } from "zod";

// ==================== Shared Base Schemas ====================
const baseNameSchema = {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
};

const baseLocationSchema = {
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zip: z
    .string()
    .min(4, "ZIP code must be at least 4 characters")
    .max(10, "ZIP code must be at most 10 characters"),
};

const baseContactSchema = {
  email: z.string().email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
};

const usernameSchema = z
  .string()
  .regex(/^[A-Za-z]+@\d+$/, "Username must be in the format Name@12345");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

// ==================== Enum Schemas ====================
export const PracticeAreaEnum = z.enum([
  "CRIMINAL",
  "CIVIL",
  "COMMERCIAL",
  "ADMINISTRATIVE",
  "LABOR",
  "FAMILY",
  "REAL_ESTATE",
  "INTELLECTUAL_PROPERTY",
  "ENVIRONMENTAL",
  "TAXATION",
]);

const CaseStatusEnum = z.enum(["OPEN", "CLOSED", "PENDING"]);
const MatterPriorityEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

const CaseStageEnum = z.enum([
  "RECONCILIATION_COMMITTEE",
  "FIRST_INSTANCE_COURT",
  "APPEAL_COURT",
  "CASSATION_HIGH_COURT",
  "EXECUTION",
  "UNDER_SETTLEMENT",
  "SETTLED_CLOSED",
  "DISPUTE",
]);

const PaymentStatusEnum = z.enum([
  "PENDING",
  "PAID",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
]);

const PaymentMethodEnum = z.enum([
  "BANK_TRANSFER",
  "CREDIT_CARD",
  "CASH",
  "CHEQUE",
  "ONLINE",
]);

const RateTypeEnum = z.enum(["FIXED", "HOURLY", "RETAINER"]);

// ==================== Main Schemas ====================
export const signupSchema = z.object({
  ...baseNameSchema,
  ...baseLocationSchema,
  userName: usernameSchema,
  ...baseContactSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  userName: usernameSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z
  .object({
    userName: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const addParticipantsSchema = z.object({
  ...baseNameSchema,
  ...baseLocationSchema,
  ...baseContactSchema,
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  password: passwordSchema,
});

export const caseDetailsSchema = z.object({
  title: z.string(),
  description: z.string(),
  practiseArea: PracticeAreaEnum,
  status: CaseStatusEnum,
  matterPriority: MatterPriorityEnum,
  internalRefNumber: z.string(),
  arrivalDate: z.string().datetime(),
  filedDate: z.string().datetime(),
  closedDate: z.string().datetime().nullable().optional(),
  estimatedCloseDate: z.string().datetime(),
  stage: CaseStageEnum,
  clientId: z.string(),
  teamMemberIds: z.array(z.string()),
  docsUrl: z.string().url(),
  labels: z.string(),
  note: z.string(),
});

export const caseBillingSchema = z.object({
  caseId: z.string().min(1, "Case ID is required"),
  amount: z.number().positive("Amount must be a positive number"),
  rateType: RateTypeEnum,
  paymentStatus: PaymentStatusEnum,
  paymentMethod: PaymentMethodEnum,
  paymentDate: z.string().datetime("Invalid payment date format"),
  billingNote: z.string().optional(),
});

export const createOpponentSchema = z.object({
  caseId: z.string().optional(),
  ...baseNameSchema,
  jobTitle: z.string().optional(),
  ...baseContactSchema,
  ...baseLocationSchema,
});

// ==================== Type Definitions ====================
export type SignupType = z.infer<typeof signupSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type AddParticipantsType = z.infer<typeof addParticipantsSchema>;
export type CaseDetailsType = z.infer<typeof caseDetailsSchema>;
export type CaseBillingType = z.infer<typeof caseBillingSchema>;
export type CreateOpponentInput = z.infer<typeof createOpponentSchema>;
