chrome.commands.onCommand.addListener(async function (command) {
  console.log(`background command: ${command}`);
  if (command === "showHistory") {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.tabs.sendMessage(tab.id!, { type: command });
  }
});

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  console.log(`background message: ${JSON.stringify(message)}`);
  if (message.type === "getHistory") {
    const results = await chrome.history.search({
      text: message.text,
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
  return true;
});
