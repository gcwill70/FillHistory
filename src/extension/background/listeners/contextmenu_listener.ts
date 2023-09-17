import { createStore } from "../../../core";
import { searchSlice } from "../../../search/search_slice";

export function contextmenuListener(store: ReturnType<typeof createStore>) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.debug(info.menuItemId);
    if (info.menuItemId === "fh-1") {
      store.dispatch(searchSlice.actions.window(true));
    }
  });
}
