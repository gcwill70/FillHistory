import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandsSlice } from "./commands_slice";
import { messageSlice } from "../message/message_slice";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const commandsController = createListenerMiddleware();

// init
commandsController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    chrome.commands.onCommand.addListener(async function(command) {
      api.dispatch(commandsSlice.actions.command(command));
    });
  },
});

// message
commandsController.startListening({
  predicate: (action) => action.type.startsWith("command/"),
  effect: (action, api) => {
    // api.dispatch(messageSlice.actions.sendMessage({ ...action }));
  },
});

// get all
commandsController.startListening({
  actionCreator: commandsSlice.actions.getCommands,
  effect: (action, api) => {
    chrome.commands.getAll(function(commands) {
      api.dispatch(commandsSlice.actions.setCommands({ commands: commands }));
    });
  },
});

// context menu
commandsController.startListening({
  actionCreator: commandsSlice.actions.setCommands,
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

export default commandsController;
