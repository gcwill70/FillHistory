import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { commandSlice } from "../command/command_slice";

const commandController = createListenerMiddleware();

// init
commandController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    chrome.commands.onCommand.addListener(async function(command) {
      api.dispatch(commandSlice.actions.command(command));
    });
    chrome.runtime.onConnect.addListener((port) => {
      api.dispatch(commandSlice.actions.getCommands());
    });
  },
});

// get all
commandController.startListening({
  actionCreator: commandSlice.actions.getCommands,
  effect: (action, api) => {
    chrome.commands.getAll(function(commands) {
      api.dispatch(commandSlice.actions.setCommands({ commands: commands }));
    });
  },
});

// context menu
commandController.startListening({
  actionCreator: commandSlice.actions.setCommands,
  effect: (action, api) => {
    const shortcut = action.payload.commands.find(
      (command) => command.name == "search"
    )?.shortcut;
    if (shortcut) {
      chrome.contextMenus.update("fh-1", {
        title: `Search Links (${shortcut})`,
      });
    }
  },
});

export default commandController;
