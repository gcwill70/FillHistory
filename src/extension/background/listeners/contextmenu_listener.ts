import { searchSlice } from "../../../search/search_slice";
import { createStore } from "../store";

export function contextmenuListener(store: ReturnType<typeof createStore>) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fh-1") {
      store.dispatch(searchSlice.actions.window(true));
    }
  });
}
