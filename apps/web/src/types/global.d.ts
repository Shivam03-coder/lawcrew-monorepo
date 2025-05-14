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
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string | null;
  id: string;
  createdAt: string;
  userProfile: string | null;
  updatedAt: string;
  role: "ADMIN" | "MEMBER" | "CLIENT";
  UserAddress: {
    city: string;
    country: string;
    state: string;
    zip: string;
  } | null;
}
