chrome.commands.onCommand.addListener(async function (command) {
  console.log(`background command: ${command}`);
  if (command === "showHistory") {
    const results = await chrome.history.search({
      text: "",
      maxResults: 100,
      startTime: undefined,
      endTime: undefined,
    });
    console.log(results.length);
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
