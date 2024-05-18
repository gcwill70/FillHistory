import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ActionType } from "typesafe-actions";
import commandController from "../../command-background/command_controller";
import { commandSlice } from "../../command/command_slice";
import { favoritesSlice } from "../../favorites/favorites_slice";
import lifecycleController from "../../lifecycle-background/lifecycle_controller";
import { lifecycleSlice } from "../../lifecycle-background/lifecycle_slice";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import paymentController from "../../payment-background/payment_controller";
import { paymentSlice } from "../../payment/payment_slice";
import premiumController from "../../premium-background/premium_controller";
import { premiumSlice } from "../../premium/premium_slice";
import persistController from "../../persist-background/persist_controller";
import { persistSlice } from "../../persist/persist_slice";
import searchController from "../../search-background/search_controller";
import { searchSlice } from "../../search/search_slice";
import tabController from "../../tabs-background/tab_controller";
import { tabsSlice } from "../../tabs/tabs_slice";

const reducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  persist: persistSlice.reducer,
  message: messageSlice.reducer,
  commands: commandSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
  payment: paymentSlice.reducer,
  premium: premiumSlice.reducer,
  favorites: favoritesSlice.reducer,
});

export type BackgroundState = ReturnType<typeof reducer>;
export type BackgroundAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof messageSlice.actions>
  | ActionType<typeof commandSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof paymentSlice.actions>
  | ActionType<typeof premiumSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export const store = configureStore<
  BackgroundState,
  BackgroundAction,
  Middleware[]
>({
  reducer: reducer,
  preloadedState: reducer(undefined, {
    type: "lifecycle",
  }),
  middleware: (def) =>
    def().concat(
      logger,
      lifecycleController.middleware,
      persistController.middleware,
      messageController.middleware,
      searchController.middleware,
      tabController.middleware,
      commandController.middleware,
      paymentController.middleware,
      premiumController.middleware
    ),
});
