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
    state: string;
  } | null;
  userName: string;
  createdAt: string;
}

export interface SelectedMembersType {
  id: string;
  name: string;
}

export interface DocumentsType{
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string | null;
  initialContent: string | null;
}