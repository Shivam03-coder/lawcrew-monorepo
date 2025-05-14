import { create } from "zustand";

interface AuthStore {
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthLoading: false,
  setIsAuthLoading: (loading: boolean) => set({ isAuthLoading: loading }),
}));

export default useAuthStore;
