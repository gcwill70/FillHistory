import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandSlice } from "../command/command_slice";
import { searchSlice } from "../search/search_slice";

const commandController = createListenerMiddleware();

commandController.startListening({
  actionCreator: commandSlice.actions.command,
  effect: (action, api) => {
    if (action.payload === "search") {
      api.dispatch(searchSlice.actions.window());
    }
  },
});

export default commandController;
