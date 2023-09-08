import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import commandsController from "../../commands/commands-controller";
import historyController from "../../history/history-controller";
import deinitDoneController from "../../lifecycle/deinit-done-controller";
import initDoneController from "../../lifecycle/init-done-controller";
import tabController from "../../tabs/tab-controller";
import { RootAction, RootState, rootReducer } from "./root-reducer";
import { lifecycleSlice } from "./slices";

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
        commandsController.middleware
      ),
  });

  return store;
}

export type Store = ReturnType<typeof createStore>;
