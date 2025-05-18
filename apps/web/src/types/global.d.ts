import {
  CaseStageEnum,
  CaseStatusEnum,
  MatterPriorityEnum,
  PracticeAreaEnum,
} from "@lawcrew/schema";

export interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

export interface Participants {
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  phoneNumber: string;
  id: string;
  UserAddress: {
    city: string;
    country: string;
    state: string;
    zip: string;
  } | null;
  userName: string;
  createdAt: string;
}
export interface ClientListType {
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string | null;
  id: string;
  createdAt: string;
  role: "ADMIN" | "MEMBER" | "CLIENT";
  UserAddress: {
    city: string;
    country: string;
    state: string;
    zip: string;
  } | null;
  TeamClient: {
    id: string;
  } | null;
}

export interface SelectedMembersType {
  id: string;
  name: string;
}

export interface DocumentsType {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string | null;
  initialContent: string | null;
}

export interface ClientType {
  clientId: string;
  userName: string | null;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string | null;
  id: string;
  createdAt: string;
  userProfile: string | null;
  updatedAt: string;
  UserAddress: {
    city: string;
    country: string;
    state: string;
    zip: string;
  } | null;
}

export interface EditCaseType {
  caseId: string;
  title?: string;
  description?: string;
  practiseArea?: z.infer<typeof PracticeAreaEnum>;
  status?: z.infer<typeof CaseStatusEnum>;
  matterPriority?: z.infer<typeof MatterPriorityEnum>;
  internalRefNumber?: string;
  arrivalDate?: Date;
  filedDate?: Date;
  closedDate?: Date;
  estimatedCloseDate?: Date;
  stage?: z.infer<typeof CaseStageEnum>;
  teamMemberIds?: string[];
  note?: string;
  labels?: string;
  docsUrl?: string;
}

export interface LegalCase {
  id: string;
  arrivalDate: string;
  closedDate: string | null;
  stage: CaseStage;
  status: CaseStatus;
  practiseArea: PracticeArea;
  filedDate: string;
  internalRefNumber: string;
  matterPriority: MatterPriority;
  caseDocument: {
    documentUrl: string;
  } | null;
  Opponent: {
    firstName: string;
    lastName: string;
  } | null;
}

export enum CaseStage {
  RECONCILIATION_COMMITTEE = "RECONCILIATION_COMMITTEE",
  FIRST_INSTANCE_COURT = "FIRST_INSTANCE_COURT",
  APPEAL_COURT = "APPEAL_COURT",
  CASSATION_HIGH_COURT = "CASSATION_HIGH_COURT",
  EXECUTION = "EXECUTION",
  UNDER_SETTLEMENT = "UNDER_SETTLEMENT",
  SETTLED_CLOSED = "SETTLED_CLOSED",
  DISPUTE = "DISPUTE",
}

export enum CaseStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PENDING = "PENDING",
}

export enum MatterPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum PracticeArea {
  CRIMINAL = "CRIMINAL",
  CIVIL = "CIVIL",
  COMMERCIAL = "COMMERCIAL",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  LABOR = "LABOR",
  FAMILY = "FAMILY",
  REAL_ESTATE = "REAL_ESTATE",
  INTELLECTUAL_PROPERTY = "INTELLECTUAL_PROPERTY",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  TAXATION = "TAXATION",
}
