import { createRoot } from "react-dom/client";
import { commandSlice, createStore } from "../../../core";
import App from "../../content/App";

export function commandListener(store: ReturnType<typeof createStore>) {
  chrome.commands.onCommand.addListener(async function(command) {
    store.dispatch(commandSlice.actions.command(command));
    if (command === "showhistory") {
      await chrome.scripting.executeScript({
        target: { tabId: store.getState().tabs.current.id },
        func: () => {
          let container = document.getElementById("react-root");
          if (container === null) {
            const body = document.querySelector("body");
            const app = document.createElement("div");
            app.id = "react-root";
            if (body) {
              body.prepend(app);
            }
            container = document.getElementById("react-root")!;
            const root = createRoot(container);
            root.render(App());
          }
        },
      });
    }
  });
}
