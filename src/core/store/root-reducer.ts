import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import {
  activeElementSlice,
  commandSlice,
  historySlice,
  lifecycleSlice,
  tabsSlice,
} from "./slices";

export const rootReducer = combineReducers({
  activeElement: activeElementSlice.reducer,
  command: commandSlice.reducer,
  history: historySlice.reducer,
  lifecycle: lifecycleSlice.reducer,
  tabs: tabsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction =
  | AnyAction
  | ActionType<typeof activeElementSlice.actions>
  | ActionType<typeof commandSlice.actions>
  | ActionType<typeof historySlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;
