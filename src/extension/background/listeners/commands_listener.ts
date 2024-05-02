import { commandsSlice } from "../../../commands-background/commands_slice";
import { searchSlice } from "../../../search/search_slice";
import { createStore } from "../store/create_store";

export function commandsListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandsSlice.actions.command(command));
    if (command === "search") {
      store.dispatch(searchSlice.actions.window());
    }
  });
}
