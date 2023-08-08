import { createRoot } from "react-dom/client";
import { HistoryItem } from "../history";
import HistoryView from "../history/history_view";

chrome.runtime.onMessage.addListener(async function(
  message,
  sender,
  sendResponse
) {
  if (message.type === "historyResults") {
    createHistoryWindow(message.results);
  }
});

function createHistoryWindow(items: HistoryItem[]) {
  let container = document.getElementById("react-root");
  if (container === null) {
    const activeElement = document.activeElement!;
    const body = document.querySelector("body");
    const app = document.createElement("div");

    app.id = "react-root";

    if (body) {
      body.prepend(app);
    }
    container = document.getElementById("react-root")!;
    const root = createRoot(container);

    root.render(
      <HistoryView
        items={items}
        onClick={(item) => {
          if (item.url) {
            if (activeElement.nodeName === "INPUT") {
              (activeElement as HTMLInputElement).value = item.url;
            } else if (activeElement.nodeName === "TEXTAREA") {
              (activeElement as HTMLTextAreaElement).value = item.url;
            }
            root.unmount();
          }
        }}
      />
    );
  }
}
