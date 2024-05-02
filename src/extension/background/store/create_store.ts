import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import commandsController from "../../../commands/commands_controller";
import paymentController from "../../../payment/payment_controller";
import premiumController from "../../../premium/premium_controller";
import searchController from "../../../search/search_controller";
import tabController from "../../../tabs/tab_controller";
import {
  BackgroundAction,
  BackgroundState,
  backgroundReducer,
} from "./reducer";
import lifecycleController from "../../../lifecycle/lifecycle_controller";
import messageController from "../../../message/message_controller";

export function createStore(
  preloadedState: BackgroundState = backgroundReducer(undefined, {
    type: "lifecycle",
  })
) {
  const store = configureStore<BackgroundState, BackgroundAction, Middleware[]>(
    {
      reducer: backgroundReducer,
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

export type Store = ReturnType<typeof createStore>;
