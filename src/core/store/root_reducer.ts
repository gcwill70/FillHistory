import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import { commandsSlice } from "../../commands/commands_slice";
import { historySlice } from "../../history/history_slice";
import { lifecycleSlice } from "../../lifecycle/lifecycle_slice";
import { paymentSlice } from "../../payment/payment_slice";
import { tabsSlice } from "../../tabs/tabs_slice";
import { premiumSlice } from "../../premium";

export const rootReducer = combineReducers({
  commands: commandsSlice.reducer,
  history: historySlice.reducer,
  lifecycle: lifecycleSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premiumSlice: premiumSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction =
  | AnyAction
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof historySlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof paymentSlice.actions>
  | ActionType<typeof premiumSlice.actions>
  | ActionType<typeof tabsSlice.actions>;