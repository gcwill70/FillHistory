import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandSlice } from "../core/store/slices/command-slice";

const commandController = createListenerMiddleware();

commandController.startListening({
  actionCreator: commandSlice.actions.getCommands,
  effect: async (action, api) => {
    chrome.commands.getAll(function(commands) {
      commands.forEach((command) => console.debug(`${command}`));
      api.dispatch(commandSlice.actions.setCommands({ commands: commands }));
    });
  },
});

export default commandController;
