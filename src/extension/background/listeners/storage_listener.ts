import { createStore } from "../store/create_store";

export function storageListener(store: ReturnType<typeof createStore>) {
  chrome.storage.onChanged.addListener((changes, name) => {
    console.debug("chrome.storage.onChanged:");
    for (var change in changes) {
      console.debug(`\t${change}`);
    }
  });
}
