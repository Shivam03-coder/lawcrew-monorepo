import { create } from "zustand";

interface UserStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<UserStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useThemeStore;
