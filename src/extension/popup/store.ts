import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import { commandsSlice } from "../../commands/commands_slice";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import { paymentSlice } from "../../payment/payment_slice";
import { premiumSlice } from "../../premium/premium_slice";
import { searchSlice } from "../../search/search_slice";
import { tabsSlice } from "../../tabs/tabs_slice";

const contentReducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  message: messageSlice.reducer,
  commands: commandsSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
});

export type PopupState = ReturnType<typeof contentReducer>;
export type PopupAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export function createStore(
  preloadedState: PopupState = contentReducer(undefined, {
    type: "lifecycle",
  })
) {
  const store = configureStore<PopupState, PopupAction, Middleware[]>({
    reducer: contentReducer,
    preloadedState: preloadedState,
    middleware: (def) => def().concat(logger, messageController.middleware),
  });

  return store;
}
