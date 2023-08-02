import { createHistoryWindow } from "../history/index";

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "historyResults") {
    createHistoryWindow(message.results);
  }
});
