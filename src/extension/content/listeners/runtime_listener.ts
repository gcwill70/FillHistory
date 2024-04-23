import { createStore } from "../store/create_store";

export function runtimeListener(store: ReturnType<typeof createStore>) {
  chrome.runtime.onConnect.addListener((port) => {
    console.debug(`onConnect: ${port.name}`);
    port.onDisconnect.addListener((port) => {
      console.debug(`onDisconnect`);
    });
  });
}
