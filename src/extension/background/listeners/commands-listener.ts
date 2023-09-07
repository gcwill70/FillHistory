import { commandsSlice, createStore, historySlice } from "../../../core";

export function commandsListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandsSlice.actions.command(command));
    if (command === "showHistory") {
      store.dispatch(historySlice.actions.windowToggle());
    }
  });
}
