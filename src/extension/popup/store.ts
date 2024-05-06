import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import commandController from "../../command-popup/command_controller";
import { commandSlice } from "../../command/command_slice";
import lifecycleController from "../../lifecycle-popup/lifecycle_controller";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import { paymentSlice } from "../../payment/payment_slice";
import { premiumSlice } from "../../premium/premium_slice";
import { searchSlice } from "../../search/search_slice";
import { tabsSlice } from "../../tabs/tabs_slice";
import { lifecycleSlice } from "../../lifecycle-popup/lifecycle_slice";

const reducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  message: messageSlice.reducer,
  commands: commandSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
});

export type PopupState = ReturnType<typeof reducer>;
export type PopupAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof commandSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export function createStore(
  preloadedState: PopupState = reducer(undefined, {
    type: "lifecycle",
  })
) {
  const store = configureStore<PopupState, PopupAction, Middleware[]>({
    reducer: reducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        logger,
        lifecycleController.middleware,
        messageController.middleware,
        commandController.middleware
      ),
  });

  return store;
}
