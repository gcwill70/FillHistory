import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import historyController from "../../history/history-controller";
import { RootAction, RootState, rootReducer } from "./root-reducer";
import { lifecycleSlice } from "./slices";
import initDoneController from "../../lifecycle/init-done-controller";
import deinitDoneController from "../../lifecycle/deinit-done-controller";
import initReloadController from "../../lifecycle/init-reload-controller";

export function createStore(
  preloadedState: RootState = rootReducer(undefined, { type: "lifecycle" })
) {
  const store = configureStore<RootState, RootAction, Middleware[]>({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        logger,
        initDoneController.middleware,
        deinitDoneController.middleware,
        historyController.middleware
      ),
  });

  store.dispatch(lifecycleSlice.actions.initStart());

  return store;
}

export type Store = ReturnType<typeof createStore>;
