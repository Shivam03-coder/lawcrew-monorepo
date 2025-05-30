"use client";
import cookies from "js-cookie";
import { create } from "zustand";

interface AuthStore {
  role: string;
  setRole: (role: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  role: cookies.get("UserRole") ?? "",
  setRole: (role) => set({ role: role.toLowerCase() }),
}));

export default useAuthStore;
