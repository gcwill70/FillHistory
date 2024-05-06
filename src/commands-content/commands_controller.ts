import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandsSlice } from "../commands/commands_slice";
import { searchSlice } from "../search/search_slice";

const commandsController = createListenerMiddleware();

commandsController.startListening({
  actionCreator: commandsSlice.actions.command,
  effect: (action, api) => {
    if (action.payload === "search") {
      api.dispatch(searchSlice.actions.window());
    }
  },
});

export default commandsController;
