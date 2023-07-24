// Listener for keyboard events
chrome.commands.onCommand.addListener(function (command) {
    if (command === "showHistory") {
        chrome.tabs.executeScript({ file: "content.js" });
    }
});

// Listener for message from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "getHistory") {
        chrome.history.search({ text: "", maxResults: 10 }, function (historyItems) {
            sendResponse({ type: "historyResults", data: historyItems });
        });
        return true; // Enable asynchronous response
    }
});
