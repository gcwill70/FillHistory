import {
  AnyAction,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { ActionType } from "typesafe-actions";
import commandsController from "../../commands-content/commands_controller";
import { commandsSlice } from "../../commands-content/commands_slice";
import lifecycleController from "../../lifecycle-content/lifecycle_controller";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import loggerController from "../../logger/logger_controller";
import messageController from "../../message/message_controller";
import { messageSlice } from "../../message/message_slice";
import { searchSlice } from "../../search/search_slice";
import { tabsSlice } from "../../tabs/tabs_slice";

const contentReducer = combineReducers({
  lifecycle: lifecycleSlice.reducer,
  message: messageSlice.reducer,
  commands: commandsSlice.reducer,
  search: searchSlice.reducer,
  tabs: tabsSlice.reducer,
});

export type ContentState = ReturnType<typeof contentReducer>;
export type ContentAction =
  | AnyAction
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof commandsSlice.actions>
  | ActionType<typeof searchSlice.actions>
  | ActionType<typeof lifecycleSlice.actions>
  | ActionType<typeof tabsSlice.actions>;

export function createStore(
  preloadedState: ContentState = contentReducer(undefined, {
    type: "lifecycle",
  })
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
