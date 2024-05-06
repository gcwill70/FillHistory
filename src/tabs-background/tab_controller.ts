import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { tabsSlice } from "../tabs/tabs_slice";

const tabController = createListenerMiddleware();

tabController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    chrome.tabs.onActivated.addListener(async (details) => {
      api.dispatch(
        tabsSlice.actions.setTab({
          tab: {
            id: details.tabId,
          },
        })
      );
    });
  },
});

export default tabController;
