import { createListenerMiddleware } from "@reduxjs/toolkit";
import { searchSlice } from "../search/search_slice";
import HistoryRepo from "../history/history_repo";
import HistoryApiChrome from "../history/history_api_chrome";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const searchController = createListenerMiddleware();
const repo = new HistoryRepo(new HistoryApiChrome());

// context menu
searchController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    chrome.runtime.onInstalled.addListener((details) => {
      api.dispatch(searchSlice.actions.reset());
      chrome.contextMenus.remove("fh-1");
      chrome.contextMenus.create({
        title: "Search Links",
        contexts: ["all"],
        type: "normal",
        id: "fh-1",
        visible: true,
      });
    });
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "fh-1") {
        api.dispatch(searchSlice.actions.window(true));
      }
    });
  },
});

// search
searchController.startListening({
  actionCreator: searchSlice.actions.queryStart,
  effect: (action, api) => {
    (async () => {
      try {
        const state: any = api.getState();
        let results = await repo.search({ ...action.payload });
        if (state.payment.user.paid) {
          results = await repo.filter(results);
        }
        api.dispatch(searchSlice.actions.queryDone(results));
        api.dispatch(searchSlice.actions.selectionReset());
      } catch (e) {
        api.dispatch(searchSlice.actions.queryError());
      }
    })();
  },
});

// reset handler
searchController.startListening({
  actionCreator: searchSlice.actions.reset,
  effect: (action, api) => {
    api.dispatch(
      searchSlice.actions.queryStart({
        text: "",
        maxResults: 250,
        startTime: new Date("2000-01-01T00:00:00Z").getTime(),
      })
    );
  },
});

export default searchController;
