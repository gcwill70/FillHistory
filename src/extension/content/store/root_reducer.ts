import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import { commandsSlice } from "../../../commands/commands_slice";
import { lifecycleSlice } from "../../../lifecycle/lifecycle_slice";
import { searchSlice } from "../../../search/search_slice";
import { tabsSlice } from "../../../tabs/tabs_slice";

export const rootReducer = combineReducers({
  commands: commandsSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
});

export type ContentState = ReturnType<typeof rootReducer>;
export type ContentAction =
  | AnyAction
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;
