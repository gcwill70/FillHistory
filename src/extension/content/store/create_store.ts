import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import lifecycleController from "../../../lifecycle-content/lifecycle_controller";
import messageController from "../../../message/message_controller";
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
        lifecycleController.middleware,
        messageController.middleware,
      ),
  });

  return store;
}

export type Store = ReturnType<typeof createStore>;
