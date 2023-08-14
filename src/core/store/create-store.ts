import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import historyController from "../controllers/history-controller";
import { RootAction, RootState, rootReducer } from "./root-reducer";

export function createStore(
  preloadedState: RootState = rootReducer(undefined, { type: "init" })
) {
  const store = configureStore<RootState, RootAction, Middleware[]>({
    reducer: rootReducer,
    middleware: (def) => def().concat(logger, historyController.middleware),
    preloadedState: preloadedState,
  });

  store.dispatch({
    type: "init/start",
  });
  store.dispatch({
    type: "init/done",
  });

  return store;
}

export type Store = ReturnType<typeof createStore>;
