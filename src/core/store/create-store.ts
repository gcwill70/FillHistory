import { configureStore } from "@reduxjs/toolkit";
import historyController from "../controllers/history-controller";
import { RootAction, RootState, rootReducer } from "./root-reducer";

export function createStore(
  preloadedState: RootState = rootReducer(undefined, { type: "init" })
) {
  const store = configureStore<RootState, RootAction>({
    reducer: rootReducer,
    preloadedState,
    middleware: [historyController.middleware],
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
