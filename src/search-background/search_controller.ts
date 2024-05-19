import { createListenerMiddleware } from "@reduxjs/toolkit";
import { store } from "../extension/background/store";
import FavoritesApi from "../favorites/favorites_api";
import HistoryApiChrome from "../history/history_api_chrome";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import SearchApi from "../search/search_api";
import { searchSlice } from "../search/search_slice";
import { SearchItem } from "../search/search.types";

const searchApi = new SearchApi(new HistoryApiChrome(), new FavoritesApi());

const searchController = createListenerMiddleware();

// context menu
searchController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    chrome.runtime.onInstalled.addListener((details) => {
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
    searchApi.init(store);
  },
});

// search
searchController.startListening({
  actionCreator: searchSlice.actions.queryStart,
  effect: async (action, api) => {
    try {
      const state: any = api.getState();
      let items: SearchItem[] = [];
      // search
      let { favorites, history } = await searchApi.search(action.payload);
      // filter & sort
      if (state.payment.user.paid) {
        // filter out favorites from history
        history = history.filter(
          (x) => !favorites.some((y) => x.url === y.url)
        );
        // sort
        history = await searchApi.sort(history);
        items = [...favorites, ...history];
      } else {
        // just show history
        items = [...history];
      }
      // dispatch
      api.dispatch(searchSlice.actions.queryDone(items));
    } catch (e) {
      console.error(e);
      api.dispatch(searchSlice.actions.queryError());
    }
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
searchController.startListening({
  actionCreator: searchSlice.actions.window,
  effect: (action, api) => {
    const state = api.getState() as any;
    if (state.search.window.show === false) {
      api.dispatch(searchSlice.actions.reset());
    }
  },
});

export default searchController;
