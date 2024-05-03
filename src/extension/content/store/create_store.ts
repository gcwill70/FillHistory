import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import lifecycleController from "../../../lifecycle-content/lifecycle_controller";
import messageController from "../../../message/message_controller";
import { ContentAction, ContentState, contentReducer } from "./root_reducer";
import commandsController from "../../../commands-content/commands_controller";
import loggerController from "../../../logger/logger_controller";

export function createStore(
  preloadedState: ContentState = contentReducer(undefined, { type: "lifecycle" })
) {
  const store = configureStore<ContentState, ContentAction, Middleware[]>({
    reducer: contentReducer,
    preloadedState: preloadedState,
    middleware: (def) =>
      def().concat(
        loggerController.middleware,
        lifecycleController.middleware,
        messageController.middleware,
        commandsController.middleware
      ),
  });

  return store;
}

export type ContentStore = ReturnType<typeof createStore>;
