import { commandsSlice } from "../../../commands/commands_slice";
import { createStore } from "../../../core";
import { historySlice } from "../../../history/history_slice";

export function commandsListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandsSlice.actions.command(command));
    if (command === "showHistory") {
      store.dispatch(historySlice.actions.window());
    }
  });
}
