import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ContentAction, ContentState, rootReducer } from "./root_reducer";

export function createStore(
  preloadedState: ContentState = rootReducer(undefined, { type: "lifecycle" })
) {
  const store = configureStore<ContentState, ContentAction, Middleware[]>({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        logger,
        // searchController.middleware,
        // tabController.middleware,
        // commandsController.middleware,
        // paymentController.middleware,
        // premiumController.middleware
      ),
  });

  return store;
}

export type Store = ReturnType<typeof createStore>;
