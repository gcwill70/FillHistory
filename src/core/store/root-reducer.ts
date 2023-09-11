import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import {
  commandsSlice,
  historySlice,
  lifecycleSlice,
  tabsSlice,
  paymentSlice,
} from "./slices";

export const rootReducer = combineReducers({
  commands: commandsSlice.reducer,
  history: historySlice.reducer,
  lifecycle: lifecycleSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction =
  | AnyAction
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof historySlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof paymentSlice.actions>
  | ActionType<typeof tabsSlice.actions>;
