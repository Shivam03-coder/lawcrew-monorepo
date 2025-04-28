import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = globalSlice.actions;
