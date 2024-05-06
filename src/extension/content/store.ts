import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import activeElementController from "../../active-element-content/active_element_controller";
import commandsController from "../../commands-content/commands_controller";
import { commandsSlice } from "../../commands/commands_slice";
import lifecycleController from "../../lifecycle-content/lifecycle_controller";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import paymentController from "../../payment-content/payment_controller";
import { paymentSlice } from "../../payment/payment_slice";
import { premiumSlice } from "../../premium/premium_slice";
import searchController from "../../search-content/search_controller";
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

export type ContentState = ReturnType<typeof contentReducer>;
export type ContentAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export function createStore(
  preloadedState: ContentState = contentReducer(undefined, {
    type: "lifecycle",
  })
) {
  const store = configureStore<ContentState, ContentAction, Middleware[]>({
    reducer: contentReducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        logger,
        lifecycleController.middleware,
        messageController.middleware,
        commandsController.middleware,
        activeElementController.middleware,
        searchController.middleware,
        paymentController.middleware
      ),
  });

  return store;
}
