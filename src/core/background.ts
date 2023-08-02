import HistoryApiChrome from "../history/api/history_api_chrome";

chrome.commands.onCommand.addListener(async function (command) {
  console.log(`background command: ${command}`);
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
