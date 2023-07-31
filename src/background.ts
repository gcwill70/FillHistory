chrome.commands.onCommand.addListener(function (command) {
    console.log(`background command: ${command}`);
});

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    console.log(`background message: ${message}`);
    if (message.type === "getHistory") {
        const results = await chrome.history.search({ text: message.text, maxResults: 10 });
        chrome.runtime.sendMessage({ type: "showHistory", data: results });
    }
});