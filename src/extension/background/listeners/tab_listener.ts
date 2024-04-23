import { searchSlice } from "../../../search/search_slice";
import { tabsSlice } from "../../../tabs/tabs_slice";
import { createStore } from "../store/create_store";

export function setTabListener(store: ReturnType<typeof createStore>) {
  chrome.tabs.onActivated.addListener(async (details) => {
    store.dispatch(
      tabsSlice.actions.setTab({
        tab: {
          id: details.tabId,
        },
      })
    );
    store.dispatch(searchSlice.actions.window(false));
  });
}
