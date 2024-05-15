import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import activeElementController from "../../active-element-content/active_element_controller";
import commandController from "../../command-content/command_controller";
import { commandSlice } from "../../command/command_slice";
import { favoritesSlice } from "../../favorites/favorites_slice";
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

const reducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  message: messageSlice.reducer,
  commands: commandSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
  favorites: favoritesSlice.reducer,
});

export type ContentState = ReturnType<typeof reducer>;
export type ContentAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof commandSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export const store = configureStore<ContentState, ContentAction, Middleware[]>({
  reducer: reducer,
  preloadedState: reducer(undefined, {
    type: "lifecycle",
  }),
  middleware: (def) =>
    def().concat(
      logger,
      lifecycleController.middleware,
      messageController.middleware,
      commandController.middleware,
      activeElementController.middleware,
      searchController.middleware,
      paymentController.middleware
    ),
});
