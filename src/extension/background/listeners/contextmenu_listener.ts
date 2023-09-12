import { createStore } from "../../../core";
import { historySlice } from "../../../history/history-slice";

export function contextmenuListener(store: ReturnType<typeof createStore>) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.debug(info.menuItemId);
    if (info.menuItemId === "fh-1") {
      store.dispatch(historySlice.actions.window(true));
    }
  });
}
