import { createListenerMiddleware } from "@reduxjs/toolkit";
import HistoryApiChrome from "./api/history_api_chrome";
import { historySlice } from "../core/store/slices/history-slice";
import { tabsSlice } from "../core/store/slices/tabs-slice";

const historyController = createListenerMiddleware();

historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: async (action, api) => {
    try {
      const query = action.payload;
      const results = await new HistoryApiChrome().search({ ...query });
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

historyController.startListening({
  actionCreator: tabsSlice.actions.setTab,
  effect: async (action, api) => {
    try {
      const results = await new HistoryApiChrome().search({ text: "" });
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

export default historyController;
