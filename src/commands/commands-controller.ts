import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandsSlice } from "../core/store/slices/commands-slice";

const commandsController = createListenerMiddleware();

commandsController.startListening({
  actionCreator: commandsSlice.actions.getCommands,
  effect: async (action, api) => {
    chrome.commands.getAll(function(commands) {
      api.dispatch(commandsSlice.actions.setCommands({ commands: commands }));
    });
  },
});

export default commandsController;
