import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import { commandsSlice } from "../../../commands/commands_slice";
import { lifecycleSlice } from "../../../lifecycle/lifecycle_slice";
import { paymentSlice } from "../../../payment/payment_slice";
import { premiumSlice } from "../../../premium/premium_slice";
import { searchSlice } from "../../../search/search_slice";
import { tabsSlice } from "../../../tabs/tabs_slice";

export const backgroundReducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  commands: commandsSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
});

export type BackgroundState = ReturnType<typeof backgroundReducer>;
export type BackgroundAction =
  | AnyAction
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof paymentSlice.actions>
  | ActionType<typeof premiumSlice.actions>
  | ActionType<typeof tabsSlice.actions>;
