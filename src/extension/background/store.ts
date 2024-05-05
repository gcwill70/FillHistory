import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import commandsController from "../../commands-background/commands_controller";
import { commandsSlice } from "../../commands/commands_slice";
import lifecycleController from "../../lifecycle-background/lifecycle_controller";
import { lifecycleSlice } from "../../lifecycle-background/lifecycle_slice";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import paymentController from "../../payment-background/payment_controller";
import { paymentSlice } from "../../payment/payment_slice";
import premiumController from "../../premium-background/premium_controller";
import { premiumSlice } from "../../premium/premium_slice";
import searchController from "../../search-background/search_controller";
import { searchSlice } from "../../search/search_slice";
import tabController from "../../tabs-background/tab_controller";
import { tabsSlice } from "../../tabs/tabs_slice";

const reducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  message: messageSlice.reducer,
  commands: commandsSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
});

export type BackgroundState = ReturnType<typeof reducer>;
export type BackgroundAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof messageSlice.actions>
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof paymentSlice.actions>
  | ActionType<typeof premiumSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export function createStore(
  preloadedState: BackgroundState = reducer(undefined, {
    type: "lifecycle",
  })
) {
  const store = configureStore<BackgroundState, BackgroundAction, Middleware[]>(
    {
      reducer: reducer,
      preloadedState: preloadedState,
      middleware: (def) =>
        def().concat(
          logger,
          lifecycleController.middleware,
          messageController.middleware,
          searchController.middleware,
          tabController.middleware,
          commandsController.middleware,
          paymentController.middleware,
          premiumController.middleware
        ),
    }
  );

  return store;
}

export type BackgroundStore = ReturnType<typeof createStore>;
