import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import commandsController from "../../commands/commands_controller";
import historyController from "../../history/history_controller";
import paymentController from "../../payment/payment_controller";
import tabController from "../../tabs/tab_controller";
import { RootAction, RootState, rootReducer } from "./root_reducer";
import premiumController from "../../premium/premium_controller";

export function createStore(
  preloadedState: RootState = rootReducer(undefined, { type: "lifecycle" })
) {
  const store = configureStore<RootState, RootAction, Middleware[]>({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        logger,
        historyController.middleware,
        tabController.middleware,
        commandsController.middleware,
        paymentController.middleware,
        premiumController.middleware
      ),
  });

  return store;
}

export type Store = ReturnType<typeof createStore>;
