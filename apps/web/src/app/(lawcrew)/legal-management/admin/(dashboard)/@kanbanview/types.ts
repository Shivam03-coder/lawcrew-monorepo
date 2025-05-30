import { AppRouterType } from "@lawcrew/trpc-server/routers/root";

export enum CaseStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PENDING = "PENDING",
}

export type Task = AppRouterType["litigation"]["getCaseDetailsByAdminId"];