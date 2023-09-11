import { createStore } from "../../../core";
import { tabsSlice } from "../../../tabs/tabs-slice";

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
