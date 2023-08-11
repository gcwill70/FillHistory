import { combineReducers } from "@reduxjs/toolkit";
import { ActionType, EmptyAction } from "typesafe-actions";
import { commandSlice, tabsSlice } from "./slices";
import { historySlice } from "./slices/history-slice";

export const rootReducer = combineReducers({
  command: commandSlice.reducer,
  tabs: tabsSlice.reducer,
  history: historySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction =
  | EmptyAction<"init/start">
  | EmptyAction<"init/done">
  | ActionType<typeof tabsSlice.actions>
  | ActionType<typeof commandSlice.actions>
  | ActionType<typeof historySlice.actions>;
