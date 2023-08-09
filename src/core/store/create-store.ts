import { configureStore } from "@reduxjs/toolkit";
import { RootAction, rootReducer, RootState } from "./root-reducer";

export function createStore(
  preloadedState: RootState = rootReducer(undefined, { type: "init" })
) {
  const store = configureStore<RootState, RootAction>({
    reducer: rootReducer,
    preloadedState,
  });

  store.dispatch({
    type: "init/start",
  });
  return store;
}

export type Store = ReturnType<typeof createStore>;
