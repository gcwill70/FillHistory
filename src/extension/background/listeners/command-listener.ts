import { commandSlice, createStore } from "../../../core";
import HistoryApiChrome from "../../../history/api/history_api_chrome";

// TODO: refactor to only use store
export function commandListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(
      commandSlice.actions.setCommand({
        command: {
          type: command,
        },
      })
    );
    if (command === "showHistory") {
      const results = await new HistoryApiChrome().search({
        text: "",
        maxResults: 100,
        startTime: undefined,
        endTime: undefined,
      });
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      chrome.tabs.sendMessage(tab.id!, {
        type: "historyResults",
        results: results,
      });
    }
  });
}
