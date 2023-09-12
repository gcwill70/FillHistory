import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandsSlice } from "./commands_slice";

const commandsController = createListenerMiddleware();

// Redux store update
commandsController.startListening({
  actionCreator: commandsSlice.actions.getCommands,
  effect: (action, api) => {
    chrome.commands.getAll(function(commands) {
      api.dispatch(commandsSlice.actions.setCommands({ commands: commands }));
    });
  },
});

// Context Menu update
commandsController.startListening({
  actionCreator: commandsSlice.actions.setCommands,
  effect: (action, api) => {
    const shortcut = action.payload.commands.find(
      (command) => command.name == "showHistory"
    )?.shortcut;
    if (shortcut) {
      chrome.contextMenus.update("fh-1", {
        title: `Search Links (${shortcut})`,
      });
    }
  },
});

export default commandsController;
