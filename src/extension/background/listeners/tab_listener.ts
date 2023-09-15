import { createStore } from "../../../core";
import { historySlice } from "../../../history/history_slice";
import { tabsSlice } from "../../../tabs/tabs_slice";

export function setTabListener(store: ReturnType<typeof createStore>) {
  chrome.tabs.onActivated.addListener(async (details) => {
    store.dispatch(
      tabsSlice.actions.setTab({
        tab: {
          id: details.tabId,
        },
      })
    );
    store.dispatch(historySlice.actions.window(false));
  });
}
