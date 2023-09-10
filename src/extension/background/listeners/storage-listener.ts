import { createStore } from "../../../core/store/create-store";

export function storageListener(store: ReturnType<typeof createStore>) {
  chrome.storage.onChanged.addListener((changes, name) => {
    console.debug("chrome.storage.onChanged:");
    for (var change in changes) {
      console.debug(`\t${change}`);
    }
  });
}
