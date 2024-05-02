import { commandsSlice } from "../../../commands-background/commands_slice";
import { messageSlice } from "../../../message/message_slice";
import { createStore } from "../store/create_store";

export function commandsListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandsSlice.actions.command(command));
    store.dispatch(
      messageSlice.actions.sendMessage({
        "commands/command": command,
      })
    );
  });
}
