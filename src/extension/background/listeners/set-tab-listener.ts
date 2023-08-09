import { createStore, tabsSlice } from "../../../core";

export function setTabListener(store: ReturnType<typeof createStore>) {
  chrome.tabs.onActivated.addListener(async (details) => {
    store.dispatch(
      tabsSlice.actions.setTab({
        tab: {
          id: details.tabId,
        },
      })
    );
  });
}
