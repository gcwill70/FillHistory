import { commandSlice, createStore } from "../../../core";

export function commandListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandSlice.actions.command({ command: command }));
    // if (command === "showHistory") {
    //   const results = await chrome.history.search({
    //     text: "",
    //     maxResults: 100,
    //     startTime: undefined,
    //     endTime: undefined,
    //   });
    //   chrome.tabs.sendMessage(store.getState().tabs.current.id, {
    //     type: "historyResults",
    //     results: results,
    //   });
    // }
  });
}
