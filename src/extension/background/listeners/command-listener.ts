import { commandSlice, createStore } from "../../../core";

export function commandListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandSlice.actions.command(command));
  });
}
