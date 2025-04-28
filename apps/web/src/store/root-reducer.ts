import { combineReducers } from "@reduxjs/toolkit";
import { globalSlice } from "./states/global";

const rootReducer = combineReducers({
  global: globalSlice.reducer,
});

export default rootReducer;
